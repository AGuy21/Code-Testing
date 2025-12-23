import React from "react";
import { Alert } from "react-native";
import SettingsButton from "../SettingsButton";
import Colors from "@/constants/Colors";

const BlockedUsers = () => {
  const handlePress = () => {
    // Navigate to a blocked users list screen or show modal
    Alert.alert("Blocked Users", "No users blocked.");
  };

  return (
    <SettingsButton
      icon="block"
      text="Blocked Users"
      color={Colors.error}
      onPress={handlePress}
    />
  );
};

export default BlockedUsers;
