import { Stack } from "expo-router";
import { stackScreenOptions } from "../../constants/theme";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";

const publishableKey = process.env.CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.log(publishableKey)
  throw new Error("Publishable key not found, check .env file or clerk API dashboard")
}

export default function EmployeeLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Stack screenOptions={{ ...stackScreenOptions }}>
        <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
      </Stack>
    </ClerkProvider>
  );
}
