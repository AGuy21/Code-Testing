/**
 * Landing page component for the Budget Buddy app.
 * Renders the initial screen with animations and components.
 */
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity,  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, {
  BounceInDown, Easing, FadeInUp,
} from 'react-native-reanimated';
import React from 'react'
import { router } from 'expo-router';
import { useSignedInCheck } from '../components/hooks/userSignedIn';
import { AppContext } from './_layout';
import { useGetLandingPageStyles } from '../constants/styles';

// Keep the splash screen visible while we fetch resources

export default function LandingPage() {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetLandingPageStyles(Colors);
  // if the user is signed in it routes to home to avoid bugs
  useSignedInCheck();
  return (
    /** 
      * This will take all components for the beginning screen
      * and render them here with animations for aesthetic
    */
    <View style={styles.container}>

      <Animated.View entering={FadeInUp.delay(500).duration(1000)}>
        <Image source={require('../assets/images/Home_Icon.png')} style={{ width:wp(75), height: wp(75), marginBottom: hp(10)}}/>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.springify().duration(3500).delay(500)}
      >
        <Text style={styles.title}> BudgetBuddy</Text>
        <Text style={styles.text}> Take Control of your finances</Text>
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

