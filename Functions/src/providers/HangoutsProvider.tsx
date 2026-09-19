import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
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
import { useAuth } from "@clerk/expo";
import { db } from "../../Configs/FirebaseConfig";
import type {
  Hangout,
  HangoutCategory,
  HangoutId,
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
}

/** Internal entry: the hangout plus the raw RSVP arrays used to derive state. */
interface HangoutEntry {
  hangout: Hangout;
  baseGoingCount: number;
  goingUserIds: string[];
  passedUserIds: string[];
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
    },
    baseGoingCount: data.baseGoingCount ?? 0,
    goingUserIds: data.goingUserIds ?? [],
    passedUserIds: data.passedUserIds ?? [],
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
      (entry) => startTime(entry.hangout.startsAt) > now,
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
      expired.map((entry) =>
        deleteDoc(doc(db, "hangouts", entry.hangout.id)),
      ),
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
      const docRef = doc(db, "hangouts", id);
      const update =
        status === "going"
          ? { goingUserIds: arrayUnion(userId), passedUserIds: arrayRemove(userId) }
          : status === "passed"
            ? { passedUserIds: arrayUnion(userId), goingUserIds: arrayRemove(userId) }
            : { goingUserIds: arrayRemove(userId), passedUserIds: arrayRemove(userId) };
      updateDoc(docRef, update).catch((error) =>
        console.warn("Failed to update RSVP:", error),
      );
    },
    [userId],
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
      };
      const entry: HangoutEntry = {
        hangout,
        baseGoingCount: 1,
        goingUserIds: [],
        passedUserIds: [],
      };
      // Show the pin immediately; the snapshot confirms it (or we roll back).
      setPendingEntries((prev) => [...prev, entry]);
      setIsSubmitting(true);
      try {
        await setDoc(doc(db, "hangouts", id), {
          title: input.title,
          description: input.description,
          category: input.category,
          emoji: input.emoji,
          location: input.location,
          placeLabel: input.placeLabel,
          startsAt: Timestamp.fromDate(new Date(input.startsAt)),
          hostName: input.hostName ?? "You",
          hostId: userId,
          baseGoingCount: 1,
          goingUserIds: [],
          passedUserIds: [],
          createdAt: serverTimestamp(),
        });
        return hangout;
      } catch (error) {
        // Roll back the optimistic entry so the UI never shows a ghost pin.
        setPendingEntries((prev) =>
          prev.filter((item) => item.hangout.id !== id),
        );
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

  const hangouts = useMemo(() => entries.map((entry) => entry.hangout), [entries]);

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
      const mine = userId && entry.goingUserIds.includes(userId) ? 1 : 0;
      return entry.baseGoingCount + mine;
    },
    [entries, userId],
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
      goingCount,
      focusedHangoutId,
      focusHangout,
      clearFocus,
    ],
  );

  return <HangoutsContext.Provider value={value}>{children}</HangoutsContext.Provider>;
}