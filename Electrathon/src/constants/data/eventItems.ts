import type { EventItem } from "../types/EventItem";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchEventItems(): Promise<EventItem[]> {
  try {
    const docRef = collection(db, "events");
    const snapshot = await getDocs(docRef);
    return snapshot.docs.map((event) => {
      const data = event.data() as EventItem;
      return {
        title: data.title ?? "Not working",
        date: data.date ?? "",
        time: data.time ?? "",
        description: data.description ?? "",
        location: data.location ?? "",
      } as EventItem;
    });
  } catch (err) {
    console.error("fetchEventItems error:", err);
    return [];
  }
}
