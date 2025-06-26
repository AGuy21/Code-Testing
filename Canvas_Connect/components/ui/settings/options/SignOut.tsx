import { View, Text } from 'react-native'
import React from 'react'
import SettingsButton from '../SettingsButton'
import { useClerk } from '@clerk/clerk-expo'
import Colors from '@/constants/Colors'

const SignOut = () => {
    const { signOut } = useClerk();
  return (
    <SettingsButton onPress={signOut} icon={"logout"} text='Sign Out' color={Colors.error}/>
  )
}

export default SignOut