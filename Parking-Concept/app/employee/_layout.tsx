import { Stack, useRouter } from "expo-router";
import { stackScreenOptions } from "../../constants/theme";
import { ClerkLoading, useAuth } from "@clerk/expo";
import { useEffect } from "react";

export default function EmployeeLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) {
      console.log("Loading...")
      return;
    }

    if (isSignedIn) {
      console.log("User signed in... routing to dashboard");
      router.replace("/employee/dashboard");
    } else if (!isSignedIn) {
      console.log("User not signed in... routing to login");
      router.replace("/employee/login");
    }

    console.log("isSigedin:", isSignedIn);
  }, [isSignedIn, isLoaded]);

  return (
    <Stack screenOptions={{ ...stackScreenOptions }}>
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
    </Stack>
  );
}
