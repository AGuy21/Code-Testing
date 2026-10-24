import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import * as Crypto from "expo-crypto";
import * as Location from "expo-location";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@clerk/expo";
import { db } from "../../Configs/FirebaseConfig";
import type {
  Hangout,
  HangoutCategory,
  HangoutId,
  HangoutPeople,
  HangoutPrivacy,
  LatLng,
  RsvpStatus,
} from "../constants/types/hangout";

export interface NewHangoutInput {
  title: string;
  description: string;
  category: HangoutCategory;
  emoji: string;
  location: LatLng;
  placeLabel: string;
  startsAt: string;
  hostName?: string;
  privacy?: HangoutPrivacy;
  allowPlusOnes?: boolean;
  /** Generate a private invite code for the host to share. */
  withInviteCode?: boolean;
}

/** Fields a host may change after publishing. */
export interface HangoutEdits {
  title: string;
  description: string;
  category: HangoutCategory;
  emoji: string;
  placeLabel: string;
}

/** Exact details that only approved viewers may read (private hangouts). */
interface PrivateDetails {
  location: LatLng;
  placeLabel: string;
  description: string;
  inviteCode?: string;
}

export interface HangoutsContextValue {
  hangouts: Hangout[];
  /** The current user's RSVP per hangout. */
  rsvps: Record<HangoutId, RsvpStatus>;
  /** True when a Clerk user is signed in — RSVPs are written under their id. */
  canRsvp: boolean;
  /** True until the first Firestore snapshot arrives. */
  isLoading: boolean;
  /** Human-readable message when the live Firestore sync fails (null when healthy). */
  syncError: string | null;
  /** True while a newly created hangout is being written to Firestore. */
  isSubmitting: boolean;
  join: (id: HangoutId) => void;
  pass: (id: HangoutId) => void;
  clearRsvp: (id: HangoutId) => void;
  /** Writes the hangout to Firestore; resolves once the write succeeds. */
  addHangout: (input: NewHangoutInput) => Promise<Hangout>;
  /** Host-only: edits the basics of a hangout. */
  editHangout: (id: HangoutId, edits: HangoutEdits) => Promise<void>;
  /** Host-only: cancels the hangout (the server sweep deletes it). */
  cancelHangout: (id: HangoutId) => Promise<void>;
  /** Ask the host for access to a request-to-join hangout. */
  requestAccess: (id: HangoutId) => void;
  cancelRequest: (id: HangoutId) => void;
  /** Redeems a private invite code; resolves with the hangout title. */
  redeemInviteCode: (code: string) => Promise<string>;
  /** Host tools — ignored unless the current user is the host. */
  inviteUser: (id: HangoutId, userId: string) => void;
  approveRequest: (id: HangoutId, userId: string) => void;
  denyRequest: (id: HangoutId, userId: string) => void;
  removeGuest: (id: HangoutId, userId: string) => void;
  setAllowPlusOnes: (id: HangoutId, allow: boolean) => void;
  /** Creates (or replaces) the invite code and resolves with it. */
  regenerateInviteCode: (id: HangoutId) => Promise<string>;
  getInviteCode: (id: HangoutId) => string | null;
  getPeople: (id: HangoutId) => HangoutPeople;
  /** Whether the current user is bringing a +1. */
  hasPlusOne: (id: HangoutId) => boolean;
  togglePlusOne: (id: HangoutId) => void;
  /** Display names for Clerk user ids (falls back to the id). */
  lookupNames: (userIds: string[]) => Promise<Record<string, string>>;
  /** Prefix search over public profiles, for inviting people. */
  searchUsers: (prefix: string) => Promise<{ id: string; displayName: string }[]>;
  /** Head count including the current user's "going" RSVP. */
  goingCount: (id: HangoutId) => number;
  /** Set from the Events list so the map tab can focus a marker. */
  focusedHangoutId: HangoutId | null;
  focusHangout: (id: HangoutId) => void;
  clearFocus: () => void;
}

