import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/Configs/FirebaseConfig";

type UpdateUserPostsProps = {
  userEmail: string;
  postId: number;
};

// changeing the user's posts array to include their newest post's ID
export const updateUserPosts = async ({
  userEmail,
  postId,
}: UpdateUserPostsProps) => {
  try {
    const userRef = doc(db, "users", userEmail);
    await updateDoc(userRef, {
      posts: arrayUnion(postId),
    });
    console.log("User posts updated successfully");
  } catch (error) {
    console.error("Error updating user posts:", error);
    throw new Error("Failed to update user's post list");
  }
};
