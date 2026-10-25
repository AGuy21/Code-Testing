import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { theme } from "../../constants/theme";

export type CardVariant = "default" | "accent" | "outline";

export interface CardProps extends ViewProps {
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
}

const VARIANT_STYLES: Record<CardVariant, ViewStyle> = {
  default: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
  },
  accent: {
    backgroundColor: theme.colors.accentSoft,
    borderColor: theme.colors.borderStrong,
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: theme.colors.border,
  },
};

export function Card({ variant = "default", style, ...rest }: CardProps) {
  return (
    <View
      style={[styles.card, theme.shadows.card, VARIANT_STYLES[variant], style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    padding: theme.spacing.lg,
  },
});