import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useColorTheme } from "../../hooks/useColorTheme";
import { Fonts } from "../../constants/Fonts";
import { useAuth, useUser } from "@clerk/expo";

export default function Profile() {
  const backgroundColor = useColorTheme("background");
  const textColor = useColorTheme("text");
  const linkColor = useColorTheme("link");
  const primary = useColorTheme("primary");

  const { userId, sessionId, getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const fetchExternalData = async () => {
    const token = await getToken();

    // Fetch data from an external API
    const response = await fetch("https://api.example.com/data", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  };

  // Handle loading state
  if (!isLoaded) return <Text>Loading...</Text>;

  // Protect the page from unauthenticated users
  if (!isSignedIn) return <Text>Sign in to view this page</Text>;

  return (
    <View style={[styles.container, { backgroundColor }]}>

      <Text style={[styles.title, { color: primary }]}>Profile</Text>
      
      <Text style={[styles.text, { color: textColor }]}>
        Manage your profile here
      </Text>

      <Text style={[styles.text, { color: textColor }]}>
        Hello, {userId}! Your current active session is {sessionId}.
      </Text>
      <Text style={[styles.text, { color: textColor }]}>
        Welcome, {user?.firstName} {user?.lastName}!
      </Text>
      <Text style={[styles.text, { color: textColor }]}>
        Your email is: {user?.emailAddresses[0]?.emailAddress}
      </Text>

      <TouchableOpacity onPress={fetchExternalData}>
        <Text style={[styles.text, { color: linkColor }]}>Fetch Data</Text>
      </TouchableOpacity>
      <Link href="/" style={[styles.link, { color: linkColor }]}>
        Go Home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
    fontFamily: Fonts.Bold,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    fontFamily: Fonts.Medium,
  },
  link: {
    fontSize: 16,
  },
});
