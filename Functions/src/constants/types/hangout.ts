/** Stable identifier for a hangout. */
export type HangoutId = string;

export type HangoutCategory = "chill" | "food" | "sports" | "party" | "study" | "misc";

export interface LatLng {
  latitude: number;
  longitude: number;
}

/** The user's answer to "do you want to join this hangout?" */
export type RsvpStatus = "going" | "passed";

/**
 * Who may see the full hangout.
 * - public: everyone
 * - invite: only people the host invited (or who redeemed an invite code)
 * - request: anyone can ask; the host approves or denies
 * - friends: the host's approved list only (no friends graph exists yet)
 */
export type HangoutPrivacy = "public" | "invite" | "request" | "friends";

/** `limited` viewers only get title, category, neighborhood and head count. */
export type HangoutAccess = "full" | "limited";

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
  /** Clerk user id of whoever pinned the hangout. */
  hostId?: string;
  /** Base head count before the current user's RSVP is applied. */
  goingCount: number;
  privacy: HangoutPrivacy;
  /** Whether guests may bring a +1. */
  allowPlusOnes: boolean;
  /** People the host says are already coming (set by the host, not real RSVPs). */
  presetGoing: number;
  /** Viewer-specific: `limited` hides the description and exact pin. */
  access: HangoutAccess;
  /** Viewer-specific: the current user already asked to join. */
  requestPending: boolean;
}

/** Everyone the host manages for a private hangout. */
export interface HangoutPeople {
  requested: string[];
  approved: string[];
  denied: string[];
  going: string[];
  plusOnes: string[];
}