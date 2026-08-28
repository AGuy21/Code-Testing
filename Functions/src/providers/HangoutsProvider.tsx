import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  writeBatch,
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
import { SEED_HANGOUTS } from "../data/hangouts";
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
  join: (id: HangoutId) => void;
  pass: (id: HangoutId) => void;
  clearRsvp: (id: HangoutId) => void;
  addHangout: (input: NewHangoutInput) => Hangout;
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

// PROVIDER_BELOW

export function HangoutsProvider({ children }: { children: ReactNode }) {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<HangoutEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setEntries(
          snapshot.docs.map((docSnap) =>
            mapDocToEntry(docSnap.id, docSnap.data() as HangoutDoc),
          ),
        );
        setIsLoading(false);
      },
      (error) => {
        console.warn("Failed to load hangouts:", error);
        setIsLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  // Seed starter hangouts once, when the collection is still empty.
  const hasSeededRef = useRef(false);
  useEffect(() => {
    if (hasSeededRef.current || isLoading || entries.length > 0) return;
    hasSeededRef.current = true;
    const seed = async () => {
      try {
        const batch = writeBatch(db);
        const collectionRef = collection(db, "hangouts");
        for (const seedHangout of SEED_HANGOUTS) {
          const docRef = doc(collectionRef);
          batch.set(docRef, {
            title: seedHangout.title,
            description: seedHangout.description,
            category: seedHangout.category,
            emoji: seedHangout.emoji,
            location: seedHangout.location,
            placeLabel: seedHangout.placeLabel,
            startsAt: Timestamp.fromDate(new Date(seedHangout.startsAt)),
            hostName: seedHangout.hostName,
            baseGoingCount: seedHangout.goingCount,
            goingUserIds: [],
            passedUserIds: [],
            createdAt: serverTimestamp(),
          });
        }
        await batch.commit();
      } catch (error) {
        console.warn("Failed to seed hangouts:", error);
      }
    };
    void seed();
  }, [isLoading, entries.length]);

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
    (input: NewHangoutInput): Hangout => {
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
        hostId: userId ?? undefined,
        goingCount: 1,
      };
      // The real-time snapshot picks this up once written.
      setDoc(doc(db, "hangouts", id), {
        title: input.title,
        description: input.description,
        category: input.category,
        emoji: input.emoji,
        location: input.location,
        placeLabel: input.placeLabel,
        startsAt: Timestamp.fromDate(new Date(input.startsAt)),
        hostName: input.hostName ?? "You",
        hostId: userId ?? null,
        baseGoingCount: 1,
        goingUserIds: [],
        passedUserIds: [],
        createdAt: serverTimestamp(),
      }).catch((error) => console.warn("Failed to save hangout:", error));
      return hangout;
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