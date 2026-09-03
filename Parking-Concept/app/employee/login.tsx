import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
import { useAuth } from "@clerk/expo";

export default function LoginScreen() {
  const { signIn, errors } = useSignIn();
  const { isLoaded, signOut } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otherError, setOtherError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [mfaCode, setMfaCode] = useState("");

  const canSubmit = email.trim().length > 0 && password.length > 0;

  if (!isLoaded) {
    return null; // Optionally return a loading spinner here
  }

  const handleSignIn = async () => {
    if (!canSubmit) return;

    const { error } = await signIn.password({
      emailAddress: email,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));

      if (error?.errors?.[0]?.code === "session_exists") {
        await signOut();
        setOtherError("Stale session cleared. Please click Sign in again.");
        return;
      }

      setOtherError("An error occurred during sign-in.");
      return;
    }

    if (signIn.status === "complete") {
      console.log("Sign-in successful. Current status:", signIn.status);
      await signIn.finalize({
        status: "complete",
        navigate: ({ session }) => {
          // If Clerk identifies an incomplete requirement, intercept it here
          if (session?.currentTask) {
            router.push('/employee/dashboard');
            return;
          }
          // Otherwise, push to dashboard
          router.push('/employee/dashboard');
        }

        
      });
    } else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code",
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      console.log("Additional steps required.:", signIn);
    }
  };

  const handleMFA = async () => {
    await signIn.mfa.verifyEmailCode({ mfaCode });

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: () => router.replace("/employee/dashboard"),
      });
    } else {
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  if (signIn.status === "needs_client_trust") {
    return (
      <Screen scroll>
        <AppText variant="title">Multi-Factor Authentication</AppText>
        <AppText variant="caption" style={styles.caption}>
          Please enter the MFA code sent to your email.
        </AppText>
        <Card style={{ marginBottom: theme.spacing.md }}>
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
        </Card>
      </Screen>
    );
  }
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
        {otherError ? (
          <AppText variant="error" style={{ marginTop: theme.spacing.md }}>
            {otherError}
          </AppText>
        ) : null}
      </View>

      <Card>
        <>
          <AppTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@parkingapp.com"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
          />
          {errors.fields.identifier ? (
            <AppText variant="error">
              {errors.fields.identifier.message}
            </AppText>
          ) : null}
          <AppTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry={showPassword}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <AppText
              variant="caption"
              style={{ marginBottom: theme.spacing.md }}
            >
              {showPassword ? "Show password" : "Hide password"}
            </AppText>
          </TouchableOpacity>
          {errors.fields.password ? (
            <AppText variant="error">{errors.fields.password.message}</AppText>
          ) : null}

          <PrimaryButton
            label="Sign in"
            onPress={handleSignIn}
            disabled={!canSubmit}
          />
        </>
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
