import Ionicons from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Fonts } from "../../constants/Fonts";
import { useThemePalette } from "../../hooks/useColorTheme";

type TabIcon = React.ComponentProps<typeof Ionicons>["name"];

function tabIcon(active: TabIcon, idle: TabIcon) {
  return ({ color, focused }: { color: import("react-native").ColorValue; focused: boolean }) => (
    <Ionicons size={24} name={focused ? active : idle} color={color} />
  );
}

export default function TabLayout() {
  const palette = useThemePalette();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: palette.background },
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.textMuted,
        tabBarStyle: {
          backgroundColor: palette.surface,
          borderTopWidth: 0,
          elevation: 8,
          height: 60 + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontFamily: Fonts.Bold, fontSize: 11 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Events", tabBarIcon: tabIcon("flame", "flame-outline") }} />
      <Tabs.Screen name="map" options={{ title: "Map", tabBarIcon: tabIcon("map", "map-outline") }} />
      <Tabs.Screen
        name="add"
        options={{
          title: "Host",
          tabBarLabel: () => null,
          tabBarIcon: () => null,
          tabBarButton: ({ onPress, accessibilityState }) => (
            <View style={styles.plusSlot}>
              <Pressable
                onPress={onPress}
                accessibilityRole="button"
                accessibilityLabel="Host a hangout"
                style={({ pressed }) => [
                  styles.plus,
                  {
                    backgroundColor: palette.primary,
                    borderColor: palette.surface,
                    opacity: accessibilityState?.selected ? 1 : 0.95,
                  },
                  pressed && { transform: [{ scale: 0.92 }] },
                ]}
              >
                <Ionicons name="add" size={34} color="#0E1713" />
              </Pressable>
            </View>
          ),
        }}
      />
      <Tabs.Screen name="chat" options={{ title: "Chat", tabBarIcon: tabIcon("chatbubbles", "chatbubbles-outline") }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: tabIcon("person", "person-outline") }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  plusSlot: { alignItems: "center", flex: 1, justifyContent: "flex-start" },
  plus: {
    alignItems: "center",
    borderRadius: 32,
    borderWidth: 4,
    elevation: 10,
    height: 64,
    justifyContent: "center",
    marginTop: -22,
    shadowColor: "#50c878",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    width: 64,
  },
});
