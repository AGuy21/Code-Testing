import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Button from "@/components/ui/Button";
import AuthHeader from "@/components/ui/AuthHeader";
import { ClerkAPIError } from "@clerk/types";
import Entypo from "@expo/vector-icons/Entypo";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const { colors } = useThemeStore();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [errors, setErrors] = React.useState<ClerkAPIError[]>();
  const [emailError, setEmailError] = React.useState(false);
  const [otherError, setOtherError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [otherErrorMessage, setOtherErrorMessage] = React.useState("");

  const [passwordHidden, setPasswordHidden] = React.useState(true);

  React.useEffect(() => {
    errors?.forEach((error) => {
      if (error.meta?.paramName === "password") {
        setPasswordError(true);
        setPasswordErrorMessage(error.message);
        console.log("Sign in password error! " + error.message);
        if (errors?.length === 1) {
          setEmailError(false);
          setOtherError(false);
        }
      } else if (error.meta?.paramName === "email_address") {
        setEmailError(true);
        setEmailErrorMessage(error.message);
        console.log("Sign in email error! " + error.message);
        if (errors?.length === 1) {
          setPasswordError(false);
          setOtherError(false);
        }
      } else {
        setOtherError(true);
        setOtherErrorMessage(error.message);
        console.log("Sign in other error! " + error.message);
        if (errors?.length === 1) {
          setPasswordError(false);
          setEmailError(false);
        }
      }
    });
  }, [errors]);

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        setErrors(err.errors);
        console.log(err);
      }
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <>
      <AuthHeader title={"Sign In"} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <TextInput
          style={[
            styles.input,
            {
              marginBottom: emailError ? hp(0) : hp(4),
              borderColor: colors.primary,
              color: colors.text,
            },
          ]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
          placeholderTextColor={colors.text2}
        />
        {emailError && (
          <View style={styles.errorMessageView}>
            <Text style={[styles.errorMessageText, { color: colors.error }]}>
              {emailErrorMessage}
            </Text>
          </View>
        )}

        <View
          style={[
            styles.input,
            {
              marginBottom: passwordError ? hp(0) : hp(4),
              borderColor: colors.primary,
              color: colors.text,
            },
          ]}
        >
          <TextInput
            style={{ color: colors.text, flex: 90 }}
            value={password}
            placeholder="Enter password"
            secureTextEntry={passwordHidden}
            onChangeText={(password) => setPassword(password)}
            placeholderTextColor={colors.text2}
          />

          <>
            {passwordHidden ? (
              <Pressable onPress={() => setPasswordHidden(!passwordHidden)}>
                <Entypo name="eye" size={wp(5)} color={colors.secondary} />
              </Pressable>
            ) : (
              <Pressable onPress={() => setPasswordHidden(!passwordHidden)}>
                <Entypo
                  name="eye-with-line"
                  size={wp(5)}
                  color={colors.secondary}
                />
              </Pressable>
            )}
          </>
        </View>

        {passwordError && (
          <View style={styles.errorMessageView}>
            <Text style={[styles.errorMessageText, { color: colors.error }]}>
              {passwordErrorMessage}
            </Text>
          </View>
        )}

        <Button onPress={onSignInPress} disabled={false} minWidth={wp(70)}>
          Sign in
        </Button>

        {otherError && (
          <View style={styles.errorMessageView}>
            <Text
              style={[styles.otherErrorMessageText, { color: colors.error }]}
            >
              {otherErrorMessage}
            </Text>
          </View>
        )}

        <View
          style={[
            styles.questionContainer,
            { marginTop: otherError ? hp(0) : hp(2) },
          ]}
        >
          <Text style={[styles.text, { color: colors.text }]}>
            Don't have an account?
          </Text>
          <Link href="/sign-up">
            <Text style={[styles.linkText, { color: colors.secondary }]}>
              Sign Up
            </Text>
          </Link>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(10),
  },
  text: {
    fontFamily: "Nunito",
    textAlign: "center",
    fontSize: wp(4),
  },
  linkText: {
    fontFamily: "Nunito",
    textAlign: "center",
    fontSize: wp(3),
  },
  input: {
    width: wp(80),
    borderWidth: wp(0.5),
    borderRadius: wp(100),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: wp(2),
  },
  errorMessageView: {
    width: wp(75),
    justifyContent: "flex-start",
    marginBottom: hp(2),
  },
  errorMessageText: {
    textAlign: "left",
  },
  otherErrorMessageText: {
    textAlign: "center",
  },
  questionContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
