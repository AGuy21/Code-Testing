import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { useThemePalette } from "../../hooks/useColorTheme";

export type CardVariant = "default" | "accent";

export interface CardProps extends ViewProps {
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
}

export function Card({ variant = "default", style, ...rest }: CardProps) {
  const palette = useThemePalette();

  const variantStyle: ViewStyle =
    variant === "accent"
      ? { backgroundColor: palette.accentSoft, borderColor: palette.borderStrong }
      : { backgroundColor: palette.surface, borderColor: palette.border };

  return <View style={[styles.card, variantStyle, style]} {...rest} />;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
  },
});