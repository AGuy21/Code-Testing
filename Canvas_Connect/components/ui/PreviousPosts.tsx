import { FlatList, StyleSheet } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useUserDataStore } from "../hooks/store";
import GetUsersPosts from "../functions/GetUsersPosts";
import { useFocusEffect } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/Configs/FirebaseConfig";
import PostCard from "./PostCard";
import { SafeAreaView } from "react-native-safe-area-context";

const PreviousPosts = () => {
  const userData = useUserDataStore((state) => state.data);
  const setUserData = useUserDataStore((state) => state.setData);

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
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PostCard post={item} />}
    />
  );
};

export default PreviousPosts;

const styles = StyleSheet.create({
  previousPostsLists: {
    height: hp(23),
    width: wp(100),
    paddingLeft: wp(4),
    paddingTop: hp(2),
  },
});
