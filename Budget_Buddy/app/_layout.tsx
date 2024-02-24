/**
 * This file contains the layout component for the Budget Buddy app.
 * It imports necessary dependencies and defines the main App component.
 * The App component provides a context and renders the main view of the app.
 */

import { View, StyleSheet } from 'react-native'
import { useCallback, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Colors from '../constants/Colors';
import * as SecureStore from "expo-secure-store";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Stack } from 'expo-router';
import React from 'react'

SplashScreen.preventAutoHideAsync();

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

// token cache for saving users sessions on device
const tokenCache = {
  /**
   * Retrieves the token from the secure store.
   * @param key - The key used to store the token.
   * @returns A promise that resolves to the token value, or null if the token does not exist.
   */
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },

  /**
   * Saves the token to the secure store.
   * @param key - The key used to store the token.
   * @param value - The token value to be saved.
   * @returns A promise that resolves when the token is successfully saved, or rejects if an error occurs.
   */
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

type AppContextType = {
  refresh: boolean,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AppContext = React.createContext<AppContextType | null>(null);

/**
 * The main component of the Budget Buddy app.
 * It provides a context for the app and renders the main view.
 * @returns The rendered JSX elements.
 */
export default function App() {
  // context related declerations
  const [refresh, setRefresh] = useState<boolean>(true);

  const appContextValues = {
    refresh,
    setRefresh,
  }

  // Load fonts
  /**
   * Loads the required fonts for the layout component.
   * @returns A tuple containing the status of font loading and any font loading errors.
   */
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
    /**
     * It provides a context for the app and renders the main view.
     * @param {ClerkProvider} - The ClerkProvider component that provides the Clerk authentication context.
     * @param {AppContext.Provider} - The AppContext.Provider component that provides the app context.
     * @param {View} - The main view of the app.
     * @param {Stack} - The Stack component that provides the navigation stack for the app.
     * @returns The rendered JSX elements.
     */
    <ClerkProvider 
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY}
    > 
      <AppContext.Provider value={appContextValues}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index"  />
            <Stack.Screen name="Authenticate"  />
            <Stack.Screen name="SignUpScreen" />
          </Stack>
        </View>
      </AppContext.Provider>
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
