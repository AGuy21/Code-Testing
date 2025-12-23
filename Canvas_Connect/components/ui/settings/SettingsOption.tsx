import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

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
      <AntDesign name="right" size={wp(5)} color={Colors.text} />
    </TouchableOpacity>
  );
};

export default SettingsOption;

const styles = StyleSheet.create({
  settingContainer: {
    width: wp(100),
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: hp(0.1),
    borderColor: Colors.text2,
  },
  settingText: {
    color: Colors.text,
    fontFamily: "Nunito-Medium",
    fontSize: hp(1.75),
  },
});
