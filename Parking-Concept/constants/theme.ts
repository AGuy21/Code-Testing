

export const colors = {
  background: "#0B0B10",
  surface: "#141019",
  surfaceElevated: "#1D1529",
  border: "rgba(167, 139, 250, 0.16)",
  borderStrong: "rgba(167, 139, 250, 0.38)",
  textPrimary: "#FFFFFF",
  textSecondary: "#B9AFCB",
  textMuted: "#8E83A3",
  accent: "#8B5CF6",
  accentStrong: "#7C3AED",
  accentSoft: "rgba(139, 92, 246, 0.16)",
  white: "#FFFFFF",
  black: "#050508",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 12,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const typography = {
  hero: { fontSize: 40, fontWeight: "800", letterSpacing: -1 },
  title: { fontSize: 26, fontWeight: "700" },
  subtitle: { fontSize: 16, fontWeight: "600" },
  body: { fontSize: 15, fontWeight: "400", lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: "400", lineHeight: 18 },
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
} as const;

export const shadows = {
  card: {
    shadowColor: colors.black,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  glow: {
    shadowColor: colors.accent,
    shadowOpacity: 0.5,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
} as const;

export const theme = {
  colors,
  spacing,
  radii,
  typography,
  shadows,
} as const;

export type Theme = typeof theme;

export const stackScreenOptions = {
  headerShown: false,
} as const;