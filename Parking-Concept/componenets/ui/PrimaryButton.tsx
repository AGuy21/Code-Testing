import {
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { theme } from "../../constants/theme";

export type ButtonVariant = "primary" | "outline" | "ghost";

export interface PrimaryButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CONTAINER_VARIANTS: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: theme.colors.accent },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
  },
  ghost: { backgroundColor: theme.colors.accentSoft },
};

const LABEL_VARIANTS: Record<ButtonVariant, TextStyle> = {
  primary: { color: theme.colors.white },
  outline: { color: theme.colors.textPrimary },
  ghost: { color: theme.colors.accent },
};

export function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        CONTAINER_VARIANTS[variant],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[styles.label, LABEL_VARIANTS[variant], disabled && styles.labelDisabled]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: theme.radii.pill,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 16,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    ...theme.typography.subtitle,
  },
  labelDisabled: {
    color: theme.colors.textMuted,
  },
});