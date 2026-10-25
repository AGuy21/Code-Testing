import { Pressable, StyleSheet, Text } from "react-native";
import type { IconName } from "../../constants/Categories";
import { Fonts } from "../../constants/Fonts";
import { useThemePalette } from "../../hooks/useColorTheme";
import { Icon } from "./Icon";

export interface ChipProps {
  label: string;
  icon?: IconName;
  selected?: boolean;
  /** Accent for the selected state; defaults to the brand green. */
  color?: string;
  onPress?: () => void;
}

/** Pill toggle used for filters and option pickers. */
export function Chip({ label, icon, selected = false, color, onPress }: ChipProps) {
  const palette = useThemePalette();
  const accent = color ?? palette.primary;
  const fg = selected ? "#0E1713" : palette.text;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected
          ? { backgroundColor: accent, borderColor: accent }
          : { backgroundColor: palette.surface, borderColor: palette.border },
        pressed && styles.pressed,
      ]}
    >
      {icon ? <Icon name={icon} size={15} color={selected ? fg : accent} /> : null}
      <Text style={[styles.label, { color: fg }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1.5,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  pressed: { transform: [{ scale: 0.96 }] },
  label: { fontFamily: Fonts.Bold, fontSize: 13.5 },
});
