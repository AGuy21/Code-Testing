import { useUserDataStore } from "../hooks/store";
import { db } from "../../Configs/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { postType } from "@/constants/types/postType";
import { useEffect, useState } from "react";

export default function GetUsersPosts() {
  const userData = useUserDataStore((state) => state.data);
  const [loadedPosts, setLoadedPosts] = useState<postType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts: postType[] = [];
      for (const postId of userData.posts) {
        const docRef = doc(db, "posts", postId.toString());
        const docSnap = await getDoc(docRef);
        const postData = docSnap.data();
        if (postData !== undefined) {
          posts.push(postData as postType);
        }
      }
      setLoadedPosts(posts);
    };

    if (userData.posts.length > 0) {
      fetchPosts();
    }
  }, [userData.posts]);

  if (loadedPosts.length !== userData.posts.length) {
    return null; // loading
  }

  // All posts loaded
  return loadedPosts;
}
