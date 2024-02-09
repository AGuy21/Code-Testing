import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '../FirebaseConfig'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import Animated, {  BounceInLeft, FadeInDown, FlipInXUp, useSharedValue,  } from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// for loading screen
import LoadingScreen from '../components/THISONE/Loading'

const index = () => {
  const [ loading, setLoading] = useState(false)
  // all user data states
  const [ password, setPassword] = useState('')
  const [ email, setEmail] = useState('')
  const auth = FIREBASE_AUTH; // to use firebase authentication
  // All authentication functions listed below
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error: any) {
      console.log(error);
      alert('Error' + error.message)
    } finally {
      setLoading(false);
    }
  }
  
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error: any) {
      console.log(error);
      alert('Error' + error.message)
    } finally {
      setLoading(false);
    }
  }
  return (
    <Animated.View style={styles.container} exiting={FlipInXUp}>
      { loading ? <LoadingScreen />
        : 
      <KeyboardAvoidingView behavior='padding'>
          <Text style={styles.mainText}> 
            Welcome
          </Text> 
        
        <Animated.View
          entering={BounceInLeft}
        >
          <Text style={{ fontWeight: '600', marginLeft: wp(1), marginVertical: hp(.25) }}> 
            Enter Email Address
          </Text> 
          <TextInput style={styles.input} 
            placeholder='Email' 
            autoCapitalize='none'
            onChangeText={(text) => setEmail(text)} 
            value={email}
          />
        </Animated.View>
        <Animated.View
          entering={BounceInLeft.delay(250)}
          style={styles.inputMargins}
        >
          <Text style={{ fontWeight: '600', marginLeft: wp(1), marginVertical: hp(.25) }}> 
            Enter Password
          </Text> 
          <TextInput
            style={styles.input} 
            placeholder='Password' 
            autoCapitalize='none'
            onChangeText={(text) => setPassword(text)} 
            value={password}
            secureTextEntry={true}
          />
        </Animated.View>
          <Animated.View
            style={styles.buttonContainer}
            entering={FadeInDown.delay(750).springify().stiffness(70).damping(5).mass(1.25).restSpeedThreshold(5).withInitialValues({ transform: [{ translateY: 35}]})}
          >
            <TouchableOpacity  style={styles.button} onPress={() =>  signIn()}> 
              <Text> 
                Sign In
              </Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() =>  signUp()}>
              <Text> 
                Create Account
              </Text> 
            </TouchableOpacity>
          </Animated.View>
      </KeyboardAvoidingView>
      }
    </Animated.View>
  )
}
export default index

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: hp(5.5),
    borderWidth: hp(.15),
    borderRadius: hp(1),
    padding: wp(1),
    backgroundColor: '#fff'
  },
  inputMargins: {
    marginVertical: hp(2),
  },
  button: {
    backgroundColor: '#80ff80',
    width: wp(80),
    height: hp(4.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: hp(.15),
    borderRadius: hp(1),
    marginVertical: hp(1),
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(10),
    marginTop: hp(1)
  },
  mainText: {
    fontSize: wp(10),
    textAlign: 'center',
    marginBottom: hp(10),
    fontWeight: '600'
  }
})