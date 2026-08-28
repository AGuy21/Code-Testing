import { StyleSheet, Text, View, type ViewStyle } from "react-native";
import { Fonts } from "../../constants/Fonts";
import { useThemePalette } from "../../hooks/useColorTheme";
import type { ThemePalette } from "../../constants/types/ColorsTypes";

export type BadgeVariant = "accent" | "muted";

export interface BadgeProps {
  label: string;
  emoji?: string;
  variant?: BadgeVariant;
}

function badgeStyle(
  variant: BadgeVariant,
  palette: ThemePalette,
): { container: ViewStyle; textColor: string } {
  if (variant === "accent") {
    return {
      container: {
        backgroundColor: palette.accentSoft,
        borderColor: palette.borderStrong,
      },
      textColor: palette.primary,
    };
  }
  return {
    container: {
      backgroundColor: palette.surfaceElevated,
      borderColor: palette.border,
    },
    textColor: palette.textMuted,
  };
}

export function Badge({ label, emoji, variant = "muted" }: BadgeProps) {
  const palette = useThemePalette();
  const stylesFor = badgeStyle(variant, palette);

  return (
    <View style={[styles.badge, stylesFor.container]}>
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      <Text style={[styles.label, { color: stylesFor.textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  emoji: {
    fontSize: 12,
  },
  label: {
    fontFamily: Fonts.SemiBold,
    fontSize: 12,
    letterSpacing: 0.4,
  },
});