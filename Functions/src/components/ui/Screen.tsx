import { StatusBar, type StatusBarStyle } from "expo-status-bar";
import type { ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
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
  const scheme = useColorScheme();
  const resolvedStatusBarStyle: StatusBarStyle =
    statusBarStyle ?? (scheme === "light" ? "dark" : "light");

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: palette.background, paddingTop: insets.top },
        padded && styles.padded,
        style,
      ]}
    >
      <StatusBar style={resolvedStatusBarStyle} />
      {scroll ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 32 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {},
});