import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import { postType } from "@/constants/types/postType";

type PostContentProps = {
  post: postType;
  creatorUsername: string;
  creatorProfilePic: string;
  isLiked: boolean;
  commentsCount: number;
  onLike: () => void;
};

const PostContent = React.memo(({ 
  post, 
  creatorUsername, 
  creatorProfilePic, 
  isLiked, 
  commentsCount, 
  onLike 
}: PostContentProps) => {
  const { colors } = useThemeStore();

  return (
    <View style={styles.postContainer}>
      <View style={styles.userInfo}>
         <Image source={{ uri: creatorProfilePic }} style={[styles.profilePic, { borderColor: colors.secondary }]} />
         <Text style={[styles.username, { color: colors.text }]}>{creatorUsername}</Text>
      </View>
      
      <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="contain" />
      
      <View style={styles.actions}>
        <TouchableOpacity onPress={onLike} style={styles.actionButton}>
          <FontAwesome name={isLiked ? "heart" : "heart-o"} size={24} color={isLiked ? colors.error : colors.text} />
          <Text style={[styles.actionText, { color: colors.text }]}>{post.likes}</Text>
        </TouchableOpacity>
        <View style={styles.actionButton}>
          <FontAwesome name="comments-o" size={24} color={colors.text} />
          <Text style={[styles.actionText, { color: colors.text }]}>{commentsCount}</Text>
        </View>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{post.title}</Text>
      <Text style={[styles.description, { color: colors.text2 }]}>{post.description}</Text>
    </View>
  );
});

export default PostContent;

const styles = StyleSheet.create({
  postContainer: {
    paddingBottom: hp(2),
  },
  userInfo: {
    padding: wp(4),
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    marginRight: wp(3),
    borderWidth: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: hp(2),
  },
  postImage: {
    width: wp(100),
    height: hp(50),
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
});
