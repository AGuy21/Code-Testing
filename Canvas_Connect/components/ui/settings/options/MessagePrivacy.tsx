import React from "react";
import { Alert } from "react-native";
import SettingsButton from "../SettingsButton";
import Colors from "@/constants/Colors";
import { useUserDataStore } from "@/components/hooks/store";
import SaveUserData from "@/components/functions/SaveUserData";
import { useUser } from "@clerk/clerk-expo";

const MessagePrivacy = () => {
  const { user } = useUser();
  const userData = useUserDataStore((state) => state.data);
  const setUserData = useUserDataStore((state) => state.setData);

  const currentPrivacy = userData.messagePrivacy || "Everyone";

  const updatePrivacy = (newValue: string) => {
    setUserData({ ...userData, messagePrivacy: newValue });
    if (user) {
      SaveUserData({
        userEmail: userData.email,
        newData: newValue,
        variable: "messagePrivacy",
      });
    }
  };

  const handlePress = () => {
    Alert.alert(
      "Message Privacy",
      "Who can send you messages?",
      [
        { text: "Everyone", onPress: () => updatePrivacy("Everyone") },
        { text: "Followers Only", onPress: () => updatePrivacy("Followers Only") },
        { text: "No One", onPress: () => updatePrivacy("No One") },
      ],
      { cancelable: true }
    );
  };

  return (
    <SettingsButton
      icon="security"
      text={`Message Privacy: ${currentPrivacy}`}
      color={Colors.tertiary}
      onPress={handlePress}
    />
  );
};

export default MessagePrivacy;
