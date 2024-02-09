import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Colors from '../constants/Colors';
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignedInNavigator from '../app/(auth)/_layout';
import PublicStackNavigator from '../components/rendered/PublicStackNavigator';

SplashScreen.preventAutoHideAsync();

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

// token cache for saving users sessions on device
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },

  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
// fsdsf

export default function App() {
  // Load fonts
  const [fontsLoaded, fontError] = useFonts({
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-Bold-Italic': require('../assets/fonts/Lato-BoldItalic.ttf'),
    'Lato-Reg-Italic': require('../assets/fonts/Lato-Italic.ttf'),
    'Lato-Reg': require('../assets/fonts/Lato-Regular.ttf'),
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-Thin': require('../assets/fonts/Lato-Thin.ttf'),
  });
  // makes sure fonts are loaded (stolen from expo docs :P)
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  


  return (
    /*
      Provides clerk token cache for saving of sessions and key
      and uses clerk with expo to see if the user 
      is signed in and if so the signed in navigator is shown
      and if not the public stack nav is shown so the user can sign in
    */
    <ClerkProvider 
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY}
    > 
      <View style={styles.container} onLayout={onLayoutRootView}>

        <SignedOut>
          <PublicStackNavigator />
        </SignedOut>

        <SignedIn>
          <SignedInNavigator />
        </SignedIn>

      </View>
    </ClerkProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: hp(5),
  },
});
