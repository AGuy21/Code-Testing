import { FlatList, StyleSheet, View, Text, TouchableOpacity } from "react-native";
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
import { useThemeStore } from "@/components/hooks/useThemeStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const PreviousPosts = () => {
  const userData = useUserDataStore((state) => state.data);
  const setUserData = useUserDataStore((state) => state.setData);
  const { colors } = useThemeStore();
  const { posts, refresh } = GetUsersPosts();

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

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={[styles.titleText, { color: colors.text }]}>
          Previous Posts
        </Text>
        <TouchableOpacity onPress={refresh} style={styles.refreshButton}>
          <MaterialIcons name="refresh" size={wp(6)} color={colors.text} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: hp(0.25),
          backgroundColor: colors.tertiary,
          width: "95%",
          marginBottom: hp(1),
        }}
      />
      <FlatList
        style={styles.previousPostsLists}
        horizontal={true}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
};

export default PreviousPosts;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
  },
  titleText: {
    fontFamily: "Nunito-BlackItalic",
    fontSize: hp(3),
    flex: 1,
  },
  refreshButton: {
    padding: wp(2),
  },
  previousPostsLists: {
    height: hp(23),
    width: wp(100),
    paddingLeft: wp(4),
    paddingTop: hp(2),
  },
});
