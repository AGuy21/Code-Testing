import {
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { Fonts } from "../../constants/Fonts";
import { useThemePalette } from "../../hooks/useColorTheme";
import type { ThemePalette } from "../../constants/types/ColorsTypes";

export type ButtonVariant = "primary" | "outline" | "ghost";

export interface PrimaryButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Dark text on the emerald primary, matching the brand's button style. */
const PRIMARY_LABEL_COLOR = "#0E1713";

function containerStyle(variant: ButtonVariant, palette: ThemePalette): ViewStyle {
  switch (variant) {
    case "primary":
      return { backgroundColor: palette.primary };
    case "outline":
      return {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: palette.borderStrong,
      };
    case "ghost":
      return { backgroundColor: palette.accentSoft };
  }
}

function labelStyle(variant: ButtonVariant, palette: ThemePalette): TextStyle {
  switch (variant) {
    case "primary":
      return { color: PRIMARY_LABEL_COLOR };
    case "outline":
      return { color: palette.text };
    case "ghost":
      return { color: palette.primary };
  }
}

export function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}: PrimaryButtonProps) {
  const palette = useThemePalette();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        containerStyle(variant, palette),
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[styles.label, labelStyle(variant, palette)]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontFamily: Fonts.Bold,
    fontSize: 15,
  },
});