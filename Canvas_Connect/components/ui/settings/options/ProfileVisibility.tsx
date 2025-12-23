import React, { useState } from "react";
import SettingsButton from "../SettingsButton";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import { useUserDataStore } from "@/components/hooks/store";
import SaveUserData from "@/components/functions/SaveUserData";
import { useUser } from "@clerk/clerk-expo";
import SelectionModal from "@/components/ui/SelectionModal";

const ProfileVisibility = () => {
  const { user } = useUser();
  const userData = useUserDataStore((state) => state.data);
  const setUserData = useUserDataStore((state) => state.setData);
  const { colors } = useThemeStore();
  const [modalVisible, setModalVisible] = useState(false);

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
    setModalVisible(true);
  };

  return (
    <>
      <SettingsButton
        icon={isPrivate ? "lock" : "public"}
        text={`Account Type: ${isPrivate ? "Private" : "Public"}`}
        color={colors.tertiary}
        onPress={handlePress}
      />
      <SelectionModal
        visible={modalVisible}
        title="Profile Visibility"
        message={`Switch to ${isPrivate ? "Public" : "Private"} Account?`}
        onClose={() => setModalVisible(false)}
        options={[
          { 
            text: isPrivate ? "Make Public" : "Make Private", 
            onPress: toggleVisibility 
          },
          { text: "Cancel", style: "cancel" },
        ]}
      />
    </>
  );
};

export default ProfileVisibility;
