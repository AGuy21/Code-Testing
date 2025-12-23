import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useThemeStore } from "@/components/hooks/useThemeStore";

type SettingsButtonProps = {
  icon: any;
  text: string;
  color: string;
  onPress: () => void;
};

const SettingsButton = ({ icon, text, color, onPress }: SettingsButtonProps) => {
  const { colors } = useThemeStore();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.background, borderBottomColor: colors.text2 },
      ]}
      onPress={onPress}
    >
      <View style={styles.leftSide}>
        <MaterialIcons name={icon} size={wp(7.5)} color={color} />
        <Text style={[styles.text, { color: colors.text }]}>{text}</Text>
      </View>
      <AntDesign name="right" size={wp(7.5)} color={colors.text} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    width: wp(100),
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: hp(0.1),
  },
  text: {
    fontFamily: "Nunito-Bold",
    fontSize: hp(1.75),
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(4),
  },
});

export default SettingsButton;
