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
};

export const CATEGORY_ORDER: readonly HangoutCategory[] = [
  "chill",
  "food",
  "sports",
  "party",
  "study",
];

export const PRIVACY_META = {
  public: { label: "Public", icon: "earth" },
  request: { label: "Request to join", icon: "hand-left" },
  invite: { label: "Invite only", icon: "mail" },
  friends: { label: "Friends only", icon: "heart" },
} as const satisfies Record<string, { label: string; icon: IconName }>;
