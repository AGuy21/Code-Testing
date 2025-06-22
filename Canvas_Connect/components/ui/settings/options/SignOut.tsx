import { View, Text } from 'react-native'
import React from 'react'
import SettingsButton from '../SettingsButton'
import { useClerk } from '@clerk/clerk-expo'

const SignOut = () => {
    const { signOut } = useClerk();
  return (
    <SettingsButton onPress={signOut} icon={"logout"} text='Sign Out'/>
  )
}

export default SignOut