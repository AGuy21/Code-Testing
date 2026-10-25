import Ionicons from "@react-native-vector-icons/ionicons";
import type { StyleProp, TextStyle } from "react-native";
import type { IconName } from "../../constants/Categories";
import { useThemePalette } from "../../hooks/useColorTheme";

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

/** Thin Ionicons wrapper that defaults to the theme's text colour. */
export function Icon({ name, size = 18, color, style }: IconProps) {
  const palette = useThemePalette();
  return <Ionicons name={name} size={size} color={color ?? palette.text} style={style} />;
}
