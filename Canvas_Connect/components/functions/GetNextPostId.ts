import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Configs/FirebaseConfig";

export const getNextPostId = async (): Promise<number> => {
  try {
    const postsRef = collection(db, "posts");
    const querySnapshot = await getDocs(postsRef);

    if (querySnapshot.empty) {
      return 1; // First post
    }

    let maxId = 0;
    querySnapshot.forEach((doc) => {
      const id = parseInt(doc.id);
      if (!isNaN(id) && id > maxId) {
        maxId = id;
      }
    });

    return maxId + 1;
  } catch (error) {
    console.error("Error getting next post ID:", error);
    throw new Error("Failed to generate post ID");
  }
};
