import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import type { Sponsor } from "../types/Sponsor";

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
      };
    });
    return sponsors;
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return [];
  }
}
