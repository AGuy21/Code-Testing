import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/expo";
import { ActivityIndicator, View } from "react-native";
import { theme } from "../../constants/theme";

export default function AuthLayout() {
  const { isLoaded, isSignedIn } = useAuth({ treatPendingAsSignedOut: false });

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </View>
    );
  }

  // If already logged in, bounce straight to dashboard
  if (isSignedIn) {
    return <Redirect href="/(app)/employee/dashboard" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}