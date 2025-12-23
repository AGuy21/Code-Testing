import React from "react";
import { Alert } from "react-native";
import SettingsButton from "../SettingsButton";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import { ThemeKeys } from "@/constants/Themes";
import { useUserDataStore } from "@/components/hooks/store";

const ThemeSelector = () => {
  const { themeName, setTheme, colors } = useThemeStore();
  const userData = useUserDataStore((state) => state.data);

  const handlePress = () => {
    Alert.alert(
      "Select Theme",
      "Choose a color theme for the app",
      [
        { text: "Default", onPress: () => changeTheme("Default") },
        { text: "Light Mode", onPress: () => changeTheme("Light") },
        { text: "Midnight", onPress: () => changeTheme("Midnight") },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const changeTheme = (newTheme: ThemeKeys) => {
    setTheme(newTheme, userData.email);
  };

  return (
    <SettingsButton
      icon="color-lens"
      text={`App Theme: ${themeName}`}
      color={colors.tertiary}
      onPress={handlePress}
    />
  );
};

export default ThemeSelector;
