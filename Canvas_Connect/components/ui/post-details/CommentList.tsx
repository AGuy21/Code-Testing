import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import { Comment } from "@/components/hooks/usePostDetails";

type CommentListProps = {
  comments: Comment[];
};

const CommentList = React.memo(({ comments }: CommentListProps) => {
  const { colors } = useThemeStore();

  return (
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
  );
});

export default CommentList;

const styles = StyleSheet.create({
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
});
