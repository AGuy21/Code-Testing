import { doc, setDoc } from "firebase/firestore";
import { db } from "@/Configs/FirebaseConfig";

export interface PostData {
  title: string;
  description: string;
  image: string;
  creatorEmail: string;
  likes: number;
}

type SavePostProps = {
  postId: number;
  postData: PostData;
};

export const savePost = async ({ postId, postData }: SavePostProps) => {
  try {
    const postRef = doc(db, "posts", postId.toString());
    await setDoc(postRef, postData);
    console.log("Post saved successfully with ID:", postId);
  } catch (error) {
    console.error("Error saving post:", error);
    throw new Error("Failed to save post to database");
  }
};
