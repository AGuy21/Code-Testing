import { useThemeStore } from "@/components/hooks/useThemeStore";
import { StyleSheet, Text, View } from "react-native";

export default function Art() {
  const { colors } = useThemeStore();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>yo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
