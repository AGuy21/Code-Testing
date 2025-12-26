import type { EventItem } from "../types/EventItem";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

// Static practice events to supplement DB data
const practiceEvents: EventItem[] = [
  {
    title: "Electrathon Meeting",
    date: "Every Thursday",
    time: "4:00 PM - 5:00 PM",
    description: "Weekly team meeting to discuss project updates and plan upcoming activities. Located in Panther Hall 210",
    location: "Allen D. Nease High School",
    type: "Practice"
  },
  {
    title: "Safety Inspection Day",
    date: "Oct 15, 2025",
    time: "9:00 AM - 12:00 PM",
    description: "Mandatory safety check for all competition vehicles prior to the season opener. Located in the school parking lot.",
    location: "Allen D. Nease High School`",
    type: "Workshop"
  }
];

export async function fetchEventItems(): Promise<EventItem[]> {
  try {
    const docRef = collection(db, "events");
    const snapshot = await getDocs(docRef);
    const dbEvents = snapshot.docs.map((event) => {
      const data = event.data() as EventItem;
      return {
        title: data.title ?? "Event",
        date: data.date ?? "TBD",
        time: data.time ?? "TBD",
        description: data.description ?? "No description available.",
        location: data.location ?? "TBD",
        type: data.type ?? "Race", // Default to Race if not specified
        trackLayoutUrl: data.trackLayoutUrl,
        logoUrl: data.logoUrl
      } as EventItem;
    });

    // Combine DB events with static practice events
    return [...dbEvents, ...practiceEvents];
  } catch (err) {
    console.error("fetchEventItems error:", err);
    // Return at least the practice events if DB fails
    return practiceEvents;
  }
}
