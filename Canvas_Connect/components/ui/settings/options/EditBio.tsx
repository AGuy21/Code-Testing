import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import SettingsButton from "../SettingsButton";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useUserDataStore } from "@/components/hooks/store";
import Entypo from "@expo/vector-icons/Entypo";
import SaveUserData from "@/components/functions/SaveUserData";
import { useUser } from "@clerk/clerk-expo";
import { useThemeStore } from "@/components/hooks/useThemeStore";

const EditBio = () => {
  const { user } = useUser();
  const { colors } = useThemeStore(); // Use dynamic colors

  const userData = useUserDataStore((state) => state.data);
  const setUserData = useUserDataStore((state) => state.setData);

  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [newBio, setNewBio] = useState(userData.bio || "");

  async function SaveBio() {
    setUserData({ ...userData, bio: newBio });
    if (user) {
      SaveUserData({
        userEmail: userData.email,
        newData: newBio,
        variable: "bio",
      });
    }
    setIsPromptOpen(false);
  }

  function CancelBioChange() {
    setIsPromptOpen(false);
    setNewBio(userData.bio || "");
  }

  return (
    <>
      {isPromptOpen ? (
        <View style={[styles.promptContainer, { backgroundColor: colors.background, borderBottomColor: colors.text2 }]}>
          <TextInput
            style={[styles.editBox, { color: colors.text, borderBottomColor: colors.primaryDark }]}
            value={newBio}
            onChangeText={setNewBio}
            placeholder="Tell us about yourself..."
            placeholderTextColor={colors.text2}
            multiline
            maxLength={150}
          />
          <View style={styles.approvalBox}>
            <Pressable onPress={SaveBio}>
              <Entypo name="check" size={wp(6)} color={colors.secondary} />
            </Pressable>

            <Pressable onPress={CancelBioChange}>
              <Entypo name="cross" size={wp(7)} color={colors.error} />
            </Pressable>
          </View>
        </View>
      ) : (
        <SettingsButton
          onPress={() => setIsPromptOpen(true)}
          icon={"description"}
          text="Edit Bio"
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
    height: hp(15), // Increased height
    textAlignVertical: "top", // Start text at top
  },
});

export default EditBio;
