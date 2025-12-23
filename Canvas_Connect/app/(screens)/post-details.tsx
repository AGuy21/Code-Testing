import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, updateDoc, collection, addDoc, onSnapshot, query, orderBy, increment, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/Configs/FirebaseConfig";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import { useUserDataStore } from "@/components/hooks/store";
import { postType } from "@/constants/types/postType";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import BaseProfilePicture from "@/constants/BaseProfilePicture";
import SelectionModal from "@/components/ui/SelectionModal";

type Comment = {
  id: string;
  text: string;
  userEmail: string;
  username: string;
  profilePicture: string;
  createdAt: any;
};

const PostDetails = () => {
  const { postId } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useThemeStore();
  const userData = useUserDataStore((state) => state.data);
  
  const [post, setPost] = useState<postType | null>(null);
  const [creatorUsername, setCreatorUsername] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!postId) return;

    const postRef = doc(db, "posts", postId as string);
    
    // Subscribe to post updates
    const unsubscribePost = onSnapshot(postRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as postType;
        setPost({ ...data, id: docSnap.id });
        
        // Fetch creator username
        if (data.creatorEmail) {
            try {
                const userDoc = await getDoc(doc(db, "users", data.creatorEmail));
                if (userDoc.exists()) {
                    setCreatorUsername(userDoc.data().username);
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
    const commentsRef = collection(db, "posts", postId as string, "comments");
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
    const postRef = doc(db, "posts", postId as string);
    
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
      // Optimistic update is handled by onSnapshot, but we can toggle local state for instant feedback
      // actually onSnapshot is fast enough usually, but let's rely on it to keep source of truth
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim().length === 0) return;
    if (newComment.length > 250) {
        setErrorMessage("Comment must be 250 characters or less.");
        setErrorVisible(true);
        return;
    }

    try {
      const commentsRef = collection(db, "posts", postId as string, "comments");
      await addDoc(commentsRef, {
        text: newComment,
        userEmail: userData.email,
        username: userData.username,
        profilePicture: userData.profilePicture || BaseProfilePicture,
        createdAt: new Date(),
      });

      // Update comments count on the post document
      const postRef = doc(db, "posts", postId as string);
      await updateDoc(postRef, {
        commentsCount: increment(1)
      });

      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      setErrorMessage("Failed to add comment");
      setErrorVisible(true);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!post) return null;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, { backgroundColor: colors.background }]}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View style={[styles.header, { borderBottomColor: colors.primaryDark }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Post Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.postContainer}>
          <View style={styles.userInfo}>
             <Text style={[styles.username, { color: colors.text }]}>{creatorUsername}</Text>
          </View>
          
          <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="contain" />
          
          <View style={styles.actions}>
            <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
              <FontAwesome name={isLiked ? "heart" : "heart-o"} size={24} color={isLiked ? colors.error : colors.text} />
              <Text style={[styles.actionText, { color: colors.text }]}>{post.likes}</Text>
            </TouchableOpacity>
            <View style={styles.actionButton}>
              <FontAwesome name="comments-o" size={24} color={colors.text} />
              <Text style={[styles.actionText, { color: colors.text }]}>{comments.length}</Text>
            </View>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>{post.title}</Text>
          <Text style={[styles.description, { color: colors.text2 }]}>{post.description}</Text>
        </View>

        <View style={[styles.commentsSection, { borderTopColor: colors.primaryDark }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Comments</Text>
          {comments.map((comment) => (
            <View key={comment.id} style={[styles.commentItem, { borderBottomColor: colors.primaryDark }]}>
              <Image source={{ uri: comment.profilePicture }} style={styles.commentAvatar} />
              <View style={styles.commentContent}>
                <Text style={[styles.commentUser, { color: colors.text }]}>{comment.username}</Text>
                <Text style={[styles.commentText, { color: colors.text2 }]}>{comment.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.inputContainer, { backgroundColor: colors.background, borderTopColor: colors.primaryDark }]}>
        <TextInput
          style={[styles.input, { color: colors.text, backgroundColor: colors.primaryDark }]}
          placeholder="Add a comment..."
          placeholderTextColor={colors.text2}
          value={newComment}
          onChangeText={setNewComment}
          maxLength={250}
        />
        <TouchableOpacity onPress={handleAddComment} disabled={!newComment.trim()}>
          <Ionicons name="send" size={24} color={newComment.trim() ? colors.secondary : colors.text2} />
        </TouchableOpacity>
      </View>

      <SelectionModal
        visible={errorVisible}
        title="Error"
        message={errorMessage}
        onClose={() => setErrorVisible(false)}
        options={[{ text: "OK", style: "cancel" }]}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp(4),
    borderBottomWidth: 1,
    paddingTop: hp(6), // Adjust for status bar
  },
  backButton: {
    marginRight: wp(4),
  },
  headerTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
  },
  scrollContent: {
    paddingBottom: hp(10),
  },
  postContainer: {
    paddingBottom: hp(2),
  },
  userInfo: {
    padding: wp(4),
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontWeight: "bold",
    fontSize: hp(2),
  },
  postImage: {
    width: wp(100),
    height: hp(50),
    backgroundColor: 'black',
  },
  actions: {
    flexDirection: "row",
    padding: wp(4),
    gap: wp(4),
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2),
  },
  actionText: {
    fontWeight: "bold",
    fontSize: hp(2),
  },
  title: {
    paddingHorizontal: wp(4),
    fontWeight: "bold",
    fontSize: hp(2),
    marginBottom: hp(0.5),
  },
  description: {
    paddingHorizontal: wp(4),
    fontSize: hp(1.8),
  },
  commentsSection: {
    borderTopWidth: 1,
    marginTop: hp(2),
    padding: wp(4),
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: hp(2.2),
    marginBottom: hp(2),
  },
  commentItem: {
    flexDirection: "row",
    marginBottom: hp(2),
    paddingBottom: hp(2),
    borderBottomWidth: 0.5,
  },
  commentAvatar: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    marginRight: wp(3),
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontWeight: "bold",
    marginBottom: hp(0.5),
  },
  commentText: {
    fontSize: hp(1.8),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp(4),
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    padding: wp(3),
    borderRadius: 20,
    marginRight: wp(3),
  },
});

export default PostDetails;
