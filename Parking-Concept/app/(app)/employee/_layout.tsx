import { Stack, useRouter } from "expo-router";
import { stackScreenOptions } from "../../../constants/theme";
import { useAuth } from "@clerk/expo";
import { useEffect } from "react";
import { Screen } from "../../../componenets/ui";
import { ActivityIndicator } from "react-native";
import { theme } from "../../../constants/theme";

export default function EmployeeLayout() {
  const { isLoaded, isSignedIn } = useAuth({ treatPendingAsSignedOut: false });
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    
    // Kick unauthenticated users out to the new root login screen
    if (!isSignedIn) {
      console.log("User is not authorized. Redirecting to login...");
      router.replace("/login"); 
    }
  }, [isSignedIn, isLoaded]);

  if (!isLoaded) {
    return (
      <Screen>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </Screen>
    );
  }
  
  return (
    <Stack screenOptions={{ ...stackScreenOptions }}>
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
    </Stack>
  );
}