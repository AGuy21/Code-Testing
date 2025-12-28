import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, collection, addDoc, onSnapshot, query, orderBy, increment, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/Configs/FirebaseConfig";
import { postType } from "@/constants/types/postType";
import BaseProfilePicture from "@/constants/BaseProfilePicture";
import { useUserDataStore } from "@/components/hooks/store";

export type Comment = {
  id: string;
  text: string;
  userEmail: string;
  username: string;
  profilePicture: string;
  createdAt: any;
};

export const usePostDetails = (postId: string) => {
  const userData = useUserDataStore((state) => state.data);
  
  const [post, setPost] = useState<postType | null>(null);
  const [creatorUsername, setCreatorUsername] = useState("");
  const [creatorProfilePic, setCreatorProfilePic] = useState(BaseProfilePicture);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!postId) return;

    const postRef = doc(db, "posts", postId);
    
    // Subscribe to post updates
    const unsubscribePost = onSnapshot(postRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as postType;
        setPost({ ...data, id: docSnap.id });
        
        // Fetch creator username and pfp
        if (data.creatorEmail) {
            try {
                const userDoc = await getDoc(doc(db, "users", data.creatorEmail));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setCreatorUsername(userData.username);
                    if (userData.profilePicture) {
                        setCreatorProfilePic(userData.profilePicture);
                    }
                } else {
                    setCreatorUsername(data.creatorEmail); // Fallback
                }
            } catch (e) {
                console.error("Error fetching creator:", e);
                setCreatorUsername(data.creatorEmail);
            }
        }

        if (data['likedBy'] && Array.isArray(data['likedBy'])) {
            setIsLiked(data['likedBy'].includes(userData.email));
        }
      } else {
        setErrorMessage("Post not found");
        setErrorVisible(true);
      }
      setLoading(false);
    });

    // Subscribe to comments
    const commentsRef = collection(db, "posts", postId, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));
    const unsubscribeComments = onSnapshot(q, (snapshot) => {
      const loadedComments: Comment[] = [];
      snapshot.forEach((doc) => {
        loadedComments.push({ id: doc.id, ...doc.data() } as Comment);
      });
      setComments(loadedComments);
    });

    return () => {
      unsubscribePost();
      unsubscribeComments();
    };
  }, [postId, userData.email]);

  const handleLike = async () => {
    if (!post) return;
    const postRef = doc(db, "posts", postId);
    
    try {
      if (isLiked) {
        await updateDoc(postRef, {
          likes: increment(-1),
          likedBy: arrayRemove(userData.email)
        });
      } else {
        await updateDoc(postRef, {
          likes: increment(1),
          likedBy: arrayUnion(userData.email)
        });
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const addComment = async (text: string) => {
    if (text.trim().length === 0) return;
    
    try {
      const commentsRef = collection(db, "posts", postId, "comments");
      await addDoc(commentsRef, {
        text: text,
        userEmail: userData.email,
        username: userData.username,
        profilePicture: userData.profilePicture || BaseProfilePicture,
        createdAt: new Date(),
      });

      // Update comments count on the post document
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        commentsCount: increment(1)
      });

      return true;
    } catch (error) {
      console.error("Error adding comment:", error);
      setErrorMessage("Failed to add comment");
      setErrorVisible(true);
      return false;
    }
  };

  return {
    post,
    creatorUsername,
    creatorProfilePic,
    comments,
    isLiked,
    loading,
    errorVisible,
    errorMessage,
    setErrorVisible,
    handleLike,
    addComment
  };
};
