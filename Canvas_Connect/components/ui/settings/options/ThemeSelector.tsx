import React, { useState } from "react";
import SettingsButton from "../SettingsButton";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import { ThemeKeys } from "@/constants/Themes";
import { useUserDataStore } from "@/components/hooks/store";
import SelectionModal from "@/components/ui/SelectionModal";

const ThemeSelector = () => {
  const { themeName, setTheme, colors } = useThemeStore();
  const userData = useUserDataStore((state) => state.data);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const changeTheme = (newTheme: ThemeKeys) => {
    setTheme(newTheme, userData.email);
  };

  return (
    <>
      <SettingsButton
        icon="color-lens"
        text={`App Theme: ${themeName}`}
        color={colors.tertiary}
        onPress={handlePress}
      />
      <SelectionModal
        visible={modalVisible}
        title="Select Theme"
        message="Choose a color theme for the app"
        onClose={() => setModalVisible(false)}
        options={[
          { text: "Default", onPress: () => changeTheme("Default") },
          { text: "Light Mode", onPress: () => changeTheme("Light") },
          { text: "Midnight", onPress: () => changeTheme("Midnight") },
          { text: "Cancel", style: "cancel" },
        ]}
      />
    </>
  );
};

export default ThemeSelector;
