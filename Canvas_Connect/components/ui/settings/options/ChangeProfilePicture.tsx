import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SettingsButton from "../SettingsButton";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import useChangeProfilePicture from "@/components/hooks/useChangeProfilePicture";

const ChangeProfilePicture = () => {
  const { image, addImage } = useChangeProfilePicture();
  const { colors } = useThemeStore();
  return (
    <>
      <SettingsButton
        icon={"edit-document"}
        text="Change Profile Picture"
        color={colors.primaryLight}
        onPress={addImage}
      />
    </>
  );
};

export default ChangeProfilePicture;

const styles = StyleSheet.create({});
