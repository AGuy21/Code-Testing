/**
 * Renders the navigation tabs for the signed-in user.
 * @returns The JSX element representing the navigation tabs.
 */
import React from "react";
import { Tabs, router } from "expo-router";
import { Pressable, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-expo";
import { AppContext } from "../_layout";

export default function SignedInNavigator() {
  const colorContext = React.useContext(AppContext);

  const Colors = colorContext?.Colors;

  const user = useUser();
  const { signOut } = useAuth();

  /**
   * Logs out the user and redirects to the authentication page.
   */
  const doLogout = () => {
    signOut();
    console.log(user.user?.emailAddresses[0]?.emailAddress + "Signed out");
    router.replace("Authenticate");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: Colors?.gray,
        tabBarInactiveBackgroundColor: Colors?.gray,

        tabBarActiveTintColor: Colors?.TabBarButtons,
        tabBarInactiveTintColor: Colors?.TabBarButtons,

        tabBarStyle: {
          // adds red to top of tab bar
          borderTopColor: Colors?.primary,
          borderTopWidth: hp(0.15),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: hp(1),
                gap: hp(0.2),
              }}
            >
              <Ionicons name="add" size={size} color={color} />
              {focused && (
                <View
                  style={{
                    borderRadius: hp(1), // make it rounded
                    borderWidth: hp(0.15),
                    borderColor: Colors?.primary, // red border
                    width: size * 1.2,
                  }}
                />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: hp(1),
                gap: hp(0.2),
              }}
            >
              <Entypo name="home" size={size} color={color} />
              {focused && (
                <View
                  style={{
                    borderRadius: hp(1), // make it rounded
                    borderWidth: hp(0.15),
                    borderColor: Colors?.primary, // red border
                    width: size * 1.2,
                  }}
                />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: true,
          title: "",
          headerTintColor: Colors?.primary,
          headerTitle: "Profile",
          headerTitleAlign: "center",
          headerTitleAllowFontScaling: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors?.background,
            height: hp(12),
          },
          headerRight: () => (
            <Pressable onPress={doLogout} style={{ marginRight: wp(4) }}>
              <Octicons name="sign-out" size={wp(6)} color={Colors?.primary} />
            </Pressable>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: hp(1),
                gap: hp(0.2),
              }}
            >
              <Ionicons name="settings-sharp" size={size} color={color} />
              {focused && (
                <View
                  style={{
                    borderRadius: hp(1), // make it rounded
                    borderWidth: hp(0.15),
                    borderColor: Colors?.primary, // red border
                    width: size * 1.2,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
