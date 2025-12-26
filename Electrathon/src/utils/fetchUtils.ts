import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import type { Donator } from "../constants/types/Donator";
import type { Sponsor } from "../constants/types/Sponsor";
import type { EventItem } from "../constants/types/EventItem";
import type { Stats } from "../constants/types/Stats";
import type { Trophy } from "../constants/types/Trophy";
import { practiceEvents } from "../constants/data/eventItems";

export async function fetchDonators(): Promise<Donator[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "donators"));
    const donators: Donator[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        first: data.first || "",
        last: data.last || "",
        dollars: data.dollars || "0",
        items: Array.isArray(data.items) ? data.items : [],
      };
    });
    return donators;
  } catch (error) {
    console.error("Error fetching donators:", error);
    return [];
  }
}

export async function fetchSponsors(): Promise<Sponsor[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "sponsors"));
    const sponsors: Sponsor[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "",
        dollars: data.dollars || "0",
        date: data.date || "",
        image: data.image || "",
        link: data.link || "",
      };
    });
    return sponsors;
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return [];
  }
}

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

export const fetchTrophiesAndStats = async (): Promise<{
  trophies: Trophy[]
  stats: Stats
}> => {
  try {
    const trophiesSnapshot = await getDocs(collection(db, 'trophies'))
    const trophies: Trophy[] = []
    let stats: Stats = {
      competitions: 0,
      members: 0,
      projects: 0,
      years: 0,
    }

    trophiesSnapshot.forEach((doc) => {
      const data = doc.data()
      if (doc.id === 'Stats') {
        stats = {
          competitions: data.competitions || 0,
          members: data.members || 0,
          projects: data.projects || 0,
          years: data.years || 0,
        }
      } else {
        trophies.push({ id: doc.id, ...data } as Trophy)
      }
    })

    // Sort trophies by year descending
    trophies.sort((a, b) => b.year - a.year)

    return { trophies, stats }
  } catch (error) {
    console.error('Error fetching trophies and stats:', error)
    return {
      trophies: [],
      stats: { competitions: 0, members: 0, projects: 0, years: 0 },
    }
  }
}
