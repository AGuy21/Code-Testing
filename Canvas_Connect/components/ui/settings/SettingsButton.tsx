import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Colors from "@/constants/Colors";

type SettingsButtonProps = {
  icon: any;
  text: string;
  color: string;
  onPress: () => void;
};

const SettingsButton = ({ icon, text, color, onPress }: SettingsButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftSide}>
        <MaterialIcons name={icon} size={wp(7.5)} color={color} />
        <Text style={styles.text}>{text}</Text>
      </View>
      <AntDesign name="right" size={wp(7.5)} color={Colors.text} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 0.1,
    gap: wp(2.5),
    paddingHorizontal: wp(5),
    width: wp(100),
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: Colors.text2,
    borderBottomWidth: hp(0.2),
    borderTopColor: Colors.text2,
    borderTopWidth: hp(0.2),
  },
  text: {
    fontFamily: "Nunito-Bold",
    color: Colors.text,
    fontSize: hp(1.75),
    marginRight: wp(30),
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.5),
  }
});

export default SettingsButton;
