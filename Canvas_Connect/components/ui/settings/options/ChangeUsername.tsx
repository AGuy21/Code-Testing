import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import SettingsButton from "../SettingsButton";
import Colors from "@/constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useUserDataStore } from "@/components/hooks/store";
import Entypo from "@expo/vector-icons/Entypo";

import SaveUserData from "@/components/functions/SaveUserData";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";

const ChangeUsername = () => {
  const { user } = useUser();

  const userData = useUserDataStore((state) => state.data);
  const setUserData = useUserDataStore((state) => state.setData);

  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [newUsername, setNewUsername] = useState(userData.username);

  async function SaveUsername() {
    setUserData({ ...userData, username: newUsername });
    if (user) {
      SaveUserData({
        userEmail: userData.email,
        newData: newUsername,
        variable: "username",
      });
    } else {
      alert(
        "cant save data due to issue with your email, please sign back in or restart!"
      );
      router.replace("/(auth)/sign-in");
    }

    setIsPromptOpen(false);
  }

  function CancelUsernameChange() {
    setIsPromptOpen(false);
    setNewUsername(userData.username);
  }

  return (
    <>
      {isPromptOpen ? (
        <View style={styles.promptContainer}>
          <TextInput
            style={styles.editBox}
            value={newUsername}
            onChangeText={(newUsername) => setNewUsername(newUsername)}
          />
          <View style={styles.approvalBox}>
            <Pressable onPress={SaveUsername}>
              <Entypo name="check" size={wp(6)} color={Colors.secondary} />
            </Pressable>

            <Pressable onPress={CancelUsernameChange}>
              <Entypo name="cross" size={wp(7)} color={Colors.error} />
            </Pressable>
          </View>
        </View>
      ) : (
        <SettingsButton
          onPress={() => setIsPromptOpen(true)}
          icon={"drive-file-rename-outline"}
          text="Change Username"
          color={Colors.primaryLight}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  promptContainer: {
    flexDirection: "row",
    flex: 0.075,
    gap: wp(2.5),
    paddingHorizontal: wp(5),
    width: wp(100),
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: Colors.text2,
    borderBottomWidth: hp(0.2),
    borderTopColor: Colors.text2,
    borderTopWidth: hp(0.2),
  },
  approvalBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 20,
  },
  editBox: {
    color: Colors.text,
    flex: 80,
    borderBottomColor: Colors.primaryDark,
    borderBottomWidth: wp(0.2),
    paddingLeft: wp(3),
    fontFamily: "Nunito-Bold",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    fontFamily: "Nunito-Bold",
    color: Colors.text,
    fontSize: hp(1.75),
    marginRight: wp(30),
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2.5),
  },
});
export default ChangeUsername;
