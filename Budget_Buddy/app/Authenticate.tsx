import { Text, StyleSheet, TouchableOpacity, ImageBackground, View } from 'react-native'
import React from 'react'
import Login from '../components/rendered/Login'
import Colors from '../constants/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Split from '../components/rendered/Split';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function Authenticate() {

  return (
    /*
        user can log in using the log in componenet
        or can go to the sign up screen to create an account
        this is used to render and make the app look pretty
    */
   <>
        <ImageBackground source={require('../assets/images/Login_BG.jpg')} style={styles.image}>
            <LinearGradient colors={[Colors.background,  Colors.transparent]} style={styles.container} start={{ x: 0, y: .15 }} >
                <Text style={styles.mainText}>
                    Login!
                </Text>

                <Login />
                <Split />

                <TouchableOpacity style={styles.signUpButton} onPress={() => router.navigate('SignUpScreen')}>
                    <Text style={styles.signUpButtonText}>
                        Sign Up!
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </ImageBackground>
    </>
  )
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
        fontSize: wp(7),
        fontFamily: 'Lato-Bold',
        marginBottom: hp(4)
    },
    signUpButton: {
        width: wp(60),
        height: hp(5),
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpButtonText:{
        fontFamily: 'Lato-Bold',
        fontSize: wp(4),
        color: Colors.primary,
    }
  });
  