/** Stable identifier for a hangout. */
export type HangoutId = string;

export type HangoutCategory = "chill" | "food" | "sports" | "party" | "study";

export interface LatLng {
  latitude: number;
  longitude: number;
}

/** The user's answer to "do you want to join this hangout?" */
export type RsvpStatus = "going" | "passed";

export interface Hangout {
  id: HangoutId;
  title: string;
  description: string;
  category: HangoutCategory;
  emoji: string;
  location: LatLng;
  placeLabel: string;
  /** ISO 8601 timestamp. */
  startsAt: string;
  hostName: string;
  /** Clerk user id of whoever pinned the hangout (omitted for seeds). */
  hostId?: string;
  /** Base head count before the current user's RSVP is applied. */
  goingCount: number;
}