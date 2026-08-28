import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
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
  join: (id: HangoutId) => void;
  pass: (id: HangoutId) => void;
  clearRsvp: (id: HangoutId) => void;
  addHangout: (input: NewHangoutInput) => Hangout;
  /** Base head count with the current user's "going" RSVP applied. */
  goingCount: (id: HangoutId) => number;
  /** Set from the Events list so the map tab can focus a marker. */
  focusedHangoutId: HangoutId | null;
  focusHangout: (id: HangoutId) => void;
  clearFocus: () => void;
}

export const HangoutsContext = createContext<HangoutsContextValue | null>(null);

export function HangoutsProvider({ children }: { children: ReactNode }) {
  const [hangouts, setHangouts] = useState<Hangout[]>([...SEED_HANGOUTS]);
  const [rsvps, setRsvps] = useState<Record<HangoutId, RsvpStatus>>({});
  const [focusedHangoutId, setFocusedHangoutId] = useState<HangoutId | null>(null);

  const join = useCallback((id: HangoutId) => {
    setRsvps((prev) => ({ ...prev, [id]: "going" }));
  }, []);

  const pass = useCallback((id: HangoutId) => {
    setRsvps((prev) => ({ ...prev, [id]: "passed" }));
  }, []);

  const clearRsvp = useCallback((id: HangoutId) => {
    setRsvps((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const addHangout = useCallback((input: NewHangoutInput): Hangout => {
    const hangout: Hangout = {
      id: `hangout-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: input.title,
      description: input.description,
      category: input.category,
      emoji: input.emoji,
      location: input.location,
      placeLabel: input.placeLabel,
      startsAt: input.startsAt,
      hostName: input.hostName ?? "You",
      goingCount: 1,
    };
    setHangouts((prev) => [hangout, ...prev]);
    return hangout;
  }, []);

  const goingCount = useCallback(
    (id: HangoutId) => {
      const hangout = hangouts.find((item) => item.id === id);
      const base = hangout ? hangout.goingCount : 0;
      return rsvps[id] === "going" ? base + 1 : base;
    },
    [hangouts, rsvps],
  );

  const focusHangout = useCallback((id: HangoutId) => setFocusedHangoutId(id), []);
  const clearFocus = useCallback(() => setFocusedHangoutId(null), []);

  const value = useMemo<HangoutsContextValue>(
    () => ({
      hangouts,
      rsvps,
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