export const HangoutsContext = createContext<HangoutsContextValue | null>(null);

/** Firestore document shape for a hangout. */
interface HangoutDoc {
  title: string;
  description: string;
  category: string;
  emoji: string;
  location: { latitude: number; longitude: number };
  placeLabel: string;
  startsAt: Timestamp | string;
  hostName: string;
  hostId?: string | null;
  baseGoingCount?: number;
  goingUserIds?: string[];
  passedUserIds?: string[];
  privacy?: HangoutPrivacy;
  allowPlusOnes?: boolean;
  requestedUserIds?: string[];
  approvedUserIds?: string[];
  deniedUserIds?: string[];
  plusOneUserIds?: string[];
  inviteCodeHash?: string;
  cancelled?: boolean;
  hidden?: boolean;
}

/** Internal entry: the hangout plus the raw RSVP arrays used to derive state. */
interface HangoutEntry {
  hangout: Hangout;
  baseGoingCount: number;
  goingUserIds: string[];
  passedUserIds: string[];
  requestedUserIds: string[];
  approvedUserIds: string[];
  deniedUserIds: string[];
  plusOneUserIds: string[];
  /** Cancelled by the host or hidden by moderation. */
  removed: boolean;
}

const INVITE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const LIMITED_DESCRIPTION =
  "Private hangout — get approved to see the details and exact spot.";

function generateInviteCode(): string {
  const bytes = Crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, (b) => INVITE_ALPHABET[b % INVITE_ALPHABET.length]).join("");
}

function hashInviteCode(code: string): Promise<string> {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    code.trim().toUpperCase(),
  );
}

/** ~1 km precision so a limited viewer only learns the general area. */
function coarsen(location: LatLng): LatLng {
  return {
    latitude: Math.round(location.latitude * 100) / 100,
    longitude: Math.round(location.longitude * 100) / 100,
  };
}

async function neighborhoodFor(location: LatLng): Promise<string> {
  try {
    const [place] = await Location.reverseGeocodeAsync(location);
    return place?.district || place?.subregion || place?.city || "Nearby";
  } catch {
    return "Nearby";
  }
}

function hasFullAccess(entry: HangoutEntry, userId: string | null | undefined): boolean {
  if (entry.hangout.privacy === "public") return true;
  if (!userId) return false;
  return entry.hangout.hostId === userId || entry.approvedUserIds.includes(userId);
}

function mapDocToEntry(id: string, data: HangoutDoc): HangoutEntry {
  const startsAt =
    typeof data.startsAt === "string"
      ? data.startsAt
      : (data.startsAt?.toDate().toISOString() ?? new Date().toISOString());

  return {
    hangout: {
      id,
      title: data.title,
      description: data.description,
      category: (data.category ?? "chill") as HangoutCategory,
      emoji: data.emoji,
      location: {
        latitude: data.location?.latitude ?? 0,
        longitude: data.location?.longitude ?? 0,
      },
      placeLabel: data.placeLabel,
      startsAt,
      hostName: data.hostName,
      hostId: data.hostId ?? undefined,
      goingCount: data.baseGoingCount ?? 0,
      privacy: data.privacy ?? "public",
      allowPlusOnes: data.allowPlusOnes ?? false,
      access: "full",
      requestPending: false,
    },
    baseGoingCount: data.baseGoingCount ?? 0,
    goingUserIds: data.goingUserIds ?? [],
    passedUserIds: data.passedUserIds ?? [],
    requestedUserIds: data.requestedUserIds ?? [],
    approvedUserIds: data.approvedUserIds ?? [],
    deniedUserIds: data.deniedUserIds ?? [],
    plusOneUserIds: data.plusOneUserIds ?? [],
    removed: data.cancelled === true || data.hidden === true,
  };
}

/** Sort key for a hangout: epoch ms of startsAt; unknown times sort last. */
function startTime(iso: string): number {
  const time = Date.parse(iso);
  return Number.isNaN(time) ? Number.MAX_SAFE_INTEGER : time;
}

