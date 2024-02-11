import { View, StyleSheet } from 'react-native'
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Colors from '../constants/Colors';
import * as SecureStore from "expo-secure-store";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Stack } from 'expo-router';
import React from 'react'
import { useSignedInCheck } from '../components/hooks/userSignedIn';
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
      is signed in and if so the needed screens for 
      user sign in are shown and if not the main 
      screens needed to sign in are shown
      (the transfer to home is done at app/index.tsx)
    */
    <ClerkProvider 
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY}
    > 
      <View style={styles.container} onLayout={onLayoutRootView}>

      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index"  />
          <Stack.Screen name="Authenticate"  />
          <Stack.Screen name="SignUpScreen" />
      </Stack>

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
