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

export const usePostDetails = (post: postType) => {
  const userData = useUserDataStore((state) => state.data);
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(post.likedBy?.includes(userData.email) || false);
  const [loading, setLoading] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!post.id) return;

    // Subscribe to comments
    const commentsRef = collection(db, "posts", post.id, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));
    const unsubscribeComments = onSnapshot(q, (snapshot) => {
      const loadedComments: Comment[] = [];
      snapshot.forEach((doc) => {
        loadedComments.push({ id: doc.id, ...doc.data() } as Comment);
      });
      setComments(loadedComments);
      setLoading(false);
    });

    return () => {
      unsubscribeComments();
    };
  }, [post.id]);

  const handleLike = async () => {
    const postRef = doc(db, "posts", post.id);
    
    // Optimistic update
    setIsLiked(!isLiked);

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
      // Revert on error
      setIsLiked(isLiked);
    }
  };

  const addComment = async (text: string) => {
    if (text.trim().length === 0) return;
    
    try {
      const commentsRef = collection(db, "posts", post.id, "comments");
      await addDoc(commentsRef, {
        text: text,
        userEmail: userData.email,
        username: userData.username,
        profilePicture: userData.profilePicture || BaseProfilePicture,
        createdAt: new Date(),
      });

      // Update comments count on the post document
      const postRef = doc(db, "posts", post.id);
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
