import type { ComponentProps } from "react";
import type Ionicons from "@react-native-vector-icons/ionicons";
import type { HangoutCategory } from "./types/hangout";

export type IconName = ComponentProps<typeof Ionicons>["name"];

export interface CategoryMeta {
  label: string;
  /** Stored on the hangout document for backwards compatibility; never rendered. */
  emoji: string;
  icon: IconName;
  /** Playful per-category accent used for tiles, pins and chips. */
  color: string;
}

export const CATEGORY_META: Record<HangoutCategory, CategoryMeta> = {
  chill: { label: "Chill", emoji: "🛋️", icon: "cafe", color: "#9B8CFF" },
  food: { label: "Food", emoji: "🍜", icon: "restaurant", color: "#FF8A4C" },
  sports: { label: "Sports", emoji: "🏀", icon: "basketball", color: "#4CA6FF" },
  party: { label: "Party", emoji: "🎉", icon: "sparkles", color: "#FF5CA8" },
  study: { label: "Study", emoji: "📚", icon: "book", color: "#FFC94C" },
  misc: { label: "Something else", emoji: "✨", icon: "shapes", color: "#4FD1B5" },
};

/** Unknown or missing categories (older docs, typos) land on "misc". */
export function categoryMeta(category: string | undefined): CategoryMeta {
  return CATEGORY_META[category as HangoutCategory] ?? CATEGORY_META.misc;
}

/** Human-friendly head count; a lone host isn't counted as "going" to their own event. */
export function goingLabel(count: number): string {
  if (count <= 0) return "Be the first in";
  return count === 1 ? "1 going" : `${count} going`;
}

export const CATEGORY_ORDER: readonly HangoutCategory[] = [
  "chill",
  "food",
  "sports",
  "party",
  "study",
  "misc",
];

export const PRIVACY_META = {
  public: { label: "Public", icon: "earth" },
  request: { label: "Request to join", icon: "hand-left" },
  invite: { label: "Invite only", icon: "mail" },
  friends: { label: "Friends only", icon: "heart" },
} as const satisfies Record<string, { label: string; icon: IconName }>;
