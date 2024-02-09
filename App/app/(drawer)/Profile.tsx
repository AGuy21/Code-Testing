import { View, Text,  StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig'
import { Stack, useRouter } from 'expo-router'
import { count, doc, getDoc, updateDoc } from 'firebase/firestore'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import { CountContext, TransmutatorContext, UserContext } from '../_layout'

const List = () => {
  // gets user context
  const userContext = React.useContext(UserContext)
  const transContext = React.useContext(TransmutatorContext)
  const countContext = React.useContext(CountContext)
  
  // defines states to use user context
  const username = userContext?.username
  const setUsername = userContext?.setUsername

  const ds = transContext?.darkSteel
  const atk = transContext?.attack
  const def = transContext?.defense
  const troop = transContext?.troops
  const power = transContext?.power

  const count = countContext?.count
  const multiplier = countContext?.multiplier
  const auto = countContext?.autoClickerValue
    
  
  const auth = FIREBASE_AUTH; // to use firebase authentication to get user info
  const docRef =  doc(FIREBASE_DB, 'count', auth.currentUser?.email ) // document refrence for user data fetching and saving
  
  const saveUserName = async () => { // this gets run on when the user sets a username
    setUsername(username)
    const userNameSet = await updateDoc( docRef , { Username: username}) // makes the first document with the users email with his username
    console.log('Username Changed => ' + username)
  }

  const saveData = async () => { // saves all data when called 
    const countSet = await updateDoc( docRef , { 
      count: count, 
      autoClickerValue: auto,
      multiplier: multiplier,
      DarkSteel:  ds, 
      Attack: atk,
      Defense: def, 
      Troops: troop,
      Power: power,
    })
  }
  
  const router = useRouter();

  const signOut = () => {
    FIREBASE_AUTH.signOut()
    router.replace('/')
    console.log( auth.currentUser?.email + ' Signed Out!')
  }
  
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerTitleAlign: 'center',
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={signOut} style={{ paddingRight: wp(4)}}>
              <MaterialIcons name="logout" size={wp(7.5)} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <View>
        <Text style={{ fontWeight: '600', marginLeft: wp(1), marginVertical: hp(.25), textAlign: 'left'}}> 
          Change Username
        </Text> 
       <TextInput
          style={styles.input} 
          placeholder={username}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize='none'
          value={username}
        />
      </View>
        <TouchableOpacity  style={styles.button} onPress={() =>  saveUserName()}> 
          <Text> 
            Save Username
          </Text> 
        </TouchableOpacity>
          
        <TouchableOpacity  style={styles.button} onPress={() =>  saveData()}> 
          <Text> 
            Save Data
          </Text> 
        </TouchableOpacity>
    </View>
  )
}

export default List

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: hp(5.5),
    width: wp(80),
    borderWidth: hp(.15),
    borderRadius: hp(1),
    padding: wp(1),
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#80ff80',
    width: wp(80),
    height: hp(4.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: hp(.15),
    borderRadius: hp(1),
    marginVertical: hp(1),
  },
});