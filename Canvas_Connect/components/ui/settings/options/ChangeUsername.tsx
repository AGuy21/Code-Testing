import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import SettingsButton from "../SettingsButton";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useUserDataStore } from "@/components/hooks/store";
import Entypo from "@expo/vector-icons/Entypo";

import SaveUserData from "@/components/functions/SaveUserData";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";

import SelectionModal from "@/components/ui/SelectionModal";

const ChangeUsername = () => {
  const { user } = useUser();
  const { colors } = useThemeStore();

  const userData = useUserDataStore((state) => state.data);
  const setUserData = useUserDataStore((state) => state.setData);

  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [newUsername, setNewUsername] = useState(userData.username);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function SaveUsername() {
    if (newUsername.length < 3 || newUsername.length > 15) {
      setErrorMessage("Username must be between 3 and 15 characters.");
      setErrorVisible(true);
      return;
    }

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
      <SelectionModal
        visible={errorVisible}
        title="Invalid Username"
        message={errorMessage}
        onClose={() => setErrorVisible(false)}
        options={[{ text: "OK", style: "cancel" }]}
      />
      {isPromptOpen ? (
        <View
          style={[
            styles.promptContainer,
            {
              backgroundColor: colors.background,
              borderBottomColor: colors.text2,
            },
          ]}
        >
          <TextInput
            style={[
              styles.editBox,
              { color: colors.text, borderBottomColor: colors.primaryDark },
            ]}
            value={newUsername}
            onChangeText={(newUsername) => setNewUsername(newUsername)}
          />
          <View style={styles.approvalBox}>
            <Pressable onPress={SaveUsername}>
              <Entypo name="check" size={wp(6)} color={colors.secondary} />
            </Pressable>

            <Pressable onPress={CancelUsernameChange}>
              <Entypo name="cross" size={wp(7)} color={colors.error} />
            </Pressable>
          </View>
        </View>
      ) : (
        <SettingsButton
          onPress={() => setIsPromptOpen(true)}
          icon={"drive-file-rename-outline"}
          text="Change Username"
          color={colors.primaryLight}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  promptContainer: {
    flexDirection: "row",
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    width: wp(100),
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: hp(0.1),
  },
  approvalBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 0.3,
  },
  editBox: {
    flex: 0.6,
    borderBottomWidth: wp(0.2),
    paddingLeft: wp(3),
    fontFamily: "Nunito-Bold",
    fontSize: hp(1.75),
  },
  text: {
    fontFamily: "Nunito-Bold",
    fontSize: hp(1.75),
  },
});
export default ChangeUsername;
