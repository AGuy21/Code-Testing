import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/Configs/FirebaseConfig";

export const getNextPostId = async (): Promise<number> => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("__name__", "desc"), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return 1; // First post is 1
    }

    const lastDoc = querySnapshot.docs[0];
    const lastId = parseInt(lastDoc.id);
    return lastId + 1;

  } catch (error) {
    console.error("Error getting next post ID:", error);
    throw new Error("Failed to generate post ID");
  }
};
