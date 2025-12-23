import React, { useState } from "react";
import SettingsButton from "../SettingsButton";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import SelectionModal from "@/components/ui/SelectionModal";

const BlockedUsers = () => {
  const { colors } = useThemeStore();
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  return (
    <>
      <SettingsButton
        icon="block"
        text="Blocked Users"
        color={colors.error}
        onPress={handlePress}
      />
      <SelectionModal
        visible={modalVisible}
        title="Blocked Users"
        message="No users blocked."
        onClose={() => setModalVisible(false)}
        options={[
          { text: "Ok", style: "cancel" },
        ]}
      />
    </>
  );
};

export default BlockedUsers;
