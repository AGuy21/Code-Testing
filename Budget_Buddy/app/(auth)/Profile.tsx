import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
export default function Profile() {

  const user = useUser();

  return (
    <View style={styles.container}>

        <Text style={{ color: Colors.primary}}> {user.user?.emailAddresses[0].emailAddress} </Text>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    padding: wp(5),
  },
  
})