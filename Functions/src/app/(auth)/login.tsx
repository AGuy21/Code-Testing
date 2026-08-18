import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/expo";
import { useHostedAuth } from "@clerk/expo/hosted-auth";
import { useColorTheme } from "../../hooks/useColorTheme";
import { Fonts } from "../../constants/Fonts";

export default function LoginScreen() {
  const router = useRouter();

  const backgroundColor = useColorTheme("background");
  const textColor = useColorTheme("text");
  const primary = useColorTheme("primary");
  const secondary = useColorTheme("secondary");

  const { isLoaded, isSignedIn } = useAuth();
  const { startHostedAuth } = useHostedAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(tabs)");
    }
  }, [isSignedIn, router]);

  const handleSignIn = async () => {
    try {
      await startHostedAuth({ mode: "sign-up" });
    } catch (error) {
      console.error("Failed to start hosted auth", error);
    }
  };

  if (!isLoaded) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.card, { borderColor: secondary }]}>
        <View style={styles.logoWrap}>
          <Image
            source={require("../../../assets/TextLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.eyebrow, { color: primary }]}>Welcome!</Text>
        <Text style={[styles.title, { color: textColor }]}>
          Let’s get you into your next hangout!
        </Text>
        <Text style={[styles.subtitle, { color: textColor }]}>
          Sign in to enjoy the most convenient and secure experience finding hangouts near you!
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: primary,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
          onPress={handleSignIn}
        >
          <Text style={[styles.buttonText, { color: "#121212" }]}>Sign In</Text>
        </Pressable>

        <Text style={[styles.meta, { color: secondary }]}>
          Secure access powered by Clerk
        </Text>
      </View>
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
  card: {
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 32,
    borderRadius: 28,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
  },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  logo: {
    width: 200,
    height: 90,
  },
  eyebrow: {
    fontSize: 13,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontFamily: Fonts.SemiBold,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: Fonts.Bold,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
    fontFamily: Fonts.Medium,
    opacity: 0.9,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Fonts.Bold,
  },
  meta: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: Fonts.Medium,
  },
});
