import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, TouchableOpacity } from "react-native";
import { useColorTheme } from "../../hooks/useColorTheme";
import { View } from "react-native";

export default function TabLayout() {
  const primaryColor = useColorTheme("primary");
  const secondaryColor = useColorTheme("secondary");
  const backgroundColor = useColorTheme("background");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: secondaryColor,
        tabBarStyle: {
          backgroundColor: backgroundColor,
          borderTopWidth: 1,
          borderTopColor: secondaryColor,
          height: Platform.OS === "ios" ? 88 : 64,
          paddingBottom: Platform.OS === "ios" ? 28 : 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Events",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              name={focused ? "map" : "map-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarLabel: () => null,

          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={36}
              name="add"
              color={focused ? primaryColor : "gray"}
            />
          ),

          tabBarButton: ({ children, style, ...props }) => {
            const { delayLongPress, ...safeProps } = props as any;

            return (
              <TouchableOpacity
                {...safeProps}
                style={[
                  style,
                  {
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    marginBottom: 60,
                    backgroundColor: "#363636",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 100,
                      backgroundColor: secondaryColor,
                      opacity: 0.8,
                      alignItems: "center",
                      justifyContent: "center",
                      elevation: 5,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                    }}
                  >
                    <View
                      style={{
                        marginTop: -9,
                        marginLeft: -4,
                      }}
                    >
                      {children}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          },
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
