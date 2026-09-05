import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/expo";
import {
  AppText,
  AppTextInput,
  Card,
  PrimaryButton,
  Screen,
} from "../../componenets/ui";
import { theme } from "../../constants/theme";

export default function LoginScreen() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [needsMFA, setNeedsMFA] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const canSubmit = email.trim().length > 0 && password.length > 0;

const handleSignIn = async () => {
    setErrorMsg("");
    if (!canSubmit) return;

    try {
      // 1. Call password sign-in (do not rely on its return value)
      await signIn.password({
        identifier: email,
        password,
      });

      // 2. Read status directly from the mutable signIn instance after resolution
      console.log("Current sign-in status:", signIn.status);

      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: () => router.replace("/(app)/employee/dashboard"),
        });
      } else if (signIn.status === "needs_client_trust" || signIn.status === "needs_second_factor") {
        const emailCodeFactor = signIn.supportedSecondFactors?.find(
          (factor) => factor.strategy === "email_code",
        );

        if (emailCodeFactor) {
          await signIn.mfa.sendEmailCode();
          setNeedsMFA(true);
        } else {
          setErrorMsg("Second factor authentication required, but no email code factor was found.");
        }
      } else {
        console.log("Sign-in status incomplete:", signIn.status);
        setErrorMsg("Sign-in incomplete. Please check your credentials.");
      }
    } catch (e: any) {
      console.error("Caught sign-in error:", JSON.stringify(e, null, 2));

      const errorCode = e?.errors?.[0]?.code || e?.code;
      if (errorCode === "session_exists") {
        router.replace("/(app)/employee/dashboard");
        return;
      }

      setErrorMsg(
        e?.errors?.[0]?.longMessage ||
          e?.errors?.[0]?.message ||
          "An error occurred during sign-in.",
      );
    }
  };

  const handleMFA = async () => {
    setErrorMsg("");
    try {
      await signIn.mfa.verifyEmailCode({ code: mfaCode }); // Note: parameter key is usually 'code' depending on SDK version

      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: () => router.replace("/(app)/employee/dashboard"),
        });
      } else {
        setErrorMsg("Verification failed. Please try again.");
      }
    } catch (e: any) {
      setErrorMsg(e?.errors?.[0]?.message || "Invalid code.");
    }
  };
  
  return (
    <Screen scroll>
      <AppText variant="title" style={{ marginBottom: theme.spacing.md }}>
        Employee Sign In
      </AppText>
      {errorMsg ? <AppText variant="error">{errorMsg}</AppText> : null}
      {needsMFA ? (
        <Card>
          <AppTextInput
            label="MFA Code"
            value={mfaCode}
            onChangeText={setMfaCode}
            autoCapitalize="none"
            keyboardType="numeric"
          />
          <PrimaryButton
            label="Verify MFA Code"
            onPress={handleMFA}
            disabled={mfaCode.trim().length === 0}
          />
        </Card>
      ) : (
        <Card>
          <AppTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
          />
          <AppTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
          />
          <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <AppText variant="muted" style={{ marginTop: theme.spacing.sm }}>
              {secureTextEntry ? "Show Password" : "Hide Password"}
            </AppText>
          </Pressable>
          <View style={{ height: theme.spacing.md }} />
          <PrimaryButton
            label="Sign In"
            onPress={handleSignIn}
            disabled={!canSubmit}
          />
          <PrimaryButton
            label="Go to Home"
            onPress={() => router.replace("/")}
            variant="outline"
            style={{ marginTop: theme.spacing.sm }}
          />
        </Card>
      )}
    </Screen>
  );
}
