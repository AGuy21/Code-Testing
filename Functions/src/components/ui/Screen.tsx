import { StatusBar, type StatusBarStyle } from "expo-status-bar";
import type { ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemePalette } from "../../hooks/useColorTheme";

export interface ScreenProps {
  children: ReactNode;
  /** Wrap content in a ScrollView. */
  scroll?: boolean;
  /** Apply the default page padding. */
  padded?: boolean;
  /** Defaults to dark icons on light scheme, light icons on dark scheme. */
  statusBarStyle?: StatusBarStyle;
  style?: StyleProp<ViewStyle>;
}

export function Screen({
  children,
  scroll = false,
  padded = true,
  statusBarStyle,
  style,
}: ScreenProps) {
  const palette = useThemePalette();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  // Scale gutters with the screen and cap line length on tablets/landscape.
  const gutter = width < 360 ? 18 : width < 600 ? 24 : 40;
  const column = { maxWidth: 720, width: "100%" as const, alignSelf: "center" as const };
  const scheme = useColorScheme();
  const resolvedStatusBarStyle: StatusBarStyle =
    statusBarStyle ?? (scheme === "light" ? "dark" : "light");

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: palette.background,
          paddingTop: insets.top + (padded ? 16 : 0),
          paddingLeft: Math.max(insets.left, 0),
          paddingRight: Math.max(insets.right, 0),
        },
      ]}
    >
      <StatusBar style={resolvedStatusBarStyle} />
      <View
        style={[
          styles.root,
          column,
          padded && { paddingHorizontal: gutter },
          style,
        ]}
      >
      {scroll ? (
        <ScrollView
          style={styles.scroll}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 48, gap: 6 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {},
});