/** Turns a Firestore error into a short, actionable message for the UI. */
function describeFirestoreError(error: unknown): string {
  const code = (error as { code?: string } | null)?.code ?? "";
  if (code.includes("permission-denied")) {
    return "Firestore permissions blocked the sync — publish Configs/firestore.rules.";
  }
  if (code.includes("unavailable") || code.includes("failed-precondition")) {
    return "Can't reach Firestore right now — showing the last known hangouts.";
  }
  return "Live sync failed — check your connection and Firebase setup.";
}

/** How often the UI re-checks for hangouts that have started and passed. */
const EXPIRY_TICK_MS = 60_000;

// PROVIDER_BELOW

export function HangoutsProvider({ children }: { children: ReactNode }) {
  const { userId } = useAuth();
  const [snapshotEntries, setSnapshotEntries] = useState<HangoutEntry[]>([]);
  const [pendingEntries, setPendingEntries] = useState<HangoutEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedHangoutId, setFocusedHangoutId] = useState<HangoutId | null>(null);
  const [privateDetails, setPrivateDetails] = useState<
    Record<HangoutId, PrivateDetails>
  >({});

  const canRsvp = Boolean(userId);

  // Real-time hangouts feed from Firestore.
  useEffect(() => {
    const hangoutsQuery = query(
      collection(db, "hangouts"),
      orderBy("startsAt", "asc"),
    );
    const unsubscribe = onSnapshot(
      hangoutsQuery,
      (snapshot) => {
        const docs = snapshot.docs.map((docSnap) =>
          mapDocToEntry(docSnap.id, docSnap.data() as HangoutDoc),
        );
        setSnapshotEntries(docs);
        // Retire optimistic copies the server has now confirmed.
        const confirmed = new Set(docs.map((entry) => entry.hangout.id));
        setPendingEntries((prev) =>
          prev.length === 0
            ? prev
            : prev.filter((entry) => !confirmed.has(entry.hangout.id)),
        );
        setIsLoading(false);
        setSyncError(null);
      },
      (error) => {
        console.warn("Failed to load hangouts:", error);
        setSyncError(describeFirestoreError(error));
        setIsLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  // Ticks every minute so hangouts whose start time has passed vanish from
  // the UI (feed, map, profile) even when no Firestore snapshot arrives.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), EXPIRY_TICK_MS);
    return () => clearInterval(timer);
  }, []);

  // Merged view: server docs plus optimistic writes the server has not
  // confirmed yet, re-sorted by start time so the feed/map stay ordered.
  // Hangouts that already started are dropped — only upcoming plans show.
  const entries = useMemo(() => {
    const confirmed = new Set(
      snapshotEntries.map((entry) => entry.hangout.id),
    );
    const pending = pendingEntries.filter(
      (entry) => !confirmed.has(entry.hangout.id),
    );
    const upcoming = [...snapshotEntries, ...pending].filter(
      (entry) => startTime(entry.hangout.startsAt) > now && !entry.removed,
    );
    return upcoming.sort(
      (a, b) => startTime(a.hangout.startsAt) - startTime(b.hangout.startsAt),
    );
  }, [snapshotEntries, pendingEntries, now]);

  // Retire hangouts whose start time has passed: delete them from Firestore
  // so every client's snapshot drops them, not just this device's UI. The
  // security rules allow deleting expired docs (and legacy seed docs).
  const deletingExpiredRef = useRef(false);
  useEffect(() => {
    if (isLoading || deletingExpiredRef.current) return;
    const expired = snapshotEntries.filter(
      (entry) => startTime(entry.hangout.startsAt) <= now,
    );
    if (expired.length === 0) return;
    deletingExpiredRef.current = true;
    void Promise.all(
      expired.map(async (entry) => {
        if (entry.hangout.privacy !== "public") {
          await deleteDoc(
            doc(db, "hangouts", entry.hangout.id, "private", "details"),
          ).catch(() => undefined);
        }
        await deleteDoc(doc(db, "hangouts", entry.hangout.id));
      }),
    )
      .catch((error) => {
        console.warn("Failed to delete expired hangouts:", error);
      })
      .finally(() => {
        deletingExpiredRef.current = false;
      });
  }, [snapshotEntries, isLoading, now]);

  const setRsvp = useCallback(
    (id: HangoutId, status: RsvpStatus | null) => {
      if (!userId) return;
      const target = snapshotEntries.find((item) => item.hangout.id === id);
      if (target && !hasFullAccess(target, userId)) return;
      const docRef = doc(db, "hangouts", id);
      const update =
        status === "going"
          ? { goingUserIds: arrayUnion(userId), passedUserIds: arrayRemove(userId) }
          : status === "passed"
            ? { passedUserIds: arrayUnion(userId), goingUserIds: arrayRemove(userId) }
            : { goingUserIds: arrayRemove(userId), passedUserIds: arrayRemove(userId) };
      if (status !== "going") {
        Object.assign(update, { plusOneUserIds: arrayRemove(userId) });
      }
      updateDoc(docRef, update).catch((error) =>
        console.warn("Failed to update RSVP:", error),
      );

      // Mirror RSVPs into the hangout's group chat: "going" joins, pass or
      // undo leaves. The host always stays a member. Legacy events get their
      // conversation backfilled on first RSVP.
      const entry = snapshotEntries.find((item) => item.hangout.id === id);
      const isHost = entry?.hangout.hostId === userId;
      void (async () => {
        try {
          const convRef = doc(db, "conversations", id);
          const snap = await getDoc(convRef);
          if (!snap.exists()) {
            const members = new Set<string>();
            if (entry?.hangout.hostId) members.add(entry.hangout.hostId);
            if (status === "going" || members.size === 0) members.add(userId);
            await setDoc(convRef, {
              type: "group",
              hangoutId: id,
              hangoutTitle: entry?.hangout.title ?? "Hangout",
              emoji: entry?.hangout.emoji ?? "💬",
              participantUserIds: [...members],
              lastMessage: null,
              lastReadAt: {},
              createdAt: serverTimestamp(),
            });
          }
          if (status === "going") {
            await updateDoc(convRef, {
              participantUserIds: arrayUnion(userId),
            });
          } else if (!isHost) {
            await updateDoc(convRef, {
              participantUserIds: arrayRemove(userId),
            });
          }
        } catch (error) {
          console.warn("Failed to sync chat membership:", error);
        }
      })();
    },
    [userId, snapshotEntries],
  );

  const join = useCallback((id: HangoutId) => setRsvp(id, "going"), [setRsvp]);
  const pass = useCallback((id: HangoutId) => setRsvp(id, "passed"), [setRsvp]);
  const clearRsvp = useCallback((id: HangoutId) => setRsvp(id, null), [setRsvp]);

  const addHangout = useCallback(
    async (input: NewHangoutInput): Promise<Hangout> => {
      if (!userId) {
        throw new Error("Sign in to host a hangout.");
      }
      const id = `hangout-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const privacy = input.privacy ?? "public";
      const isPrivate = privacy !== "public";
      const allowPlusOnes = input.allowPlusOnes ?? false;
      const inviteCode =
        isPrivate && input.withInviteCode ? generateInviteCode() : undefined;
      const publicLocation = isPrivate ? coarsen(input.location) : input.location;
      const publicPlaceLabel = isPrivate
        ? await neighborhoodFor(input.location)
        : input.placeLabel;
      const hangout: Hangout = {
        id,
        title: input.title,
        description: input.description,
        category: input.category,
        emoji: input.emoji,
        location: input.location,
        placeLabel: input.placeLabel,
        startsAt: input.startsAt,
        hostName: input.hostName ?? "You",
        hostId: userId,
        goingCount: 1,
        privacy,
        allowPlusOnes,
        access: "full",
        requestPending: false,
      };
      const entry: HangoutEntry = {
        hangout,
        baseGoingCount: 1,
        goingUserIds: [],
        passedUserIds: [],
        requestedUserIds: [],
        approvedUserIds: [],
        deniedUserIds: [],
        plusOneUserIds: [],
        removed: false,
      };
      if (isPrivate) {
        setPrivateDetails((prev) => ({
          ...prev,
          [id]: {
            location: input.location,
            placeLabel: input.placeLabel,
            description: input.description,
            inviteCode,
          },
        }));
      }
      // Show the pin immediately; the snapshot confirms it (or we roll back).
      setPendingEntries((prev) => [...prev, entry]);
      setIsSubmitting(true);
      try {
        const batch = writeBatch(db);
        batch.set(doc(db, "hangouts", id), {
          title: input.title,
          description: isPrivate ? LIMITED_DESCRIPTION : input.description,
          category: input.category,
          emoji: input.emoji,
          location: publicLocation,
          placeLabel: publicPlaceLabel,
          startsAt: Timestamp.fromDate(new Date(input.startsAt)),
          hostName: input.hostName ?? "You",
          hostId: userId,
          baseGoingCount: 1,
          goingUserIds: [],
          passedUserIds: [],
          privacy,
          allowPlusOnes,
          requestedUserIds: [],
          approvedUserIds: [],
          deniedUserIds: [],
          plusOneUserIds: [],
          ...(inviteCode
            ? { inviteCodeHash: await hashInviteCode(inviteCode) }
            : {}),
          createdAt: serverTimestamp(),
        });
        if (isPrivate) {
          batch.set(doc(db, "hangouts", id, "private", "details"), {
            location: input.location,
            placeLabel: input.placeLabel,
            description: input.description,
            ...(inviteCode ? { inviteCode } : {}),
          });
        }
        // Every hangout gets a group chat seeded with its host.
        batch.set(doc(db, "conversations", id), {
          type: "group",
          hangoutId: id,
          hangoutTitle: input.title,
          emoji: input.emoji,
          participantUserIds: [userId],
          lastMessage: null,
          lastReadAt: {},
          createdAt: serverTimestamp(),
        });
        await batch.commit();
        return hangout;
      } catch (error) {
        // Roll back the optimistic entry so the UI never shows a ghost pin.
        setPendingEntries((prev) =>
          prev.filter((item) => item.hangout.id !== id),
        );
        setPrivateDetails((prev) => {
          const { [id]: _removed, ...rest } = prev;
          return rest;
        });
        console.warn("Failed to save hangout:", error);
        throw error instanceof Error
          ? error
          : new Error("Could not publish your hangout. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [userId],
  );

  // Fetch exact details for private hangouts the viewer may see.
  useEffect(() => {
    const wanted = entries.filter(
      (entry) =>
        entry.hangout.privacy !== "public" &&
        hasFullAccess(entry, userId) &&
        !privateDetails[entry.hangout.id],
    );
    for (const entry of wanted) {
      const id = entry.hangout.id;
      void getDoc(doc(db, "hangouts", id, "private", "details"))
        .then((snap) => {
          if (snap.exists()) {
            setPrivateDetails((prev) => ({
              ...prev,
              [id]: snap.data() as PrivateDetails,
            }));
          }
        })
        .catch((error) => console.warn("Failed to load private details:", error));
    }
  }, [entries, userId, privateDetails]);

  const viewEntries = useMemo(
    () =>
      entries.map((entry): HangoutEntry => {
        if (entry.hangout.privacy === "public") return entry;
        if (hasFullAccess(entry, userId)) {
          const details = privateDetails[entry.hangout.id];
          return {
            ...entry,
            hangout: {
              ...entry.hangout,
              access: "full",
              ...(details
                ? {
                    location: details.location,
                    placeLabel: details.placeLabel,
                    description: details.description,
                  }
                : {}),
            },
          };
        }
        return {
          ...entry,
          hangout: {
            ...entry.hangout,
            access: "limited",
            description: LIMITED_DESCRIPTION,
            requestPending: Boolean(
              userId && entry.requestedUserIds.includes(userId),
            ),
          },
        };
      }),
    [entries, userId, privateDetails],
  );

  const hangouts = useMemo(() => viewEntries.map((entry) => entry.hangout), [viewEntries]);

  const rsvps = useMemo(() => {
    const next: Record<HangoutId, RsvpStatus> = {};
    if (!userId) return next;
    for (const entry of entries) {
      if (entry.goingUserIds.includes(userId)) {
        next[entry.hangout.id] = "going";
      } else if (entry.passedUserIds.includes(userId)) {
        next[entry.hangout.id] = "passed";
      }
    }
    return next;
  }, [entries, userId]);

  const goingCount = useCallback(
    (id: HangoutId) => {
      const entry = entries.find((item) => item.hangout.id === id);
      if (!entry) return 0;
      return (
        entry.baseGoingCount +
        entry.goingUserIds.length +
        entry.plusOneUserIds.length
      );
    },
    [entries, userId],
  );

  const patchHangout = useCallback((id: HangoutId, data: Record<string, unknown>) => {
    updateDoc(doc(db, "hangouts", id), data).catch((error) =>
      console.warn("Failed to update hangout:", error),
    );
  }, []);

  const findEntry = useCallback(
    (id: HangoutId) => entries.find((item) => item.hangout.id === id),
    [entries],
  );

  /** Runs `action` only when the current user hosts the hangout. */
  const asHost = useCallback(
    (id: HangoutId, action: (entry: HangoutEntry) => void) => {
      const entry = findEntry(id);
      if (entry && userId && entry.hangout.hostId === userId) action(entry);
    },
    [findEntry, userId],
  );

  const requestAccess = useCallback(
    (id: HangoutId) => {
      const entry = findEntry(id);
      if (!userId || !entry || entry.hangout.privacy !== "request") return;
      if (entry.deniedUserIds.includes(userId)) return;
      patchHangout(id, { requestedUserIds: arrayUnion(userId) });
    },
    [findEntry, patchHangout, userId],
  );

  const cancelRequest = useCallback(
    (id: HangoutId) => {
      if (!userId) return;
      patchHangout(id, { requestedUserIds: arrayRemove(userId) });
    },
    [patchHangout, userId],
  );

  const redeemInviteCode = useCallback(
    async (code: string): Promise<string> => {
      if (!userId) throw new Error("Sign in to use an invite code.");
      const trimmed = code.trim();
      if (trimmed.length === 0) throw new Error("Enter an invite code.");
      const matches = await getDocs(
        query(
          collection(db, "hangouts"),
          where("inviteCodeHash", "==", await hashInviteCode(trimmed)),
          limit(1),
        ),
      );
      const match = matches.docs[0];
      const data = match?.data() as HangoutDoc | undefined;
      if (!match || !data) throw new Error("That invite code isn't valid.");
      if ((data.deniedUserIds ?? []).includes(userId)) {
        throw new Error("The host can't accept you for this hangout.");
      }
      await updateDoc(match.ref, {
        approvedUserIds: arrayUnion(userId),
        requestedUserIds: arrayRemove(userId),
      });
      return data.title;
    },
    [userId],
  );

  const inviteUser = useCallback(
    (id: HangoutId, guestId: string) =>
      asHost(id, () =>
        patchHangout(id, {
          approvedUserIds: arrayUnion(guestId),
          requestedUserIds: arrayRemove(guestId),
          deniedUserIds: arrayRemove(guestId),
        }),
      ),
    [asHost, patchHangout],
  );

  const approveRequest = useCallback(
    (id: HangoutId, guestId: string) =>
      asHost(id, () =>
        patchHangout(id, {
          approvedUserIds: arrayUnion(guestId),
          requestedUserIds: arrayRemove(guestId),
        }),
      ),
    [asHost, patchHangout],
  );

  const denyRequest = useCallback(
    (id: HangoutId, guestId: string) =>
      asHost(id, () =>
        patchHangout(id, {
          requestedUserIds: arrayRemove(guestId),
          deniedUserIds: arrayUnion(guestId),
        }),
      ),
    [asHost, patchHangout],
  );

  const removeGuest = useCallback(
    (id: HangoutId, guestId: string) =>
      asHost(id, () => {
        patchHangout(id, {
          approvedUserIds: arrayRemove(guestId),
          goingUserIds: arrayRemove(guestId),
          plusOneUserIds: arrayRemove(guestId),
          requestedUserIds: arrayRemove(guestId),
          deniedUserIds: arrayUnion(guestId),
        });
        updateDoc(doc(db, "conversations", id), {
          participantUserIds: arrayRemove(guestId),
        }).catch((error) => console.warn("Failed to update chat members:", error));
      }),
    [asHost, patchHangout],
  );

  const setAllowPlusOnes = useCallback(
    (id: HangoutId, allow: boolean) =>
      asHost(id, () =>
        patchHangout(id, {
          allowPlusOnes: allow,
          ...(allow ? {} : { plusOneUserIds: [] }),
        }),
      ),
    [asHost, patchHangout],
  );

  const regenerateInviteCode = useCallback(
    async (id: HangoutId): Promise<string> => {
      const entry = findEntry(id);
      if (!entry || !userId || entry.hangout.hostId !== userId) {
        throw new Error("Only the host can create an invite code.");
      }
      if (entry.hangout.privacy === "public") {
        throw new Error("Public hangouts don't need an invite code.");
      }
      const code = generateInviteCode();
      const hash = await hashInviteCode(code);
      const batch = writeBatch(db);
      batch.update(doc(db, "hangouts", id), { inviteCodeHash: hash });
      batch.set(
        doc(db, "hangouts", id, "private", "details"),
        { inviteCode: code },
        { merge: true },
      );
      await batch.commit();
      setPrivateDetails((prev) => ({
        ...prev,
        ...(prev[id] ? { [id]: { ...prev[id], inviteCode: code } } : {}),
      }));
      return code;
    },
    [findEntry, userId],
  );

  const getInviteCode = useCallback(
    (id: HangoutId) => privateDetails[id]?.inviteCode ?? null,
    [privateDetails],
  );

  const getPeople = useCallback(
    (id: HangoutId): HangoutPeople => {
      const entry = findEntry(id);
      return {
        requested: entry?.requestedUserIds ?? [],
        approved: entry?.approvedUserIds ?? [],
        denied: entry?.deniedUserIds ?? [],
        going: entry?.goingUserIds ?? [],
        plusOnes: entry?.plusOneUserIds ?? [],
      };
    },
    [findEntry],
  );

  const hasPlusOne = useCallback(
    (id: HangoutId) =>
      Boolean(userId && findEntry(id)?.plusOneUserIds.includes(userId)),
    [findEntry, userId],
  );

  const togglePlusOne = useCallback(
    (id: HangoutId) => {
      const entry = findEntry(id);
      if (!userId || !entry || !entry.hangout.allowPlusOnes) return;
      if (!entry.goingUserIds.includes(userId)) return;
      patchHangout(id, {
        plusOneUserIds: entry.plusOneUserIds.includes(userId)
          ? arrayRemove(userId)
          : arrayUnion(userId),
      });
    },
    [findEntry, patchHangout, userId],
  );

  const lookupNames = useCallback(
    async (userIds: string[]): Promise<Record<string, string>> => {
      const result: Record<string, string> = {};
      await Promise.all(
        userIds.map(async (id) => {
          try {
            const snap = await getDoc(doc(db, "users", id));
            const name = snap.data()?.displayName;
            result[id] = typeof name === "string" && name ? name : id;
          } catch {
            result[id] = id;
          }
        }),
      );
      return result;
    },
    [],
  );

  const searchUsers = useCallback(async (prefix: string) => {
    const text = prefix.trim();
    if (text.length < 2) return [];
    const snap = await getDocs(
      query(
        collection(db, "users"),
        where("displayName", ">=", text),
        where("displayName", "<=", `${text}\uf8ff`),
        limit(5),
      ),
    );
    return snap.docs.map((d) => ({
      id: d.id,
      displayName: String(d.data().displayName ?? d.id),
    }));
  }, []);

  const editHangout = useCallback(
    async (id: HangoutId, edits: HangoutEdits): Promise<void> => {
      const entry = findEntry(id);
      if (!entry || !userId || entry.hangout.hostId !== userId) {
        throw new Error("Only the host can edit this hangout.");
      }
      const title = edits.title.trim();
      if (title.length === 0) throw new Error("Give your hangout a title.");
      const isPrivate = entry.hangout.privacy !== "public";
      const batch = writeBatch(db);
      batch.update(doc(db, "hangouts", id), {
        title,
        category: edits.category,
        emoji: edits.emoji,
        // Private hangouts keep exact text in the details doc; the public
        // doc only carries the neutral placeholder.
        ...(isPrivate
          ? {}
          : {
              description: edits.description.trim(),
              placeLabel: edits.placeLabel.trim() || "Shared pin",
            }),
      });
      if (isPrivate) {
        batch.set(
          doc(db, "hangouts", id, "private", "details"),
          {
            description: edits.description.trim(),
            placeLabel: edits.placeLabel.trim() || "Shared pin",
          },
          { merge: true },
        );
      }
      await batch.commit();
      setPrivateDetails((prev) =>
        prev[id]
          ? {
              ...prev,
              [id]: {
                ...prev[id],
                description: edits.description.trim(),
                placeLabel: edits.placeLabel.trim() || "Shared pin",
              },
            }
          : prev,
      );
    },
    [findEntry, userId],
  );

  const cancelHangout = useCallback(
    async (id: HangoutId): Promise<void> => {
      const entry = findEntry(id);
      if (!entry || !userId || entry.hangout.hostId !== userId) {
        throw new Error("Only the host can cancel this hangout.");
      }
      await updateDoc(doc(db, "hangouts", id), { cancelled: true });
    },
    [findEntry, userId],
  );

  const focusHangout = useCallback((id: HangoutId) => setFocusedHangoutId(id), []);
  const clearFocus = useCallback(() => setFocusedHangoutId(null), []);

  const value = useMemo<HangoutsContextValue>(
    () => ({
      hangouts,
      rsvps,
      canRsvp,
      isLoading,
      syncError,
      isSubmitting,
      join,
      pass,
      clearRsvp,
      addHangout,
      editHangout,
      cancelHangout,
      requestAccess,
      cancelRequest,
      redeemInviteCode,
      inviteUser,
      approveRequest,
      denyRequest,
      removeGuest,
      setAllowPlusOnes,
      regenerateInviteCode,
      getInviteCode,
      getPeople,
      hasPlusOne,
      togglePlusOne,
      lookupNames,
      searchUsers,
      goingCount,
      focusedHangoutId,
      focusHangout,
      clearFocus,
    }),
    [
      hangouts,
      rsvps,
      canRsvp,
      isLoading,
      syncError,
      isSubmitting,
      join,
      pass,
      clearRsvp,
      addHangout,
      editHangout,
      cancelHangout,
      requestAccess,
      cancelRequest,
      redeemInviteCode,
      inviteUser,
      approveRequest,
      denyRequest,
      removeGuest,
      setAllowPlusOnes,
      regenerateInviteCode,
      getInviteCode,
      getPeople,
      hasPlusOne,
      togglePlusOne,
      lookupNames,
      searchUsers,
      goingCount,
      focusedHangoutId,
      focusHangout,
      clearFocus,
    ],
  );

  return <HangoutsContext.Provider value={value}>{children}</HangoutsContext.Provider>;
}