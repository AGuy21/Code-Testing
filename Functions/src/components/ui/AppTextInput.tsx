import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";
import { Fonts } from "../../constants/Fonts";
import { useThemePalette } from "../../hooks/useColorTheme";

export interface AppTextInputProps extends TextInputProps {
  label?: string;
}

export function AppTextInput({
  label,
  style,
  onFocus,
  onBlur,
  ...rest
}: AppTextInputProps) {
  const palette = useThemePalette();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={[styles.label, { color: palette.textMuted }]}>{label}</Text>
      ) : null}
      <TextInput
        {...rest}
        style={[
          styles.input,
          {
            backgroundColor: palette.surfaceElevated,
            borderColor: isFocused ? palette.borderStrong : palette.border,
            color: palette.text,
          },
          style,
        ]}
        placeholderTextColor={palette.textMuted}
        selectionColor={palette.primary}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontFamily: Fonts.SemiBold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: Fonts.Medium,
  },
});