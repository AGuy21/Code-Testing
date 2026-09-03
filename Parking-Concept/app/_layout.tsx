import { Stack } from "expo-router";
import { stackScreenOptions } from "../constants/theme";
import { ClerkLoaded, ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Publishable key not found, check .env file or clerk API dashboard",
  );
}

export default function Layout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Stack screenOptions={{ ...stackScreenOptions }}>
          <Stack.Screen
            name="index"
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen
            name="park/[lotId]"
            options={{ title: "Parking Lot" }}
          />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
