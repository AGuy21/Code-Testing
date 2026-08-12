import { Stack } from "expo-router";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing CLERK_PUBLISHABLE_KEY environment variable");
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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ClerkProvider>
  );
}
