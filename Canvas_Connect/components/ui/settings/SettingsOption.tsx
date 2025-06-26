import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { router } from "expo-router";

type SettingsOptionProps = {
  text: string;
  setModalOpen: any;
};

const SettingsOption = ({ text, setModalOpen }: SettingsOptionProps) => {
  function openSettingsOption() {
    setModalOpen(false);
    router.push({ pathname: "/(screens)/settings", params: { setting: text } });
  }

  return (
    <TouchableOpacity
      style={styles.settingContainer}
      onPress={() => openSettingsOption()}
    >
      <Text style={styles.settingText}> {text} </Text>
    </TouchableOpacity>
  );
};

export default SettingsOption;

const styles = StyleSheet.create({
  settingContainer: {
    width: wp(100),
    flex: 0.075,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: wp(5),
    borderBottomWidth: wp(0.5),
    borderColor: Colors.text2,
  },
  settingText: {
    color: Colors.text,
    fontFamily: "Nunito-Medium",
    fontSize: hp(1.75),
  },
});
