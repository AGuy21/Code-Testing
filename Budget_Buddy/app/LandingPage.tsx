import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity,  } from 'react-native';
import Colors from '../constants/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, {
  BounceInDown, Easing, FadeInUp,
} from 'react-native-reanimated';
import React from 'react';
import { router } from 'expo-router';

// Keep the splash screen visible while we fetch resources

export default function LandingPage() {
  return (
    /*
      This will take all components for the beginning screen
      and render them here with animations for asctetic
    */
    <View style={styles.container}>

      <Animated.View entering={FadeInUp.delay(500).duration(1000)}>
        <Image source={require('../assets/images/Home_Icon.png')} style={{ width:wp(75), height: wp(75), marginBottom: hp(10)}}/>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.springify().duration(3500).delay(500)}
      >
        <Text style={styles.title}> BudgetBuddy</Text>
        <Text style={styles.text}> Take Control of your finanaces</Text>
      </Animated.View>
      <Animated.View
        entering={BounceInDown.duration(1500).delay(200).damping(20).easing(Easing.ease)}
      >
        <TouchableOpacity style={styles.startedBtn} onPress={() => router.navigate('Authenticate')}>
            <Text style={styles.btnText}>
                Get Started
            </Text>
        </TouchableOpacity>
      </Animated.View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    color: '#ffffff',
    fontSize: wp(10),
    fontFamily: 'Lato-Bold',
    fontWeight: '700',
    lineHeight: wp(10),
    textAlign: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: wp(4),
    fontFamily: 'Lato-Bold',
    fontWeight: '500',
    lineHeight: wp(8),
    textAlign: 'center',
  },
  startedBtn: {
    backgroundColor: Colors.primary,
    width: wp(60),
    height: hp(6),
    borderRadius: wp(60),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(10),
    marginHorizontal: wp(3),
    },
    btnText: {
        color: Colors.white,
        fontFamily: 'Lato-Bold',
        fontSize: wp(4),
    }
});
