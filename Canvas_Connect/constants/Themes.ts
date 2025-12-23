export const Themes = {
  Default: {
    primary: "#BCC2D8",
    primaryLight: "#D4D9E4",
    primaryDark: "#9FA8C0",
    secondary: "#98FB98",
    tertiary: "#f1b04c",
    background: "#162330",
    text: "#fcfeff",
    text2: "#808080",
    error: "#FF6347",
  },
  Light: {
    primary: "#4A90E2",
    primaryLight: "#AED6F1",
    primaryDark: "#2E86C1",
    secondary: "#2ECC71",
    tertiary: "#F39C12",
    background: "#FDFEFE",
    text: "#17202A",
    text2: "#566573",
    error: "#E74C3C",
  },
  Midnight: {
    primary: "#5D6D7E",
    primaryLight: "#85929E",
    primaryDark: "#34495E",
    secondary: "#AF7AC5",
    tertiary: "#58D68D",
    background: "#000000",
    text: "#ECF0F1",
    text2: "#BDC3C7",
    error: "#C0392B",
  },
};

export type ThemeKeys = keyof typeof Themes;
