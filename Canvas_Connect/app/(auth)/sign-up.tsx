import * as React from "react";
import { Text, TextInput, View, StyleSheet, Alert } from "react-native";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
<<<<<<< HEAD
import { Link, useRouter } from "expo-router";
=======
import { useRouter } from "expo-router";
>>>>>>> 0b5f47e9 (Added Error Handling For Sign In & Sign Up Pages)
import Colors from "@/constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Button from "@/components/Button";
import AuthHeader from "@/components/AuthHeader";
import { ClerkAPIError } from "@clerk/types";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const [errors, setErrors] = React.useState<ClerkAPIError[]>();
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
<<<<<<< HEAD
  const [otherError, setOtherError] = React.useState(false);
  const [verifyEmailError, setVerifyEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [otherErrorMessage, setOtherErrorMessage] = React.useState("");
  const [verifyEmailErrorMessage, setVerifyEmailErrorMessage] = React.useState("");

=======
  const [verifyEmailError, setVerifyEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [verifyEmailErrorMessage, setVerifyEmailErrorMessage] = React.useState("");


>>>>>>> 0b5f47e9 (Added Error Handling For Sign In & Sign Up Pages)
  React.useEffect(() => {
    errors?.forEach((error) => {
      if (error.meta?.paramName === "password") {
        setPasswordError(true);
        setPasswordErrorMessage(error.message);
        console.log("Sign up password error! " + error.message);
        if (errors?.length === 1) {
<<<<<<< HEAD
          setEmailError(false);
          setOtherError(false);
=======
          setEmailError(false)
>>>>>>> 0b5f47e9 (Added Error Handling For Sign In & Sign Up Pages)
        }
      } else if (error.meta?.paramName === "email_address") {
        setEmailError(true);
        setEmailErrorMessage(error.message);
        console.log("Sign up email error! " + error.message);
        if (errors?.length === 1) {
<<<<<<< HEAD
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
=======
          setPasswordError(false)
        }
      }
    });
    
>>>>>>> 0b5f47e9 (Added Error Handling For Sign In & Sign Up Pages)
  }, [errors]);
  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

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
        router.replace("/");
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
<<<<<<< HEAD
            style={[
              styles.input,
              { marginBottom: verifyEmailError ? hp(0) : hp(2) },
            ]}
=======
            style={[styles.input, {  marginBottom: verifyEmailError ? hp(0) : hp(2)}]}
>>>>>>> 0b5f47e9 (Added Error Handling For Sign In & Sign Up Pages)
            value={code}
            placeholder="Enter your verification code"
            onChangeText={(code) => setCode(code)}
            placeholderTextColor={Colors.text2}
          />
          {verifyEmailError && (
            <View style={styles.errorMessageView}>
<<<<<<< HEAD
              <Text style={styles.errorMessageText}>
                {verifyEmailErrorMessage}
              </Text>
=======
              <Text style={styles.errorMessageText}>{verifyEmailErrorMessage}</Text>
>>>>>>> 0b5f47e9 (Added Error Handling For Sign In & Sign Up Pages)
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
<<<<<<< HEAD
            style={[styles.input, { marginBottom: emailError ? hp(0) : hp(4) }]}
=======
            style={[styles.input, {  marginBottom: emailError ? hp(0) : hp(4)}]}
>>>>>>> 0b5f47e9 (Added Error Handling For Sign In & Sign Up Pages)
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
          <TextInput
<<<<<<< HEAD
            style={[
              styles.input,
              { marginBottom: passwordError ? hp(0) : hp(4) },
            ]}
=======
            style={[styles.input, {  marginBottom: passwordError ? hp(0) : hp(4)}]}
>>>>>>> 0b5f47e9 (Added Error Handling For Sign In & Sign Up Pages)
            value={password}
            placeholder="Enter password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            placeholderTextColor={Colors.text2}
          />
          {passwordError && (
            <View style={styles.errorMessageView}>
<<<<<<< HEAD
              <Text style={styles.errorMessageText}>
                {passwordErrorMessage}
              </Text>
=======
              <Text style={styles.errorMessageText}>{passwordErrorMessage}</Text>
>>>>>>> 0b5f47e9 (Added Error Handling For Sign In & Sign Up Pages)
            </View>
          )}
          <Button onPress={onSignUpPress} disabled={false} minWidth={wp(70)}>
            Continue
          </Button>
          <View
            style={[
              styles.questionContainer,
              { marginTop: otherError ? hp(0) : hp(2) },
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
    marginBottom: hp(2),
  },
  linkText: {
    fontFamily: "Nunito",
    color: Colors.secondary,
    textAlign: "center",
    fontSize: wp(3),
  },
  input: {
    width: wp(80),
    borderWidth: wp(0.5),
    borderRadius: wp(100),
    borderColor: Colors.primary,
    padding: wp(2),
    color: Colors.text,
  },
  errorMessageView: {
    width: wp(75),
<<<<<<< HEAD
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: hp(2),
  },
  errorMessageText: {
    textAlign: "left",
=======
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: hp(2),
  },
  errorMessageText: {
    textAlign: 'left',
>>>>>>> 0b5f47e9 (Added Error Handling For Sign In & Sign Up Pages)
    color: Colors.error,
  },
  questionContainer: {},
});
