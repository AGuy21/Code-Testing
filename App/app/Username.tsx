import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import Animated, {  BounceInLeft, FadeInDown, FlipInXUp, useSharedValue,  } from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import { addDoc, count, doc, getDoc, setDoc } from 'firebase/firestore';
import { Slot, router } from 'expo-router';
import LoadingScreen from '../components/THISONE/Loading';
import { UserContext } from './_layout';

const UsernameEntry = () => {
  // states listed here
  const userContext = React.useContext(UserContext)
   
  const username = userContext?.username
  const setUsername = userContext?.setUsername
  
  const [ loading, setLoading] = useState(false)
  const [ dataRetrieved, setDataRetrieved] = useState(false) // to only set username when data is retrived (prevents bugs)
  const [ error, setError ] = useState(false)

  const auth = FIREBASE_AUTH; // to use firebase authentication to get user info
  const docRef =  doc(FIREBASE_DB, 'count', auth.currentUser?.email ) // document refrence for user data fetching and saving

  const saveUserName = async () => { // this gets run on when the user sets a username
    if (error) {
      return
    } else {
      const userNameSet = await setDoc( docRef , { Username: username}) // makes the first document with the users email with his username
      router.replace('/CharChoice') // when this is run goes to main page
    }
  }

  const getData = async () => { //  gets user data
    const getUserName = await getDoc( docRef).then((doc) => {
      console.log('Loading...' + loading)
      console.log('Status... ' + dataRetrieved) // to track status throughout
      console.log('Data Retrieved ' + doc.data())
      // gets username
      let time = setTimeout(() => { // sets a time frame to make sure all data is retrieved without issue
        try { // use a try anc catch as if the user has NO DATA then it will throw an error thus showing that the user has no user name which is what is run on catch
          if (doc.data().Username) {
            console.log('Has Username' + username)
            setUsername(doc.data().Username) // sets state of username so that it can be used as a global element
            setDataRetrieved(true) // to now run the rest of the functions it sets data retrieved to true
            console.log('Status... ' + dataRetrieved)
            setLoading(false)
          } else {
            console.log('No Username!') // if user has no data it will make it so nothing changes and user puts in username
            setLoading(false)
          }
          console.log('Status... ' + dataRetrieved)
        } catch (error) {
          console.log('No Username!') // if user has no data it will make it so nothing changes and user puts in username
          console.log('Status... ' + dataRetrieved)
          setLoading(false)
        }
      }, 100)
    })
  }
  
  useEffect(() => { // this runs on mount
    setLoading(true)
    console.log('getting users data')
    getData()
    console.log('Got users data')
  }, [])

  useEffect(() => { // runs everything only if data is successfully retrieved
    if (dataRetrieved) {
      console.log('Retrieved Username ' + username)
      if (username) {
        console.log('User has Username Data')
        router.replace('/CharChoice') // goes to main screen if user has username
        setLoading(false)
      }
      setLoading(false)
    }
  }, [dataRetrieved])

  useEffect(() => {
    if (username) {
      if (username?.length > 10) {
        setError(true)
      } else {
        setError(false)
      }
    }
  }, [username])
  
  return (
    <View style={styles.container}>
      { loading ? ( <LoadingScreen />
      ) : (
        <View style={styles.container}>

          <Animated.View
            entering={BounceInLeft.delay(250)}
            style={styles.inputMargins}
          >
            <Text style={{ fontWeight: '600', marginLeft: wp(1), marginVertical: hp(.25) }}> 
              Enter Username
            </Text> 
            <TextInput
              style={styles.input} 
              placeholder='Username' 
              autoCapitalize='none'
              onChangeText={(text) => setUsername(text)} 
              value={username}
            />
          </Animated.View>
          { error ? (
            <Animated.View
              entering={FlipInXUp.delay(250)}
            >
              <Text style={{ fontWeight: '600', marginLeft: wp(1), marginVertical: hp(.25), color:'red' }}>
                Username too long!
              </Text>
            </Animated.View>
          ) : (
            <Slot />
          )}
          <Animated.View
              style={styles.buttonContainer}
              entering={FadeInDown.delay(750).springify().stiffness(70).damping(5).mass(1.25).restSpeedThreshold(5).withInitialValues({ transform: [{ translateY: 35}]})}
            >
              <TouchableOpacity  style={styles.button} onPress={() =>  saveUserName()}> 
                <Text> 
                  Save Username
                </Text> 
              </TouchableOpacity>
            </Animated.View>
        </View>
      )}
    </View>
  )
}

export default UsernameEntry

const styles = StyleSheet.create({
    container: {
      marginHorizontal: wp(5),
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
    inputMargins: {
      marginVertical: hp(2),
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
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      height: hp(10),
      marginTop: hp(1)
    },
    mainText: {
      fontSize: wp(10),
      textAlign: 'center',
      marginBottom: hp(10),
      fontWeight: '600'
    },
  })