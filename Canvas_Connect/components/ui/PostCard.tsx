import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { postType } from "@/constants/types/postType";
import { useRouter } from "expo-router";
import { useUserDataStore } from "@/components/hooks/store";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/Configs/FirebaseConfig";

type PostCardProps = {
  post: postType;
};

const PostCard = ({ post }: PostCardProps) => {
  const { colors } = useThemeStore();
  const router = useRouter();
  const userData = useUserDataStore((state) => state.data);
  const [commentCount, setCommentCount] = useState(post.commentsCount || 0);

  const isLiked = post.likedBy?.includes(userData.email) || false;

  useEffect(() => {
    // Only fetch if commentsCount is undefined (legacy posts)
    if (post.commentsCount === undefined) {
      const fetchCount = async () => {
        try {
          const commentsRef = collection(db, "posts", post.id, "comments");
          const snapshot = await getCountFromServer(commentsRef);
          setCommentCount(snapshot.data().count);
        } catch (error) {
          console.log("Error fetching comment count:", error);
        }
      };
      fetchCount();
    }
  }, [post.id, post.commentsCount]);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(screens)/post-details",
          params: { postId: post.id },
        })
      }
    >
      <View
        style={[
          styles.previousPost,
          {
            borderColor: colors.primaryLight,
            backgroundColor: colors.primaryDark,
          },
        ]}
      >
        <Text
          style={[
            styles.postTitle,
            { color: colors.background, backgroundColor: colors.primaryLight },
          ]}
        >
          {post.title}
        </Text>
        <LinearGradient
          colors={["transparent", "transparent", colors.primaryLight]}
          style={styles.imageGradient}
        />

        <Image
          source={{ uri: post.image }}
          style={styles.postPicture}
          resizeMode="cover"
        />

        <View style={styles.postStats}>
          <View
            style={{
              flexDirection: "row",
              gap: wp(1),
            }}
          >
            <FontAwesome
              name="comments"
              size={wp(6)}
              color={colors.background}
            />
            <Text style={[styles.postStatText, { color: colors.background }]}>
              {commentCount}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: wp(1),
            }}
          >
            <FontAwesome
              name={isLiked ? "heart" : "heart-o"}
              size={wp(6)}
              color={isLiked ? colors.error : colors.background}
            />
            <Text style={[styles.postStatText, { color: colors.background }]}>
              {post.likes}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  previousPost: {
    flex: 1,
    width: wp(60),
    height: hp(20),
    borderWidth: wp(1),
    borderRadius: wp(3.5),
    marginRight: hp(2),
  },
  postTitle: {
    fontSize: wp(5),
    paddingLeft: wp(2),
    fontFamily: "Nunito-Bold",
    alignItems: "center",
    justifyContent: "center",
    flex: 0.15,
  },
  postPicture: {
    width: "100%",
    flex: 0.85,
    borderBottomLeftRadius: wp(3.5),
    borderBottomRightRadius: wp(3.5),
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    width: wp(58),
    height: "85%",
    zIndex: 10,
    borderBottomLeftRadius: wp(3.5),
    borderBottomRightRadius: wp(3.5),
  },
  postStats: {
    position: "absolute",
    zIndex: 15,
    width: wp(58),
    height: hp(5),
    bottom: 0,
    borderBottomLeftRadius: wp(3.5),
    borderBottomRightRadius: wp(3.5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(2),
  },
  postStatText: {
    fontSize: hp(2),
    fontFamily: "Nunito-Bold",
  },
});
