import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  AppText,
  AppTextInput,
  Card,
  PrimaryButton,
  Screen,
} from "../../componenets/ui";
import { theme } from "../../constants/theme";

import { useSignIn } from "@clerk/expo";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && password.length > 0;

  const handleSignIn = async () => {
    if (!canSubmit) return;
    if (!signIn) return;

    try {
      const signInAttempt = await signIn.password({
        emailAddress: email,
        password: password,
      });

      if (signInAttempt.error) {
        setError(signInAttempt.error.message);
        return;
      }
      
      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: () => router.replace("/employee/dashboard"),
        })
      }

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <View style={styles.brandMark}>
          <Text style={styles.brandMarkText}>P</Text>
        </View>
        <AppText variant="title">Employee sign in</AppText>
        <AppText variant="caption" style={styles.caption}>
          Staff access only. Contact your lot manager for credentials.
        </AppText>
      </View>

      <Card>
        {error && <AppText variant="error">{error}</AppText>}
        <AppTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@parkingapp.com"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
        />
        <AppTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
        />
        <PrimaryButton
          label="Sign in"
          onPress={handleSignIn}
          disabled={!canSubmit}
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.md,
  },
  brandMark: {
    alignItems: "center",
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.borderStrong,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    height: 56,
    justifyContent: "center",
    marginBottom: theme.spacing.md,
    width: 56,
  },
  brandMarkText: {
    color: theme.colors.white,
    fontSize: 26,
    fontWeight: "800",
  },
  caption: {
    marginTop: theme.spacing.xs,
    textAlign: "center",
  },
});
