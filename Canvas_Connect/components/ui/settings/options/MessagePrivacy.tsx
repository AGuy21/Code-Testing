import React, { useState } from "react";
import SettingsButton from "../SettingsButton";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import { useUserDataStore } from "@/components/hooks/store";
import SaveUserData from "@/components/functions/SaveUserData";
import { useUser } from "@clerk/clerk-expo";
import SelectionModal from "@/components/ui/SelectionModal";

const MessagePrivacy = () => {
  const { user } = useUser();
  const userData = useUserDataStore((state) => state.data);
  const setUserData = useUserDataStore((state) => state.setData);
  const { colors } = useThemeStore();
  const [modalVisible, setModalVisible] = useState(false);

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
    setModalVisible(true);
  };

  return (
    <>
      <SettingsButton
        icon="security"
        text={`Message Privacy: ${currentPrivacy}`}
        color={colors.tertiary}
        onPress={handlePress}
      />
      <SelectionModal
        visible={modalVisible}
        title="Message Privacy"
        message="Who can send you messages?"
        onClose={() => setModalVisible(false)}
        options={[
          { text: "Everyone", onPress: () => updatePrivacy("Everyone") },
          { text: "Followers Only", onPress: () => updatePrivacy("Followers Only") },
          { text: "No One", onPress: () => updatePrivacy("No One") },
          { text: "Cancel", style: "cancel" },
        ]}
      />
    </>
  );
};

export default MessagePrivacy;
