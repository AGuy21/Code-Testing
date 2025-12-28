import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import SelectionModal from "@/components/ui/SelectionModal";
import { usePostDetails } from "@/components/hooks/usePostDetails";
import PostContent from "@/components/ui/post-details/PostContent";
import CommentList from "@/components/ui/post-details/CommentList";
import CommentInput from "@/components/ui/post-details/CommentInput";

const PostDetails = () => {
  const { postId } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useThemeStore();
  
  const {
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
  } = usePostDetails(postId as string);

  const handleCommentError = (message: string) => {
    alert(message); 
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={[styles.header, { borderBottomColor: colors.primaryDark }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Post Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <PostContent 
            post={post}
            creatorUsername={creatorUsername}
            creatorProfilePic={creatorProfilePic}
            isLiked={isLiked}
            commentsCount={comments.length}
            onLike={handleLike}
        />

        <CommentList comments={comments} />
      </ScrollView>

      <CommentInput onAddComment={addComment} onError={handleCommentError} />

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
});

export default PostDetails;
