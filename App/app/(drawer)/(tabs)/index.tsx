import {  View, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig'
import {   doc,  updateDoc } from "firebase/firestore"; 
import LoadingScreen from '../../../components/THISONE/Loading'
import {  useSafeAreaInsets } from 'react-native-safe-area-context';
import { CountContext, TransmutatorContext } from '../../_layout';
import { Link, Stack,  router,  useNavigation } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import  { chain } from 'mathjs'
import DMButton from '../../../components/THISONE/DMButton';
import { StatusBar } from 'expo-status-bar';
import StatView from '../../../components/THISONE/StatView';

const Details = () => {
  // Grabs contexts to be used for states
  const countContext = React.useContext(CountContext)
  const transContext = React.useContext(TransmutatorContext)
  // all states defined by context

  const count = countContext?.count
  const setCount = countContext?.setCount

  const multiplier = countContext?.multiplier

  const autoClickerValue = countContext?.autoClickerValue

  const troop = transContext?.troops
  const def = transContext?.defense
  const atk = transContext?.attack
  const ds = transContext?.darkSteel
  const power = transContext?.power
  // all screen states
  const navigation = useNavigation();

  const [ loading, setLoading] = useState(false)
  const [ runs, setRuns ] = useState(0)
  const { top, bottom } = useSafeAreaInsets()
  // firebase variables and functions
  const auth = FIREBASE_AUTH; // to use firebase authentication to get user info
  const docRef =  doc(FIREBASE_DB, 'count', auth.currentUser?.email) // document refrence for user data fetching and saving



  const saveData = async () => { // saves all data when called (called whenever an item changes) !! ALL AUTO SAVES HAPPEN HERE !!
    const countSet = await updateDoc( docRef , { count: count, Power: power})
  }
  const setAllData = async () => {
    const setAll = await updateDoc( docRef , { 
      count: count, 
      autoClickerValue: autoClickerValue,
      multiplier: multiplier,
      DarkSteel:  ds, 
      Attack: atk,
      Defense: def, 
      Troops: troop,
      Power: power,
    })
  }

  useEffect(() => {
    router.push('/Info')
    setAllData()
  }, [])
  useEffect(() => { // every timeframe it will auto save data only when count and/or multiplier is done changeing
    let autoSave = setTimeout(() => {
      saveData();
      console.log('Auto Saved Count!')
    }, 1500)

    return () => {
      clearTimeout(autoSave);
    }
  }, [count]) 


  useEffect(() => {
    let auto = setTimeout(() => { // every second it will run the autoclicker and add to the runs state
      if (setCount && count && multiplier && autoClickerValue) {
        setCount(chain(count).add(autoClickerValue * multiplier).done())
        setRuns(runs + 1)
      } 
    }, 1000)

    if (runs === 30) { // every thirty seconds of active autoclicker it saves (to save money)
      saveData();
      setRuns(0)
    }

    return () => {
      clearTimeout(auto);
    }
  })

  return (
      <>
        { loading ? <LoadingScreen />
          :
          <LinearGradient style={styles.container}  colors={[		'#a4add3', '#705d97', '#705d97' ,'#472360','#32243d', ]}>

            <StatusBar />

            <Stack.Screen options={{
              headerTitleAlign: 'center',
              headerTintColor: 'black',
              headerTitle: '',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: '#a4add3',
              },
              headerRight: () => (
                <View style={{ width: wp(20), alignItems: 'flex-end', justifyContent: 'center', paddingRight: wp(2.5)}}> 
                  <Link href={'/Info'}>
                    <AntDesign name="infocirlceo" size={wp(6)} color="black" />
                  </Link>
                </View>
              ),
              headerLeft: () => (
                <View style={{ width: wp(20), alignItems: 'flex-start', justifyContent: 'center', paddingLeft: wp(2.5)}}> 
                  <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Feather name="menu" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              )
            }}
            />

              <StatView />
              <DMButton />


          </LinearGradient>
        }
      </>
  )
}

export default Details

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
  },
})