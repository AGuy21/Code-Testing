import React from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ImageBackground } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";

export default function SignUpScreen() {
    /*
      This screen contains the components for the user 
      to sign in and get send their email to create their
      account it also shows the layout for the user such as
      the colors and basic styles
      when the users email is pending it will show a diffrent
      screen where the user can input their email code to
      verify their account then they will have their
      account set active so they can view the main screens
    */
  const { isLoaded, signUp, setActive } = useSignUp();
  
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pendingVerification, setPendingVerification] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
 
  // start the sign up process.
  /**
   * Function that handles the sign up process.
   * 
   * @returns {Promise<void>} A promise that resolves when the sign up process is completed.
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

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      alert(err.errors[0].message);
    }
  };
 
  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
 
      await setActive({ session: completeSignUp.createdSessionId });
      router.replace('(auth)')
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      alert(err.errors[0].message);
    }
  };

  return (
    <ImageBackground source={require('../assets/images/Login_BG.jpg')} style={styles.image}>
      <LinearGradient colors={[Colors.background,  Colors.transparent]} style={styles.container} start={{ x: 0, y: .15 }} >
        <View>
          {!pendingVerification && (
            <View>
              <View>
                <Text style={styles.mainText}>
                  Sign Up!
                </Text>
                <TextInput
                  autoCapitalize="none"
                  placeholderTextColor={Colors.primary}
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
                  placeholderTextColor={Colors.primary}
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                  style={styles.input}
                />
              </View>
    
              <TouchableOpacity onPress={onSignUpPress} style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {pendingVerification && (
            <View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={Colors.primary}
                  value={code}
                  placeholder="Code..."
                  onChangeText={(code) => setCode(code)}
                />
              </View>
              <TouchableOpacity onPress={onPressVerify} style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>
                  Verify Email
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
      height: hp(100),
      width: wp(100),
      resizeMode: 'contain',
  },
  mainText: {
      color: Colors.primary,
      fontSize: wp(6),
      fontFamily: 'Lato-Bold',
      textAlign: 'center',
  },
  input: {
    color: Colors.primary,
    fontSize: wp(5),
    fontFamily: 'Lato-Reg',
    width: wp(80),
    height: hp(5),
    borderWidth: wp(.5),
    borderColor: Colors.primary,
    borderRadius: 10,
    paddingLeft: wp(5),
    marginTop: hp(5),
  },
  signUpButton: {
    width: wp(60),
    height: hp(5),
    borderWidth: wp(.5),
    borderColor: Colors.background,
    backgroundColor: Colors.primary,
    opacity: 0.86,
    borderRadius: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(10),
    marginVertical: hp(5),
  },
  signUpButtonText:{
    fontFamily: 'Lato-Bold',
    fontSize: wp(4),
    color: Colors.background,
  }
});