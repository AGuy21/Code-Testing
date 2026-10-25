import { Pressable, StyleSheet, View } from "react-native";
import { useThemePalette } from "../../hooks/useColorTheme";
import { AppText } from "./AppText";
import { Icon } from "./Icon";

export interface StepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}

/** Compact − / + counter. */
export function Stepper({ value, onChange, min = 0, max = 999 }: StepperProps) {
  const palette = useThemePalette();
  const step = (delta: number) => onChange(Math.min(max, Math.max(min, value + delta)));
  const button = (icon: "remove" | "add", delta: number, disabled: boolean) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={delta > 0 ? "Add one" : "Remove one"}
      disabled={disabled}
      onPress={() => step(delta)}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: palette.accentSoft, borderColor: palette.border, opacity: disabled ? 0.4 : pressed ? 0.7 : 1 },
      ]}
    >
      <Icon name={icon} size={20} color={palette.primary} />
    </Pressable>
  );
  return (
    <View style={styles.row}>
      {button("remove", -1, value <= min)}
      <AppText variant="subtitle" style={styles.value}>{value}</AppText>
      {button("add", 1, value >= max)}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: "center", flexDirection: "row", gap: 14 },
  btn: { alignItems: "center", borderRadius: 22, borderWidth: 1.5, height: 44, justifyContent: "center", width: 44 },
  value: { minWidth: 40, textAlign: "center" },
});
