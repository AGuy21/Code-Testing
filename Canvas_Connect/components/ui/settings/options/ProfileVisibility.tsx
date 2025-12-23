import React from "react";
import { Alert } from "react-native";
import SettingsButton from "../SettingsButton";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import { useUserDataStore } from "@/components/hooks/store";
import SaveUserData from "@/components/functions/SaveUserData";
import { useUser } from "@clerk/clerk-expo";

const ProfileVisibility = () => {
  const { user } = useUser();
  const userData = useUserDataStore((state) => state.data);
  const setUserData = useUserDataStore((state) => state.setData);
  const { colors } = useThemeStore();

  const isPrivate = userData.isPrivate || false;

  const toggleVisibility = () => {
    const newValue = !isPrivate;
    setUserData({ ...userData, isPrivate: newValue });
    if (user) {
      SaveUserData({
        userEmail: userData.email,
        newData: newValue,
        variable: "isPrivate",
      });
    }
  };

  const handlePress = () => {
    Alert.alert(
      "Profile Visibility",
      `Switch to ${isPrivate ? "Public" : "Private"} Account?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: isPrivate ? "Make Public" : "Make Private", 
          onPress: toggleVisibility 
        },
      ]
    );
  };

  return (
    <SettingsButton
      icon={isPrivate ? "lock" : "public"}
      text={`Account Type: ${isPrivate ? "Private" : "Public"}`}
      color={colors.tertiary}
      onPress={handlePress}
    />
  );
};

export default ProfileVisibility;
