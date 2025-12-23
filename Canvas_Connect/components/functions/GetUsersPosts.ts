import { useUserDataStore } from "../hooks/store";
import { db } from "../../Configs/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { postType } from "@/constants/types/postType";
import { useEffect, useState } from "react";

export default function GetUsersPosts() {
  const userData = useUserDataStore((state) => state.data);
  const [loadedPosts, setLoadedPosts] = useState<postType[] | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userData.posts || userData.posts.length === 0) {
        setLoadedPosts([]);
        return;
      }
      
      const posts: postType[] = [];
      for (const postId of userData.posts) {
        try {
          const docRef = doc(db, "posts", postId.toString());
          const docSnap = await getDoc(docRef);
          const postData = docSnap.data();
          
          if (docSnap.exists() && postData) {
            posts.push({ ...(postData as postType), id: docSnap.id });
          }
        } catch (error) {
          console.error("Error fetching post:", postId, error);
        }
      }
      setLoadedPosts(posts);
    };

    fetchPosts();
  }, [userData.posts, refreshKey]);

  return { posts: loadedPosts, refresh };
}
