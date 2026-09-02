import { router, Stack, useRouter } from "expo-router";
import { stackScreenOptions } from "../../constants/theme";
import { useAuth } from "@clerk/expo";
import { useEffect } from "react";


export default function EmployeeLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  
  if (!isLoaded) {
    console.log("Auth state is not loaded yet. Waiting for it to load...");
    return null; // TODO: loading indicator
  }

  useEffect(() => {
    if (!isLoaded) return;


    if (isSignedIn) {
      console.log("User is signed in");
      router.replace("/employee/dashboard");
    } else {
      console.log("User is not signed in");
      router.replace("/employee/login");
    }
  }, [isSignedIn, isLoaded]);

  return (
      <Stack screenOptions={{ ...stackScreenOptions }}>
        <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
      </Stack>
  );
}
