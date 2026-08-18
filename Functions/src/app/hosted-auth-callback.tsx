import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useColorTheme } from "../hooks/useColorTheme"; // adjust path if needed

export default function HostedAuthCallbackScreen() {
  const backgroundColor = useColorTheme("background");
  const primary = useColorTheme("primary");

  // This screen just serves as a temporary landing pad.
  // Clerk processes the session tokens in the background automatically.
  // Once the auth state updates to 'isSignedIn = true', existing 
  // navigation logic (like the useEffect in your login screen or root layout) 
  // will kick in and redirect the user to the /(tabs) layout.

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActivityIndicator size="large" color={primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});