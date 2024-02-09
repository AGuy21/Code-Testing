import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors';

export default function Profile({ navigation }) {
  const { signOut } = useAuth();

  const user = useUser();

  const doLogout = () => {
    signOut();
    console.log(user.user.emailAddresses[0].emailAddress + 'Signed out')
  };

  return (
    <View>
        <Text style={{ color: Colors.primary}}> Signed in</Text>
        <Text style={{ color: Colors.primary}}> {user.user.emailAddresses[0].emailAddress} </Text>

        <Button onPress={doLogout} title="Sign Out" />
    </View>
  )
}