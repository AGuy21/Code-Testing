import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SettingsButton from "../SettingsButton";
import Colors from "@/constants/Colors";
import useChangeProfilePicture from "@/components/hooks/useChangeProfilePicture";

const ChangeProfilePicture = () => {
  const { image, addImage } = useChangeProfilePicture();
  return (
    <>
      <SettingsButton
        icon={"edit-document"}
        text="Change Profile Picture"
        color={Colors.primaryLight}
        onPress={addImage}
      />
    </>
  );
};

export default ChangeProfilePicture;

const styles = StyleSheet.create({});
