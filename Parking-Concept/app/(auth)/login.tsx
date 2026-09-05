import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/expo";
import { AppText, AppTextInput, Card, PrimaryButton, Screen } from "../../componenets/ui";
import { theme } from "../../constants/theme";

export default function LoginScreen() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const canSubmit = email.trim().length > 0 && password.length > 0;

  const handleSignIn = async () => {
    setErrorMsg("");
    if (!canSubmit) return;

    try {
      const result = await signIn.password({
        identifier: email,
        password,
      });

      console.log("SignIn result:", result);

      // Check if the operation returned an explicit error payload
      if (result.error) {
        const errorCode = result.error.errors?.[0]?.code;
        if (errorCode === "session_exists") {
          router.replace("/(app)/employee/dashboard");
          return;
        }
        setErrorMsg("Invalid email or password.");
        return;
      }

      // Read status directly from the mutable signIn instance
      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: () => router.replace("/(app)/employee/dashboard"),
        });
      } else {
        console.log("Sign-in status incomplete:", signIn.status);
        setErrorMsg("Invalid email or password.");
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
        "An error occurred during sign-in."
      );
    }
  };

  return (
    <Screen scroll>
      <AppText variant="title" style={{ marginBottom: theme.spacing.md }}>
        Employee Sign In
      </AppText>
      {errorMsg ? <AppText variant="error">{errorMsg}</AppText> : null}
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
      </Card>
    </Screen>
  );
}