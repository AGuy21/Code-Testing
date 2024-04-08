import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { AppContext } from "./_layout";
import { useGetSignUpScreenStyles } from "../constants/styles";

export default function SignUpScreen() {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetSignUpScreenStyles(Colors);

  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  /**
   * Represents the state of pending verification.
   */
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  /**
   * Function that handles the sign up button press event.
   * It creates a new user account, prepares email address verification,
   * and sets the state to indicate pending verification.
   * @returns A promise that resolves to void.
   */
  const onSignUpPress = async (): Promise<void> => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      alert(err.errors[0].message);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      router.replace("(auth)/Home.tsx");
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      alert(err.errors[0].message);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/Login_BG.jpg")}
      style={styles.image}
    >
      <LinearGradient
        colors={[Colors?.background, Colors?.transparent]}
        style={styles.container}
        start={{ x: 0, y: 0.15 }}
      >
        <View>
          {!pendingVerification && (
            <View>
              <View>
                <Text style={styles.mainText}>Sign Up!</Text>
                <TextInput
                  autoCapitalize="none"
                  placeholderTextColor={Colors?.primary}
                  value={emailAddress}
                  placeholder="Email..."
                  onChangeText={(email) => setEmailAddress(email)}
                  style={styles.input}
                />
              </View>

              <View>
                <TextInput
                  value={password}
                  placeholder="Password..."
                  placeholderTextColor={Colors?.primary}
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                  style={styles.input}
                />
              </View>

              <TouchableOpacity
                onPress={onSignUpPress}
                style={styles.signUpButton}
              >
                <Text style={styles.signUpButtonText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          )}
          {pendingVerification && (
            <View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={Colors?.primary}
                  value={code}
                  placeholder="Code..."
                  onChangeText={(code) => setCode(code)}
                />
              </View>
              <TouchableOpacity
                onPress={onPressVerify}
                style={styles.signUpButton}
              >
                <Text style={styles.signUpButtonText}>Verify Email</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
