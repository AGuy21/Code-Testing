import { Text, type TextProps, type TextStyle } from "react-native";
import { Fonts } from "../../constants/Fonts";
import { useThemePalette } from "../../hooks/useColorTheme";
import type { ThemePalette } from "../../constants/types/ColorsTypes";

export type AppTextVariant =
  | "hero"
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "label";

interface VariantConfig {
  fontFamily: string;
  fontSize: number;
  lineHeight?: number;
  letterSpacing?: number;
  textTransform?: "uppercase";
  colorKey: keyof ThemePalette;
}

const VARIANT_CONFIG: Record<AppTextVariant, VariantConfig> = {
  hero: { fontFamily: Fonts.ExtraBold, fontSize: 34, colorKey: "text" },
  title: { fontFamily: Fonts.Bold, fontSize: 26, colorKey: "text" },
  subtitle: { fontFamily: Fonts.SemiBold, fontSize: 16, colorKey: "text" },
  body: { fontFamily: Fonts.Medium, fontSize: 15, lineHeight: 22, colorKey: "text" },
  caption: { fontFamily: Fonts.Medium, fontSize: 13, lineHeight: 18, colorKey: "textMuted" },
  label: {
    fontFamily: Fonts.SemiBold,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    colorKey: "primary",
  },
};

export interface AppTextProps extends TextProps {
  variant?: AppTextVariant;
}

export function AppText({ variant = "body", style, ...rest }: AppTextProps) {
  const palette = useThemePalette();
  const config = VARIANT_CONFIG[variant];

  const variantStyle: TextStyle = {
    fontFamily: config.fontFamily,
    fontSize: config.fontSize,
    color: palette[config.colorKey],
  };
  if (config.lineHeight !== undefined) variantStyle.lineHeight = config.lineHeight;
  if (config.letterSpacing !== undefined) variantStyle.letterSpacing = config.letterSpacing;
  if (config.textTransform) variantStyle.textTransform = config.textTransform;

  return <Text style={[variantStyle, style]} {...rest} />;
}