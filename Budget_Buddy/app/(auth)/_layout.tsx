/**
 * Renders the navigation tabs for the signed-in user.
 * @returns The JSX element representing the navigation tabs.
 */
import React, { useEffect, useState } from "react";
import { Tabs, router } from "expo-router";
import { Pressable, View, Text } from "react-native";
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
import useFetchUserTheme from "../../components/hooks/useFetchUserTheme";
import colorLib from "../../constants/colorLib";
import AuthLayoutLoading from "../../components/rendered/AuthLayoutLoading";

export default function SignedInNavigator() {
  const colorContext = React.useContext(AppContext);

  const Colors = colorContext?.Colors;
  const setColors = colorContext?.setColors;

  const user = useUser();
  const { signOut } = useAuth();
  // fetches the user's theme data
  const complete = useFetchUserTheme();
  // sets the loading state to false when the theme data is fetched
  useEffect(() => {
    if (complete) {
      setLoading(false);
    }
  }, [complete]);

  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Logs out the user, resets the colors, and navigates to the authentication page.
   */
  const doLogout = () => {
    signOut();
    setColors(colorLib.Basic);
    console.log(user.user?.emailAddresses[0]?.emailAddress + "Signed out");
    router.replace("../Authenticate"); //TODO: This causes a bug but not a full crash fix later @AGuy21 3/29/22
  };

  return (
    <>
      {loading ? (
        <AuthLayoutLoading />
      ) : (
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
                  <Octicons
                    name="sign-out"
                    size={wp(6)}
                    color={Colors?.primary}
                  />
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
      )}
    </>
  );
}
