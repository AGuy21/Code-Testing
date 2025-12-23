import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useUserDataStore } from "../hooks/store";
import GetUsersPosts from "../functions/GetUsersPosts";
import { postType } from "@/constants/types/postType";
import { useFocusEffect } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/Configs/FirebaseConfig";

const PreviousPosts = () => {
  const userData = useUserDataStore((state) => state.data);
  const setUserData = useUserDataStore((state) => state.setData);
  const { colors } = useThemeStore();

  // Refresh user data when the user comes back to screen, this is so that the posts list updates after creating a new post
  useFocusEffect(
    React.useCallback(() => {
      const refreshUserData = async () => {
        if (userData?.email) {
          const userDoc = await getDoc(doc(db, "users", userData.email));
          if (userDoc.exists()) {
            setUserData(userDoc.data() as any);
          }
        }
      };
      refreshUserData();
    }, [userData?.email])
  );

  const userPosts = GetUsersPosts();

  return (
    <FlatList
      style={styles.previousPostsLists}
      horizontal={true}
      data={userPosts}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
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
            {item.title}
          </Text>
          <LinearGradient
            colors={["transparent", "transparent", colors.primaryLight]}
            style={styles.imageGradient}
          />

          <Image source={{ uri: item.image }} style={styles.postPicture} />

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
              <Text
                style={[styles.postStatText, { color: colors.background }]}
              >
                {24}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: wp(1),
              }}
            >
              <AntDesign name="heart" size={wp(6)} color={colors.background} />
              <Text
                style={[styles.postStatText, { color: colors.background }]}
              >
                {item.likes}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default PreviousPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp(2.5),
  },
  text: {
    fontFamily: "Nunito-Medium",
  },
  titleText: {
    fontFamily: "Nunito-BlackItalic",
    fontSize: hp(3),
    width: "90%",
    borderBottomWidth: hp(0.25),
  },
  previousPostsContainer: {
    paddingLeft: wp(2.5),
  },
  previousPostsLists: {
    marginTop: hp(1),
  },
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
    objectFit: "fill",
    flex: 0.85,
    borderBottomLeftRadius: wp(3.5),
    borderBottomRightRadius: wp(3.5),
  },
  imageGradient: {
    position: "absolute",
    marginTop: wp(7.5),
    width: wp(58),
    height: hp(16),
    zIndex: 10,
    borderBottomLeftRadius: wp(3.5),
    borderBottomRightRadius: wp(3.5),
  },
  postStats: {
    position: "absolute",
    zIndex: 15,
    width: wp(58),
    height: hp(5),
    marginTop: hp(14),
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
