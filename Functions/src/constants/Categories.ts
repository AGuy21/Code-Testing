import type { HangoutCategory } from "./types/hangout";

export interface CategoryMeta {
  label: string;
  emoji: string;
}

export const CATEGORY_META: Record<HangoutCategory, CategoryMeta> = {
  chill: { label: "Chill", emoji: "🛋️" },
  food: { label: "Food", emoji: "🍜" },
  sports: { label: "Sports", emoji: "🏀" },
  party: { label: "Party", emoji: "🎉" },
  study: { label: "Study", emoji: "📚" },
};

export const CATEGORY_ORDER: readonly HangoutCategory[] = [
  "chill",
  "food",
  "sports",
  "party",
  "study",
];