import { StatusBar, type StatusBarStyle } from "expo-status-bar";
import type { ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { theme } from "../../constants/theme";

export interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  statusBarStyle?: StatusBarStyle;
  style?: StyleProp<ViewStyle>;
}

export function Screen({
  children,
  scroll = false,
  padded = true,
  statusBarStyle = "light",
  style,
}: ScreenProps) {
  return (
    <View style={[styles.root, padded && styles.padded, style]}>
      <StatusBar style={statusBarStyle} />
      {scroll ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
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
    backgroundColor: theme.colors.background,
    paddingTop: "40%",
    flex: 1,
  },
  padded: {
    padding: theme.spacing.lg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
});