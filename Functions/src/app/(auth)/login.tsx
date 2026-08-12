import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useColorTheme } from "../../hooks/useColorTheme";
import { Fonts } from "../../constants/Fonts";
import { useAuth } from "@clerk/expo";
import { useHostedAuth } from '@clerk/expo/hosted-auth'

export default function LoginScreen() {
  const router = useRouter();

  const backgroundColor = useColorTheme("background");
  const textColor = useColorTheme("text");
  const primary = useColorTheme("primary");
  const linkColor = useColorTheme("link");

  const { isLoaded, isSignedIn } = useAuth();
  const { startHostedAuth } = useHostedAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(tabs)/home");
    }
  }, [isSignedIn]);

  const handleSignUp = async () => {
    try {
      await startHostedAuth({ mode: 'sign-up' })
    } catch (error) {
      throw new Error("Failed to start hosted auth");
    }
  }

  if (!isLoaded) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <ActivityIndicator size="large" color={primary}   />
      </View>
    )
  }



  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Image
          source={require("../../../assets/TextLogo.png")}
          style={{ width: 180, height: 80 }}
        />
      </View>

      <Text style={[styles.subtitle, { color: textColor }]}>
        Tap the button to sign in and open tabs.
      </Text>

      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={[styles.buttonText, { color: linkColor }]}>Sign In</Text>
      </Pressable>
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
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
