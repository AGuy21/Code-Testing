

import React from 'react'
import { Stack } from 'expo-router'

const PublicStackNavigator = () => {
    /*
        This componenet is to be used in the main layout
        of the app for the public veiwing so 
        that people can sign up or sign in to the app
        and this shows the screens and options for navigation
    */
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LandingPage"  options={{ headerShown: false }} />
        <Stack.Screen name="Authenticate" options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" options={{ headerShown: false }} />
    </Stack>
  )
}

export default PublicStackNavigator
