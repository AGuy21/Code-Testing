import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  type DocumentData,
} from "firebase/firestore";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAuth, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { db } from "../../Configs/FirebaseConfig";
import { useHangouts } from "../hooks/useHangouts";
import { addOnNotificationTap, getFcmToken } from "../utils/notifications";
import type {
  ChatMessage,
  Conversation,
  LastMessage,
} from "../constants/types/chat";
import type { Hangout } from "../constants/types/hangout";

export interface ChatContextValue {
  /** Every conversation the signed-in user belongs to. */
  conversations: Conversation[];
  /** True until the first Firestore snapshot arrives. */
  isLoading: boolean;
  /** Writes a message + updates the conversation's lastMessage atomically. */
  sendMessage: (conversationId: string, text: string) => Promise<void>;
  /** Best-effort read receipt (lastReadAt[me]). */
  markRead: (conversationId: string) => void;
  /** Opens (or creates) the deterministic DM thread; resolves its id. */
  openDm: (otherUserId: string, otherName: string) => Promise<string>;
  /** Opens (or backfills) a hangout's group chat; resolves its id. */
  openGroupChat: (hangout: Hangout) => Promise<string>;
  /** Registers the FCM token + profile (asks permission once). */
  ensurePushReady: () => void;
}

export const ChatContext = createContext<ChatContextValue | null>(null);

/** Firestore Timestamp / null → ISO string (null while pending). */
function iso(value: unknown): string | null {
  if (!value) return null;
  const ts = value as { toDate?: () => Date };
  return ts?.toDate ? ts.toDate().toISOString() : null;
}

function mapConversation(id: string, data: DocumentData): Conversation {
  const raw = (data.lastMessage ?? null) as
    | { text: string; senderId: string; senderName: string; sentAt?: unknown }
    | null;
  const lastMessage: LastMessage | null = raw
    ? {
        text: raw.text,
        senderId: raw.senderId,
        senderName: raw.senderName,
        sentAt: iso(raw.sentAt),
      }
    : null;
  const lastReadAt: Record<string, string> = {};
  for (const [uid, value] of Object.entries(
    (data.lastReadAt ?? {}) as Record<string, unknown>,
  )) {
    const stamp = iso(value);
    if (stamp) lastReadAt[uid] = stamp;
  }
  return {
    id,
    type: data.type === "dm" ? "dm" : "group",
    hangoutId: data.hangoutId ?? undefined,
    hangoutTitle: data.hangoutTitle ?? undefined,
    emoji: data.emoji ?? undefined,
    participantUserIds: (data.participantUserIds ?? []) as string[],
    participantNames: (data.participantNames ?? undefined) as
      | Record<string, string>
      | undefined,
    lastMessage,
    lastReadAt,
  };
}

