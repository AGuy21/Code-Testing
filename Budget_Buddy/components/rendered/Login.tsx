import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import {useGetLoginStyles } from "../../constants/styles";
import { AppContext } from "../../app/_layout";

/**
 * Renders a login component.
 * Allows users to sign in with their email and password.
 */

export default function Login() {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetLoginStyles(Colors);

  const { signIn, setActive, isLoaded } = useSignIn();
 
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
 
  /**
   * Function that handles the sign-in button press event.
   * It attempts to sign in the user using the provided email address and password.
   * If successful, it sets the active session and redirects the user to the authenticated page.
   * If there is an error, it logs the error and displays an alert with the error message.
   */
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      router.replace('(auth)')
    } catch (err: any) {
      console.log(err);
      alert(err.errors[0].message);
    }
  };

  return (
    <View>
      <View>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors?.primary}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>
 
      <View>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors?.primary}
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
 
      <TouchableOpacity onPress={onSignInPress} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>
          Sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
}

