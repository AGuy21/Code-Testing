import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import type { Donator } from "../types/Donator";

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
