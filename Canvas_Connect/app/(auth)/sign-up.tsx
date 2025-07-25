import * as React from "react";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Button from "@/components/ui/Button";
import AuthHeader from "@/components/ui/AuthHeader";
import { ClerkAPIError } from "@clerk/types";
import Entypo from "@expo/vector-icons/Entypo";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [otherPassword, setOtherPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const [errors, setErrors] = React.useState<ClerkAPIError[]>();
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [otherError, setOtherError] = React.useState(false);
  const [verifyEmailError, setVerifyEmailError] = React.useState(false);
  const [samePasswordError, setSamePasswordError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [otherErrorMessage, setOtherErrorMessage] = React.useState("");
  const [verifyEmailErrorMessage, setVerifyEmailErrorMessage] =
    React.useState("");

  const [passwordHidden, setPasswordHidden] = React.useState(true);
  const [otherPasswordHidden, setOtherPasswordHidden] = React.useState(true);

  React.useEffect(() => {
    errors?.forEach((error) => {
      if (error.meta?.paramName === "password") {
        setPasswordError(true);
        setPasswordErrorMessage(error.message);
        console.log("Sign up password error! " + error.message);
        if (errors?.length === 1) {
          setEmailError(false);
          setOtherError(false);
        }
      } else if (error.meta?.paramName === "email_address") {
        setEmailError(true);
        setEmailErrorMessage(error.message);
        console.log("Sign up email error! " + error.message);
        if (errors?.length === 1) {
          setPasswordError(false);
          setOtherError(false);
        }
      } else {
        setOtherError(true);
        setOtherErrorMessage(error.message);
        console.log("Sign up other error! " + error.message);
        if (errors?.length === 1) {
          setPasswordError(false);
          setEmailError(false);
        }
      }
    });
  }, [errors]);
  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (password != otherPassword) {
      setSamePasswordError(true);
      return;
    }

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        setErrors(err.errors);
      }
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        setVerifyEmailError(true);
        setVerifyEmailErrorMessage(err.errors[0].message);
      }
    }
  };

  if (pendingVerification) {
    return (
      <>
        <AuthHeader title={"Sign Up"} />

        <View style={styles.container}>
          <Text style={styles.text}>Verify your email</Text>
          <TextInput
            style={[
              styles.input,
              { marginBottom: verifyEmailError ? hp(0) : hp(2) },
            ]}
            value={code}
            placeholder="Enter your verification code"
            onChangeText={(code) => setCode(code)}
            placeholderTextColor={Colors.text2}
          />
          {verifyEmailError && (
            <View style={styles.errorMessageView}>
              <Text style={styles.errorMessageText}>
                {verifyEmailErrorMessage}
              </Text>
            </View>
          )}
          <Button onPress={onVerifyPress} disabled={false} minWidth={wp(70)}>
            Verify
          </Button>
        </View>
      </>
    );
  }

  return (
    <>
      <AuthHeader title={"Sign Up"} />

      <View style={styles.container}>
        <>
          <TextInput
            style={[styles.input, { marginBottom: emailError ? hp(0) : hp(4) }]}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            onChangeText={(email) => setEmailAddress(email)}
            placeholderTextColor={Colors.text2}
          />
          {emailError && (
            <View style={styles.errorMessageView}>
              <Text style={styles.errorMessageText}>{emailErrorMessage}</Text>
            </View>
          )}
          <View
            style={[
              styles.input,
              { marginBottom: passwordError ? hp(0) : hp(4) },
            ]}
          >
            <TextInput
              style={{ color: Colors.text, flex: 90 }}
              value={password}
              placeholder="Enter password"
              secureTextEntry={passwordHidden}
              onChangeText={(password) => setPassword(password)}
              placeholderTextColor={Colors.text2}
            />

            <>
              {passwordHidden ? (
                <Pressable onPress={() => setPasswordHidden(!passwordHidden)}>
                  <Entypo name="eye" size={wp(5)} color={Colors.secondary} />
                </Pressable>
              ) : (
                <Pressable onPress={() => setPasswordHidden(!passwordHidden)}>
                  <Entypo
                    name="eye-with-line"
                    size={wp(5)}
                    color={Colors.secondary}
                  />
                </Pressable>
              )}
            </>
          </View>

          {passwordError && (
            <View style={styles.errorMessageView}>
              <Text style={styles.errorMessageText}>
                {passwordErrorMessage}
              </Text>
            </View>
          )}

          <View
            style={[
              styles.input,
              { marginBottom: samePasswordError ? hp(0) : hp(4) },
            ]}
          >
            <TextInput
              style={{ color: Colors.text, flex: 90 }}
              value={otherPassword}
              placeholder="Verify password"
              secureTextEntry={otherPasswordHidden}
              onChangeText={(otherPassword) => setOtherPassword(otherPassword)}
              placeholderTextColor={Colors.text2}
            />

            <>
              {otherPasswordHidden ? (
                <Pressable
                  onPress={() => setOtherPasswordHidden(!otherPasswordHidden)}
                >
                  <Entypo name="eye" size={wp(5)} color={Colors.secondary} />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => setOtherPasswordHidden(!otherPasswordHidden)}
                >
                  <Entypo
                    name="eye-with-line"
                    size={wp(5)}
                    color={Colors.secondary}
                  />
                </Pressable>
              )}
            </>
          </View>

          {samePasswordError && (
            <View style={styles.errorMessageView}>
              <Text style={styles.errorMessageText}>
                Passwords do not match!
              </Text>
            </View>
          )}

          <Button onPress={onSignUpPress} disabled={false} minWidth={wp(70)}>
            Continue
          </Button>

          {otherError && (
            <View style={styles.errorMessageView}>
              <Text style={styles.otherErrorMessageText}>
                {otherErrorMessage}
              </Text>
            </View>
          )}
          <View
            style={[
              styles.questionContainer,
              // { marginTop: otherError ? hp() : hp(2) },
            ]}
          >
            <Text style={styles.text}>Don't have an account?</Text>
            <Link href="/sign-in">
              <Text style={styles.linkText}>Sign In</Text>
            </Link>
          </View>
        </>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingVertical: hp(10),
  },
  text: {
    fontFamily: "Nunito",
    color: Colors.text,
    textAlign: "center",
    fontSize: wp(4),
    marginBottom: hp(1),
  },
  linkText: {
    fontFamily: "Nunito",
    color: Colors.secondary,
    textAlign: "center",
    fontSize: wp(3),
  },
  input: {
    color: Colors.text,
    width: wp(80),
    borderWidth: wp(0.5),
    borderRadius: wp(100),
    borderColor: Colors.primary,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: wp(2),
  },
  errorMessageView: {
    width: wp(75),
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: hp(2),
  },
  errorMessageText: {
    textAlign: "left",
    color: Colors.error,
  },
  otherErrorMessageText: {
    textAlign: "center",
    color: Colors.error,
  },
  questionContainer: {},
});
