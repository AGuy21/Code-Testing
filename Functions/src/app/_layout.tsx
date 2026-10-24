import { Stack } from "expo-router";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { ActivityIndicator, View } from "react-native";
import { tokenCache } from "@clerk/expo/token-cache";
import { HangoutsProvider } from "../providers/HangoutsProvider";
import { ChatProvider } from "../providers/ChatProvider";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing CLERK_PUBLISHABLE_KEY environment variable");
}

// Single source of truth for navigation: signed-in users only ever see the app
// stacks, signed-out users only see login. Waiting for `isLoaded` means a
// restored session is never mistaken for "signed out" on cold start.
function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={!!isSignedIn}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="chat/[conversationId]" />
        <Stack.Screen name="manage/[hangoutId]" />
      </Stack.Protected>
      <Stack.Screen name="hosted-auth-callback" />
    </Stack>
  );
}

export default function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "Manrope-Bold": require("../../assets/Manrope/Manrope-Bold.ttf"),
          "Manrope-ExtraBold": require("../../assets/Manrope/Manrope-ExtraBold.ttf"),
          "Manrope-ExtraLight": require("../../assets/Manrope/Manrope-ExtraLight.ttf"),
          "Manrope-Light": require("../../assets/Manrope/Manrope-Light.ttf"),
          "Manrope-Medium": require("../../assets/Manrope/Manrope-Medium.ttf"),
          "Manrope-Regular": require("../../assets/Manrope/Manrope-Regular.ttf"),
          "Manrope-SemiBold": require("../../assets/Manrope/Manrope-SemiBold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
        setFontsLoaded(true);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <HangoutsProvider>
        <ChatProvider>
          <RootNavigator />
        </ChatProvider>
      </HangoutsProvider>
    </ClerkProvider>
  );
}
