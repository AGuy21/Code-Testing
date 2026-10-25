import { StyleSheet, Text, type TextProps, type TextStyle } from "react-native";
import { theme } from "../../constants/theme";

export type AppTextVariant =
  | "hero"
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "muted"
  | "label"
  | "error";

export interface AppTextProps extends TextProps {
  variant?: AppTextVariant;
}

const VARIANT_STYLES: Record<AppTextVariant, TextStyle> = {
  hero: { ...theme.typography.hero, color: theme.colors.textPrimary },
  title: { ...theme.typography.title, color: theme.colors.textPrimary },
  subtitle: { ...theme.typography.subtitle, color: theme.colors.textSecondary },
  body: { ...theme.typography.body, color: theme.colors.textPrimary },
  caption: { ...theme.typography.caption, color: theme.colors.textSecondary },
  muted: { ...theme.typography.caption, color: theme.colors.textMuted },
  label: { ...theme.typography.label, color: theme.colors.accent },
  error: { ...theme.typography.caption, color: theme.colors.error },
};

export function AppText({ variant = "body", style, ...rest }: AppTextProps) {
  return <Text style={[VARIANT_STYLES[variant], style]} {...rest} />;
}