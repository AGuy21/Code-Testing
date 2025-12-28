import React, { useEffect, useState, useMemo } from "react";
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
  variant?: "default" | "large";
};

const PostCard = ({ post, variant = "default" }: PostCardProps) => {
  const { colors } = useThemeStore();
  const router = useRouter();
  const userData = useUserDataStore((state) => state.data);
  const [commentCount, setCommentCount] = useState(post.commentsCount || 0);

  const isLiked = useMemo(() => post.likedBy?.includes(userData.email) || false, [post.likedBy, userData.email]);

  const { cardWidth, cardHeight, contentWidth, titleSize, cardMarginRight } = useMemo(() => ({
    cardWidth: variant === "large" ? wp(90) : wp(60),
    cardHeight: variant === "large" ? hp(40) : hp(20),
    contentWidth: variant === "large" ? wp(88) : wp(58),
    titleSize: variant === "large" ? hp(3.5) : wp(5),
    cardMarginRight: variant === "large" ? 0 : hp(2),
  }), [variant]);

  useEffect(() => {
    // If commentsCount is provided in the post object (new posts), use it
    if (post.commentsCount !== undefined) {
      setCommentCount(post.commentsCount);
    } else {
      // Otherwise fetch it (legacy posts)
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
      activeOpacity={0.8}
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
            borderColor: colors.primary,
            backgroundColor: colors.primaryDark,
            width: cardWidth,
            height: cardHeight,
            marginRight: cardMarginRight,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
          },
        ]}
      >
        <Text
          style={[
            styles.postTitle,
            { 
              color:colors.background, 
              backgroundColor: colors.primary,
              fontSize: titleSize,
            },
          ]}
        >
          {post.title}
        </Text>
        <LinearGradient
          colors={["transparent", "transparent", colors.primary]}
          style={[styles.imageGradient, { width: contentWidth }]}
        />

        <Image
          source={{ uri: post.image }}
          style={styles.postPicture}
          resizeMode="cover"
        />

        <View style={[styles.postStats, { width: contentWidth }]}>
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
    borderWidth: wp(1),
    borderRadius: wp(3.5),
  },
  postTitle: {
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
    height: "85%",
    zIndex: 10,
    borderBottomLeftRadius: wp(3.5),
    borderBottomRightRadius: wp(3.5),
  },
  postStats: {
    position: "absolute",
    zIndex: 15,
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
