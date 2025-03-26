import Colors from "@/constants/Colors";
import { router, Tabs } from "expo-router";
import React, { useEffect } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";

export default function TabLayout() {


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: Colors.background,
        tabBarInactiveBackgroundColor: Colors.background,
        tabBarInactiveTintColor: Colors.primaryDark,
        tabBarActiveTintColor: Colors.secondary,
      }}
    >
      <Tabs.Screen
        name="artists"
        options={{
          title: "Artists",
          tabBarIcon: ({ color, size }) => (
            <Fontisto size={size} name="persons" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="art"
        options={{
          title: "Art",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 size={size} name="palette" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 size={size} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              size={size}
              name="message-image"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 size={size} name="person-rays" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
