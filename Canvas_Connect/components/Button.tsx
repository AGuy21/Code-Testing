import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled: boolean;
  minWidth?: number;
  minHeight?: number;
  fontSize?: number;
  bgColor?: typeof Colors.primary;
  bgDisabledColor?: typeof Colors.primaryLight;
  textColor?: typeof Colors.text;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  disabled,
  minWidth,
  minHeight,
  fontSize,
  bgColor = Colors.primary,
  bgDisabledColor = Colors.primaryLight,
  textColor = Colors.text,
}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: bgColor,
      borderRadius: wp(6),
      paddingHorizontal: wp(5),
      paddingVertical: hp(1),
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      minWidth: minWidth,
      minHeight: minHeight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: textColor,
      fontWeight: "bold",
      textAlign: "center",
      fontSize: fontSize,
      fontFamily: "Nunito-Bold",
    },
    disabled: {
      backgroundColor: bgDisabledColor,
      opacity: 0.5,
      borderRadius: wp(2),
      paddingHorizontal: wp(5),
      paddingVertical: hp(1),
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      minWidth: minWidth,
      minHeight: minHeight,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return (
    <TouchableOpacity
      style={disabled ? styles.disabled : styles.button}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
