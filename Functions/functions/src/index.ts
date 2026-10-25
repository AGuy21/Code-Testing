import { initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";
import { onDocumentCreated, onDocumentWritten } from "firebase-functions/v2/firestore";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { getAuth } from "firebase-admin/auth";
import { verifyToken } from "@clerk/backend";

initializeApp();
const db = getFirestore();

/** Words that auto-hide a hangout until it is reviewed. Extend as needed. */
const BLOCKED_TERMS = ["free money", "click this link", "crypto giveaway"];

type Ids = string[] | undefined;

/** Sends a push to every FCM token the given users registered. */
async function pushToUsers(
  userIds: string[],
  title: string,
  body: string,
  data: Record<string, string>,
): Promise<void> {
  if (userIds.length === 0) return;
  const snaps = await Promise.all(userIds.map((id) => db.doc(`users/${id}`).get()));
  const tokens = snaps.flatMap((snap) => (snap.data()?.fcmTokens as string[] | undefined) ?? []);
  if (tokens.length === 0) return;
  const response = await getMessaging().sendEachForMulticast({
    tokens,
    notification: { title, body },
    data,
    android: { notification: { channelId: "messages" } },
  });
  // Drop tokens FCM reports as dead so the list doesn't grow forever.
  const dead = tokens.filter((_, i) => {
    const code = response.responses[i]?.error?.code;
    return code === "messaging/registration-token-not-registered" ||
      code === "messaging/invalid-registration-token";
  });
  if (dead.length > 0) {
    await Promise.all(
      snaps.map((snap) => {
        const mine = ((snap.data()?.fcmTokens as string[] | undefined) ?? []).filter((t) => dead.includes(t));
        return mine.length > 0
          ? snap.ref.update({ fcmTokens: FieldValue.arrayRemove(...mine) })
          : null;
      }),
    );
  }
}

/** Chat message -> push to every other participant. */
export const onChatMessage = onDocumentCreated(
  "conversations/{conversationId}/messages/{messageId}",
  async (event) => {
    const message = event.data?.data();
    if (!message) return;
    const conversation = await db.doc(`conversations/${event.params.conversationId}`).get();
    const members = (conversation.data()?.participantUserIds as string[] | undefined) ?? [];
    const recipients = members.filter((id) => id !== message.senderId);
    const title = conversation.data()?.type === "group"
      ? `${conversation.data()?.emoji ?? "💬"} ${conversation.data()?.hangoutTitle ?? "Hangout"}`
      : String(message.senderName ?? "New message");
    const text = String(message.text ?? "");
    const body = conversation.data()?.type === "group" ? `${message.senderName}: ${text}` : text;
    await pushToUsers(recipients, title, body.slice(0, 140), {
      conversationId: event.params.conversationId,
    });
  },
);

/**
 * One trigger for everything that reacts to a hangout changing:
 * join/request pushes, the denormalized head count, and moderation.
 */
export const onHangoutWritten = onDocumentWritten("hangouts/{hangoutId}", async (event) => {
  const after = event.data?.after.data();
  if (!after) return;
  const before = event.data?.before.data();
  const ref = event.data!.after.ref;

  const going: Ids = after.goingUserIds;
  const previousGoing: Ids = before?.goingUserIds;
  const newlyGoing = (going ?? []).filter((id) => !(previousGoing ?? []).includes(id));
  const newRequests = ((after.requestedUserIds as Ids) ?? []).filter(
    (id) => !((before?.requestedUserIds as Ids) ?? []).includes(id),
  );

  const nameFor = async (id: string) =>
    ((await db.doc(`users/${id}`).get()).data()?.displayName as string | undefined) ?? "Someone";

  if (after.hostId) {
    for (const id of newlyGoing.filter((g) => g !== after.hostId)) {
      await pushToUsers([after.hostId], `${after.emoji ?? "🎉"} ${after.title}`, `${await nameFor(id)} is in!`, {
        conversationId: event.params.hangoutId,
      });
    }
    for (const id of newRequests) {
      await pushToUsers([after.hostId], `${after.emoji ?? "🎉"} ${after.title}`, `${await nameFor(id)} wants to join`, {
        conversationId: event.params.hangoutId,
      });
    }
  }
  for (const id of ((after.approvedUserIds as Ids) ?? []).filter(
    (a) => !((before?.approvedUserIds as Ids) ?? []).includes(a),
  )) {
    if (id !== after.hostId) {
      await pushToUsers([id], `${after.emoji ?? "🎉"} ${after.title}`, "You're approved — see the details!", {
        conversationId: event.params.hangoutId,
      });
    }
  }

  // Counter + moderation are written back only when they would change, so
  // the write this triggers settles immediately instead of looping.
  const goingCount = 1 + (going?.length ?? 0) + ((after.plusOneUserIds as Ids)?.length ?? 0);
  const text = `${after.title ?? ""} ${after.description ?? ""}`.toLowerCase();
  const flagged = BLOCKED_TERMS.some((term) => text.includes(term));
  const patch: Record<string, unknown> = {};
  if (after.goingCount !== goingCount) patch.goingCount = goingCount;
  if (flagged && after.hidden !== true) patch.hidden = true;
  if (Object.keys(patch).length > 0) await ref.update(patch);
});

async function deleteHangout(id: string): Promise<void> {
  await db.recursiveDelete(db.doc(`hangouts/${id}`));
}

/** Server-side expiry: removes started and cancelled hangouts every 15 minutes. */
export const sweepHangouts = onSchedule("every 15 minutes", async () => {
  const [expired, cancelled] = await Promise.all([
    db.collection("hangouts").where("startsAt", "<", new Date()).get(),
    db.collection("hangouts").where("cancelled", "==", true).get(),
  ]);
  const ids = new Set([...expired.docs, ...cancelled.docs].map((d) => d.id));
  await Promise.all([...ids].map(deleteHangout));
});


const CLERK_SECRET_KEY = defineSecret("CLERK_SECRET_KEY");

/**
 * Exchanges a Clerk session JWT for a Firebase custom token whose uid is the
 * Clerk user id, so Firestore rules can use `request.auth.uid`.
 * Set the secret with: firebase functions:secrets:set CLERK_SECRET_KEY
 */
export const firebaseToken = onRequest(
  { secrets: [CLERK_SECRET_KEY], cors: true },
  async (req, res) => {
    const header = req.get("authorization") ?? "";
    const jwt = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (req.method !== "POST" || !jwt) {
      res.status(401).json({ error: "Missing Clerk session token" });
      return;
    }
    try {
      const claims = await verifyToken(jwt, { secretKey: CLERK_SECRET_KEY.value() });
      const token = await getAuth().createCustomToken(claims.sub);
      res.json({ token });
    } catch {
      res.status(401).json({ error: "Invalid Clerk session token" });
    }
  },
);
