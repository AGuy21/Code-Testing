import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useThemeStore } from "@/components/hooks/useThemeStore";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled: boolean;
  minWidth?: number;
  minHeight?: number;
  fontSize?: number;
  bgColor?: string;
  bgDisabledColor?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  disabled,
  minWidth,
  minHeight,
  fontSize,
  bgColor,
  bgDisabledColor,
  textColor,
}) => {
  const { colors } = useThemeStore();

  const effectiveBgColor = bgColor || colors.tertiary;
  const effectiveBgDisabledColor = bgDisabledColor || colors.primaryLight;
  const effectiveTextColor = textColor || colors.text;

  const styles = StyleSheet.create({
    button: {
      backgroundColor: effectiveBgColor,
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
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: effectiveTextColor,
      fontWeight: "bold",
      textAlign: "center",
      fontSize: fontSize,
      fontFamily: "Nunito-Bold",
    },
    disabled: {
      backgroundColor: effectiveBgDisabledColor,
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
      alignItems: "center",
      justifyContent: "center",
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
