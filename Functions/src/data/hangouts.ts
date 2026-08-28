import type { Hangout } from "../constants/types/hangout";

/** Default map framing before fit-to-markers runs. */
export const MAP_INITIAL_REGION = {
  latitude: 30.2672,
  longitude: -97.7431,
  latitudeDelta: 0.05,
  longitudeDelta: 0.03,
};

/** ISO timestamp helper relative to "now" so seed data always looks upcoming. */
const at = (dayOffset: number, hour: number, minute = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
};

export const SEED_HANGOUTS: readonly Hangout[] = [
  {
    id: "seed-rooftop-sunset",
    title: "Rooftop Sunset Hang",
    description:
      "Golden hour on the roof — bring a drink, catch the skyline, meet new people.",
    category: "party",
    emoji: "🌆",
    location: { latitude: 30.2669, longitude: -97.7428 },
    placeLabel: "Downtown rooftop",
    startsAt: at(0, 19, 30),
    hostName: "Maya",
    goingCount: 8,
  },
  {
    id: "seed-taco-run",
    title: "Late Night Taco Run",
    description: "Food truck crawl after dark. Split a few tacos, no plans needed.",
    category: "food",
    emoji: "🌮",
    location: { latitude: 30.2622, longitude: -97.7362 },
    placeLabel: "East 6th food trucks",
    startsAt: at(0, 22, 0),
    hostName: "Dev",
    goingCount: 5,
  },
  {
    id: "seed-hoops-shores",
    title: "Pickup Basketball @ the Shores",
    description: "Three-on-three, all skill levels. Water and a ball provided.",
    category: "sports",
    emoji: "🏀",
    location: { latitude: 30.2613, longitude: -97.7515 },
    placeLabel: "Auditorium Shores courts",
    startsAt: at(1, 10, 0),
    hostName: "Jordan",
    goingCount: 6,
  },
  {
    id: "seed-coffee-code",
    title: "Coffee & Code Jam",
    description: "Side projects, laptops, good coffee. Quiet table reserved in the back.",
    category: "study",
    emoji: "☕",
    location: { latitude: 30.2704, longitude: -97.7455 },
    placeLabel: "Corner café on 8th",
    startsAt: at(1, 14, 0),
    hostName: "Sam",
    goingCount: 4,
  },
  {
    id: "seed-park-picnic",
    title: "Park Picnic & Frisbee",
    description: "Blankets out under the oaks. Bring snacks, we bring the frisbee.",
    category: "chill",
    emoji: "🥏",
    location: { latitude: 30.2711, longitude: -97.7482 },
    placeLabel: "Wooldridge Park",
    startsAt: at(2, 12, 30),
    hostName: "Riley",
    goingCount: 9,
  },
];