/** Deterministic DM id: sorted user ids joined — no duplicate threads. */
function dmId(a: string, b: string): string {
  return `dm-${[a, b].sort().join("-")}`;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const { userId } = useAuth();
  const { user } = useUser();
  const { rsvps } = useHangouts();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pushReadyRef = useRef(false);

  const router = useRouter();
  // Tapping a chat notification deep-links into its thread.
  useEffect(
    () => addOnNotificationTap((conversationId) => {
      void router.push(`/chat/${conversationId}`);
    }),
    [],
  );

  const myName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "Me";
  const myAvatar = user?.imageUrl ?? undefined;

  // Live conversation list — one array-contains query, sorted client-side
  // (avoids the composite index the orderBy variant would require).
  useEffect(() => {
    if (!userId) {
      setConversations([]);
      setIsLoading(false);
      return;
    }
    const conversationsQuery = query(
      collection(db, "conversations"),
      where("participantUserIds", "array-contains", userId),
    );
    const unsubscribe = onSnapshot(
      conversationsQuery,
      (snapshot) => {
        const next = snapshot.docs.map((docSnap) =>
          mapConversation(docSnap.id, docSnap.data()),
        );
        next.sort(
          (a, b) =>
            (b.lastMessage?.sentAt ? Date.parse(b.lastMessage.sentAt) : 0) -
            (a.lastMessage?.sentAt ? Date.parse(a.lastMessage.sentAt) : 0),
        );
        setConversations(next);
        setIsLoading(false);
      },
      (error) => {
        console.warn("Failed to load conversations:", error);
        setIsLoading(false);
      },
    );
    return unsubscribe;
  }, [userId]);

  /** Message + lastMessage bookkeeping in one atomic batch. */
  const sendMessage = useCallback(
    async (conversationId: string, text: string) => {
      const trimmed = text.trim();
      if (!userId || !trimmed) return;
      const batch = writeBatch(db);
      const messageRef = doc(
        collection(db, "conversations", conversationId, "messages"),
      );
      batch.set(messageRef, {
        text: trimmed,
        senderId: userId,
        senderName: myName,
        createdAt: serverTimestamp(),
      });
      batch.update(doc(db, "conversations", conversationId), {
        lastMessage: {
          text: trimmed,
          senderId: userId,
          senderName: myName,
          sentAt: serverTimestamp(),
        },
      });
      await batch.commit();
    },
    [userId, myName],
  );

  /** Best-effort read receipt; missing docs / races are ignored. */
  const markRead = useCallback(
    (conversationId: string) => {
      if (!userId) return;
      updateDoc(doc(db, "conversations", conversationId), {
        [`lastReadAt.${userId}`]: serverTimestamp(),
      }).catch(() => undefined);
    },
    [userId],
  );

  /** Opens the deterministic DM thread, creating it on first contact. */
  const openDm = useCallback(
    async (otherUserId: string, otherName: string): Promise<string> => {
      if (!userId) throw new Error("Sign in to message people.");
      const id = dmId(userId, otherUserId);
      const ref = doc(db, "conversations", id);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, {
          type: "dm",
          participantUserIds: [userId, otherUserId].sort(),
          participantNames: { [userId]: myName, [otherUserId]: otherName },
          lastMessage: null,
          lastReadAt: {},
          createdAt: serverTimestamp(),
        });
      }
      return id;
    },
    [userId, myName],
  );

  /** Opens a hangout's group chat, backfilling chats for legacy events. */
  const openGroupChat = useCallback(
    async (hangout: Hangout): Promise<string> => {
      const ref = doc(db, "conversations", hangout.id);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        const participants = new Set<string>();
        if (hangout.hostId) participants.add(hangout.hostId);
        if (
          userId &&
          (rsvps[hangout.id] === "going" ||
            hangout.hostId === userId ||
            !hangout.hostId)
        ) {
          participants.add(userId);
        }
        if (participants.size === 0) participants.add("unknown");
        await setDoc(ref, {
          type: "group",
          hangoutId: hangout.id,
          hangoutTitle: hangout.title,
          emoji: hangout.emoji,
          participantUserIds: [...participants],
          lastMessage: null,
          lastReadAt: {},
          createdAt: serverTimestamp(),
        });
      }
      return hangout.id;
    },
    [userId, rsvps],
  );

  /** Once per install: permission prompt, FCM token + profile upsert. */
  const ensurePushReady = useCallback(() => {
    if (!userId || pushReadyRef.current) return;
    pushReadyRef.current = true;
    void (async () => {
      try {
        const token = await getFcmToken();
        const profile: Record<string, unknown> = { displayName: myName };
        if (myAvatar) profile.imageUrl = myAvatar;
        if (token) profile.fcmTokens = arrayUnion(token);
        await setDoc(doc(db, "users", userId), profile, { merge: true });
      } catch (error) {
        console.warn("Failed to register for notifications:", error);
        pushReadyRef.current = false; // allow a retry on next open
      }
    })();
  }, [userId, myName, myAvatar]);

  const value = useMemo<ChatContextValue>(
    () => ({
      conversations,
      isLoading,
      sendMessage,
      markRead,
      openDm,
      openGroupChat,
      ensurePushReady,
    }),
    [
      conversations,
      isLoading,
      sendMessage,
      markRead,
      openDm,
      openGroupChat,
      ensurePushReady,
    ],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

/** Live message list for one conversation (newest first, last 100). */
export function useConversationMessages(
  conversationId: string,
): { messages: ChatMessage[]; isLoading: boolean } {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const messagesQuery = query(
      collection(db, "conversations", conversationId, "messages"),
      orderBy("createdAt", "desc"),
      limit(100),
    );
    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        setMessages(
          snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              text: data.text as string,
              senderId: data.senderId as string,
              senderName: data.senderName as string,
              createdAt: iso(data.createdAt),
            };
          }),
        );
        setIsLoading(false);
      },
      (error) => {
        console.warn("Failed to load messages:", error);
        setIsLoading(false);
      },
    );
    return unsubscribe;
  }, [conversationId]);

  return { messages, isLoading };
}