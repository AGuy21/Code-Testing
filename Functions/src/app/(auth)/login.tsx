import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useAuth, useSignIn, useSignUp, useSSO } from "@clerk/expo";
import * as WebBrowser from "expo-web-browser";
import { AppTextInput, PrimaryButton } from "../../components/ui";
import { useColorTheme } from "../../hooks/useColorTheme";
import { Fonts } from "../../constants/Fonts";

WebBrowser.maybeCompleteAuthSession();

type Step = "credentials" | "verify-signup" | "verify-signin";

type ClerkErr = { message?: string; longMessage?: string } | null | undefined;
const messageOf = (error: ClerkErr, fallback = "Something went wrong. Please try again.") =>
  error?.longMessage ?? error?.message ?? fallback;

/**
 * Native sign-in / sign-up built on Clerk's headless hooks. Navigation after a
 * session is created is handled by the auth gate in the root layout.
 */
export default function LoginScreen() {
  const backgroundColor = useColorTheme("background");
  const textColor = useColorTheme("text");
  const primary = useColorTheme("primary");
  const secondary = useColorTheme("secondary");

  const { isLoaded } = useAuth();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { startSSOFlow } = useSSO();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (task: () => Promise<void>) => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await task();
    } catch (err) {
      console.warn("Auth error:", err);
      setError(messageOf(err as ClerkErr));
    } finally {
      setBusy(false);
    }
  };

  const fail = (error: ClerkErr): never => {
    throw new Error(messageOf(error));
  };

  const finishSignIn = async () => {
    const { error: finalizeError } = await signIn.finalize();
    if (finalizeError) fail(finalizeError);
  };

  // Routes a sign-in attempt by its status after a factor was submitted.
  const continueSignIn = async () => {
    if (signIn.status === "complete") return finishSignIn();
    if (signIn.status === "needs_second_factor" || signIn.status === "needs_client_trust") {
      const { error: sendError } = await signIn.mfa.sendEmailCode();
      if (sendError) fail(sendError);
      setCode("");
      setStep("verify-signin");
      return;
    }
    fail(null);
  };

  const submitCredentials = () =>
    run(async () => {
      const address = email.trim();
      if (!address || !password) throw new Error("Enter your email and password.");
      if (mode === "signin") {
        const { error: err } = await signIn.password({
          emailAddress: address,
          password,
        });
        if (err) fail(err);
        await continueSignIn();
        return;
      }
      const { error: createError } = await signUp.password({
        emailAddress: address,
        password,
      });
      if (createError) fail(createError);
      if (signUp.status === "complete") {
        const { error: finalizeError } = await signUp.finalize();
        if (finalizeError) fail(finalizeError);
        return;
      }
      const { error: sendError } = await signUp.verifications.sendEmailCode();
      if (sendError) fail(sendError);
      setCode("");
      setStep("verify-signup");
    });

  const submitCode = () =>
    run(async () => {
      const value = code.trim();
      if (value.length < 4) throw new Error("Enter the code we emailed you.");
      if (step === "verify-signup") {
        const { error: err } = await signUp.verifications.verifyEmailCode({ code: value });
        if (err) fail(err);
        if (signUp.status !== "complete") fail(null);
        const { error: finalizeError } = await signUp.finalize();
        if (finalizeError) fail(finalizeError);
        return;
      }
      const { error: err } = await signIn.mfa.verifyEmailCode({ code: value });
      if (err) fail(err);
      await finishSignIn();
    });

  const resendCode = () =>
    run(async () => {
      const { error: err } =
        step === "verify-signup"
          ? await signUp.verifications.sendEmailCode()
          : await signIn.mfa.sendEmailCode();
      if (err) fail(err);
    });

  const signInWithGoogle = () =>
    run(async () => {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    });

  const backToCredentials = () => {
    setStep("credentials");
    setCode("");
    setError(null);
  };

  if (!isLoaded) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  const verifying = step !== "credentials";

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      style={[styles.container, { backgroundColor }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.card,
              { borderColor: secondary, backgroundColor, opacity: 0.94 },
            ]}
          >
            <Image
              source={require("../../../assets/TextLogo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.eyebrow, { color: primary }]}>
              {verifying ? "Check your email" : mode === "signin" ? "Welcome back" : "Join in"}
            </Text>
            <Text style={[styles.title, { color: textColor }]}>
              {verifying
                ? "Enter your code"
                : mode === "signin"
                  ? "Sign in to your hangouts"
                  : "Create your account"}
            </Text>

            {verifying ? (
              <>
                <Text style={[styles.subtitle, { color: textColor }]}>
                  We sent a code to {email.trim()}.
                </Text>
                <View style={styles.field}>
                  <AppTextInput
                    value={code}
                    onChangeText={setCode}
                    placeholder="123456"
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    autoComplete="one-time-code"
                    maxLength={8}
                    returnKeyType="done"
                    onSubmitEditing={() => void submitCode()}
                    autoFocus
                  />
                </View>
                <PrimaryButton
                  label={busy ? "Verifying…" : "Verify"}
                  onPress={() => void submitCode()}
                  disabled={busy}
                  style={styles.full}
                />
                <View style={styles.linkRow}>
                  <Pressable onPress={() => void resendCode()} disabled={busy}>
                    <Text style={[styles.link, { color: primary }]}>Resend code</Text>
                  </Pressable>
                  <Pressable onPress={backToCredentials}>
                    <Text style={[styles.link, { color: secondary }]}>Back</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <View style={styles.field}>
                  <AppTextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    textContentType="emailAddress"
                    returnKeyType="next"
                  />
                  <AppTextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    textContentType={mode === "signin" ? "password" : "newPassword"}
                    returnKeyType="go"
                    onSubmitEditing={() => void submitCredentials()}
                  />
                </View>
                <PrimaryButton
                  label={busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
                  onPress={() => void submitCredentials()}
                  disabled={busy}
                  style={styles.full}
                />
                <View style={styles.divider}>
                  <View style={[styles.rule, { backgroundColor: secondary }]} />
                  <Text style={[styles.meta, { color: secondary }]}>or</Text>
                  <View style={[styles.rule, { backgroundColor: secondary }]} />
                </View>
                <PrimaryButton
                  label="Continue with Google"
                  variant="outline"
                  onPress={() => void signInWithGoogle()}
                  disabled={busy}
                  style={styles.full}
                />
                <Pressable
                  onPress={() => {
                    setMode(mode === "signin" ? "signup" : "signin");
                    setError(null);
                  }}
                  style={styles.switch}
                >
                  <Text style={[styles.link, { color: primary }]}>
                    {mode === "signin"
                      ? "New here? Create an account"
                      : "Already have an account? Sign in"}
                  </Text>
                </Pressable>
              </>
            )}

            {busy ? <ActivityIndicator color={primary} style={styles.spinner} /> : null}
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Text style={[styles.meta, { color: secondary }]}>
              Secure access powered by Clerk
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, width: "100%" },
  scroll: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  full: { width: "100%" },
  field: { width: "100%", gap: 4, marginBottom: 12 },
  linkRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 16 },
  link: { fontSize: 14, fontFamily: Fonts.SemiBold },
  switch: { marginTop: 18 },
  divider: { flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 14, width: "100%" },
  rule: { flex: 1, height: StyleSheet.hairlineWidth },
  spinner: { marginTop: 12 },
  error: {
    color: "#E5484D",
    fontSize: 13,
    textAlign: "center",
    marginTop: 12,
    fontFamily: Fonts.Medium,
  },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderRadius: 28,
    borderWidth: 1,
    elevation: 6,
  },
  logo: { width: 180, height: 80, marginBottom: 8 },
  eyebrow: {
    fontSize: 13,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontFamily: Fonts.SemiBold,
    marginBottom: 6,
  },
  title: { fontSize: 24, textAlign: "center", fontFamily: Fonts.Regular, marginBottom: 14 },
  subtitle: { fontSize: 15, textAlign: "center", marginBottom: 14, fontFamily: Fonts.Medium, opacity: 0.9 },
  meta: { fontSize: 12, textAlign: "center", fontFamily: Fonts.Medium, marginTop: 14 },
});
