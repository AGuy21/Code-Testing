import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

type SettingsOptionProps = {
  text: string;
  onPress: () => void;
  setModalOpen: any;
};

const SettingsOption = ({
  text,
  onPress,
  setModalOpen,
}: SettingsOptionProps) => {
  function openSettingsOption() {
    setModalOpen(false);
    onPress();
  }
  return (
    <TouchableOpacity
      style={styles.settingContainer}
      onPress={() => openSettingsOption()}
    >
      <Text style={styles.settingText}>Advanced Account Options</Text>
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
