import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
  const { signIn, errors } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [mfaCode, setMfaCode] = useState("");

  const canSubmit = email.trim().length > 0 && password.length > 0;

  const handleSignIn = async () => {
    if (!canSubmit || !signIn) return;

    const { error } = await signIn.password({
      emailAddress: email,
      password: password,
    });

    if (error) {
      console.error("Sign-in failed:", error);
      return;
    }

    if (signIn.status === "needs_client_trust") {
      await signIn.mfa.sendEmailCode();
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: () => router.replace("/employee/dashboard"),
      })
    } else {
      console.log("Additional steps required. Current status:", signIn.status);
    }
  };

  const handleMFA = async () => {
    await signIn.mfa.verifyEmailCode({ code: mfaCode });

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: () => router.replace("/employee/dashboard"),
      })
    } else {
      console.log("MFA verification failed. Current status:", signIn.status);
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
        <AppTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@parkingapp.com"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
        />
        {errors?.fields?.identifier ? (
          <AppText variant="error">{errors.fields.identifier.message}</AppText>
        ) : null}
        <AppTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry={showPassword}
        />

        {signIn?.status === "needs_client_trust" && (
          <>
            <AppTextInput
              value={mfaCode}
              onChangeText={setMfaCode}
              placeholder="Enter MFA code"
            />
            {errors?.fields?.code ? (
              <AppText variant="error">{errors.fields.code.message}</AppText>
            ) : null}
            <PrimaryButton
              label="Submit MFA Code"
              onPress={handleMFA}
              disabled={!canSubmit}
            />
          </>
        )}
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <AppText variant="caption" style={{ marginBottom: theme.spacing.md }}>
            {showPassword ? "Hide password" : "Show password"}
          </AppText>
        </TouchableOpacity>

        {errors?.fields?.password ? (
          <AppText variant="error">{errors.fields.password.message}</AppText>
        ) : null}

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
