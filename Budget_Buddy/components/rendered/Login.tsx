import React from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import Colors from '../../constants/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function Login() {
  /*
    The users login info is set to states to then
    be used to sign in the usser with the 
    onSignInPress function then it will
    set the user to active so that the user
    can be directed to the main app
    (this is done in App.tsx file)
    the styles are also here
  */
  const { signIn, setActive, isLoaded } = useSignIn();
 
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
 
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
          placeholderTextColor={Colors.primary}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>
 
      <View>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.primary}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
      color: Colors.primary,
      fontSize: wp(6),
      fontFamily: 'Lato-Bold',
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
  signInButton: {
    width: wp(60),
    height: hp(5),
    borderWidth: wp(.5),
    borderColor: Colors.background,
    backgroundColor: Colors.primary2,
    opacity: 0.86,
    borderRadius: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(10),
    marginVertical: hp(5),
  },
  signInButtonText:{
    fontFamily: 'Lato-Bold',
    fontSize: wp(4),
    color: Colors.background,
  }
});