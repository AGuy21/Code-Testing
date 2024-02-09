import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { CountContext, TransmutatorContext, UserContext } from '../_layout'
import { doc, updateDoc } from 'firebase/firestore'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { Drawer } from 'expo-router/drawer'
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Transmutator = () => {
    const { top, bottom } = useSafeAreaInsets()
  // variables listed here
    const auth = FIREBASE_AUTH; // to use firebase authentication to get user info
    const docRef =  doc(FIREBASE_DB, 'count', auth.currentUser?.email) // document refrence for user data fetching and saving
    
    // contexts listed here
    const transContext = React.useContext(TransmutatorContext)
    const userContext = React.useContext(UserContext)
    const countContext = React.useContext(CountContext)
    // context states
    const count = countContext?.count
    const choice = userContext?.character

    const ds = transContext?.darkSteel
    const atk = transContext?.attack
    const def = transContext?.defense
    const troop = transContext?.troops
    const power = transContext?.power
    // context functions
    const dsUpg1 = transContext?.convert1
    const dsUpg2 = transContext?.convert2
    const dsUpg3 = transContext?.convert3
    const dsUpg4 = transContext?.convert4
    const dsUpg5 = transContext?.convert5
    
    const atkUpg1 = transContext?.smallAttackUPG
    const atkUpg2 = transContext?.bigAttackUPG
    const defUpg1 = transContext?.smallDefenseUPG
    const defUpg2 = transContext?.bigDefenseUPG
    const troopUPG = transContext?.troopUPG
    

    const saveData = async () => { // saves all data when called (called whenever an upgrade happens)
        const upgradeSet = await updateDoc( docRef , { 
            DarkSteel:  ds, 
            Attack: atk,
            Defense: def, 
            Troops: troop,
            Power: power,
            count: count,
        })
      }

    useEffect(() => { // every upgrade it will save all data to make sure no data loss happens on purchuses
        saveData();
        console.log('Saved Upgrade Data!')
      }, [ds , atk, def, troop]) 

  return (
    <View style={styles.container}>
      <Drawer.Screen options={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#a4add3'
        },
      }}/>
      <LinearGradient colors={[ '#a4add3', '#472360', '#32243d', '#32243d']}>
        <View style={styles.textContaner}>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: wp(100)}}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../../assets/images/ROThumb_DarkMatter.webp')} style={{ height: hp(5), width: hp(5)}} />
              <Text style={styles.formulaTextStyle}>
                : {count}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../../assets/images/DarkSteel.png')} style={{ height: hp(6), width: hp(6)}} />
              <Text style={styles.formulaTextStyle}>
                : {ds}
              </Text>
            </View>
          </View>

          <Text style={styles.formulaTextStyle}>
            {def} + {atk} * {troop} = {power}
          </Text>

          <Text>
            
          </Text>
          

        </View>
        <View style={styles.shopRowContainer}>
          <View style={styles.buttonRowContainer}>
            <TouchableOpacity style={styles.button1} onPress={dsUpg1}>
              <Text style={styles.priceText1}>
                100   =&gt;   1
              </Text>
              <View style={styles.buttonInnerImageContainer}>
                <Image source={require('../../assets/images/ROThumb_DarkMatter.webp')} style={{ height: hp(4), width: hp(4)}} />
                <Image source={require('../../assets/images/Gradient_Arrow.png')} style={{ height: hp(5), width: hp(5)}} />
                <Image source={require('../../assets/images/DarkSteel.png')} style={{ height: hp(6), width: hp(6)}} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1} onPress={atkUpg1}>
              <Text style={styles.priceText1}>
                50 =&gt; 1
              </Text>
              <View style={styles.buttonInnerImageContainer}>
                <Image source={require('../../assets/images/DarkSteel.png')} style={{ height: hp(6), width: hp(6)}} />
                <Image source={require('../../assets/images/Gradient_Arrow.png')} style={{ height: hp(5), width: hp(5)}} />
                  {/*So that when the player is knight they get their respective image */}
                { choice === 1 ? ( 
                  <Image source={require('../../assets/images/Norm_Sword.png')} style={{ height: hp(5.5), width: hp(5.5)}} />
                ) : (
                  <Image source={require('../../assets/images/Norm_Dagger.png')} style={{ height: hp(6), width: hp(6)}} />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRowContainer}>

            <TouchableOpacity style={styles.button1} onPress={dsUpg2}>
              <Text style={styles.priceText1}>
                1000   =&gt;   10
              </Text>
              <View style={styles.buttonInnerImageContainer}>
                <Image source={require('../../assets/images/ROThumb_DarkMatter.webp')} style={{ height: hp(4), width: hp(4)}} />
                <Image source={require('../../assets/images/Gradient_Arrow.png')} style={{ height: hp(5), width: hp(5)}} />
                <Image source={require('../../assets/images/DarkSteel.png')} style={{ height: hp(6), width: hp(6)}} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1} onPress={atkUpg2}>
              <Text style={styles.priceText1}>
                500   =&gt;   12
              </Text>
              <View style={styles.buttonInnerImageContainer}>
              <Image source={require('../../assets/images/DarkSteel.png')} style={{ height: hp(6), width: hp(6)}} />
                <Image source={require('../../assets/images/Gradient_Arrow.png')} style={{ height: hp(5), width: hp(5)}} />
                  {/*So that when the player is knight they get their respective image */}
                { choice === 1 ? ( 
                  <Image source={require('../../assets/images/UPG_Sword.png')} style={{ height: hp(6), width: hp(6)}} />
                ) : (
                  <Image source={require('../../assets/images/UPG_Dagger.png')} style={{ height: hp(6), width: hp(6)}} />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRowContainer}>

            <TouchableOpacity style={styles.button2} onPress={dsUpg3}>
              <Text style={styles.priceText2}>
                10000   =&gt;   100
              </Text>
              <View style={styles.buttonInnerImageContainer}>
                <Image source={require('../../assets/images/ROThumb_DarkMatter.webp')} style={{ height: hp(4), width: hp(4)}} />
                <Image source={require('../../assets/images/Gradient_Arrow.png')} style={{ height: hp(5), width: hp(5)}} />
                <Image source={require('../../assets/images/DarkSteel.png')} style={{ height: hp(6), width: hp(6)}} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={defUpg1}>
              <Text style={styles.priceText2}>
                50   =&gt;   1
              </Text>
              <View style={styles.buttonInnerImageContainer}>
                <Image source={require('../../assets/images/DarkSteel.png')} style={{ height: hp(6), width: hp(6)}} />
                  <Image source={require('../../assets/images/Gradient_Arrow.png')} style={{ height: hp(5), width: hp(5)}} />
                    {/*So that when the player is knight they get their respective image */}
                  { choice === 1 ? ( 
                    <Image source={require('../../assets/images/Norm_Sheild.png')} style={{ height: hp(5), width: hp(5)}} />
                  ) : (
                    <Image source={require('../../assets/images/Norm_Bow.png')} style={{ height: hp(6), width: hp(6)}} />
                  )}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRowContainer}>

            <TouchableOpacity style={styles.button3} onPress={dsUpg4}>
              <Text style={styles.priceText3}>
                50000   =&gt;   500
              </Text>
              <View style={styles.buttonInnerImageContainer}>
                <Image source={require('../../assets/images/ROThumb_DarkMatter.webp')} style={{ height: hp(4), width: hp(4)}} />
                <Image source={require('../../assets/images/Gradient_Arrow.png')} style={{ height: hp(5), width: hp(5)}} />
                <Image source={require('../../assets/images/DarkSteel.png')} style={{ height: hp(6), width: hp(6)}} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3}onPress={defUpg2}>
              <Text style={styles.priceText3}>
                500   =&gt;   12
              </Text>
              <View style={styles.buttonInnerImageContainer}>
                <Image source={require('../../assets/images/DarkSteel.png')} style={{ height: hp(6), width: hp(6)}} />
                  <Image source={require('../../assets/images/Gradient_Arrow.png')} style={{ height: hp(5), width: hp(5)}} />
                    {/*So that when the player is knight they get their respective image */}
                  { choice === 1 ? ( 
                    <Image source={require('../../assets/images/UPG_Sheild.png')} style={{ height: hp(6), width: hp(6)}} />
                  ) : (
                    <Image source={require('../../assets/images/UPG_Bow.png')} style={{ height: hp(6), width: hp(6)}} />
                  )}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRowContainer}>
            <TouchableOpacity style={styles.button3} onPress={dsUpg5}>
              <Text style={styles.priceText3}>
                100000   =&gt;   1000
              </Text>
              <View style={styles.buttonInnerImageContainer}>
                <Image source={require('../../assets/images/ROThumb_DarkMatter.webp')} style={{ height: hp(4), width: hp(4)}} />
                <Image source={require('../../assets/images/Gradient_Arrow.png')} style={{ height: hp(5), width: hp(5)}} />
                <Image source={require('../../assets/images/DarkSteel.png')} style={{ height: hp(6), width: hp(6)}} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3} onPress={troopUPG}>
              <Text style={styles.priceText3}>
                1000   =&gt;   1
              </Text>
              <View style={styles.buttonInnerImageContainer}>
                <Image source={require('../../assets/images/DarkSteel.png')} style={{ height: hp(6), width: hp(6)}} />
                  <Image source={require('../../assets/images/Gradient_Arrow.png')} style={{ height: hp(5), width: hp(5)}} />
                    {/*So that when the player is knight they get their respective image */}
                  { choice === 1 ? ( 
                    <AntDesign name="adduser" size={wp(6)} color="red" />
                  ) : (
                    <AntDesign name="adduser" size={wp(6)} color="lime" />
                  )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

export default Transmutator

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center'
  },
  textContaner: {
    height: hp(15),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width:  wp(100),
  },
  button1: {
    width: wp(45),
    height: hp(10),
    backgroundColor: '#32243d',
    borderColor: '#444444',
    borderWidth: wp(1.5),
    borderRadius: wp(6),
    color: '	#a4add3',

  },
  button2: {
    width: wp(45),
    height: hp(10),
    backgroundColor: '#472360',
    borderColor: '#444444',
    borderWidth: wp(1.5),
    borderRadius: wp(6),
    color: '#705d97'
  },
  button3: {
    width: wp(45),
    height: hp(10),
    backgroundColor: '#a4add3',
    borderColor: '#444444',
    borderWidth: wp(1.5),
    borderRadius: wp(6),
    color: '#32243d',

  },
  shopRowContainer: {
    justifyContent: 'space-evenly',
    height: hp(80),
  },

  priceText1: {
    borderBottomColor: '#a4add3',
    borderBottomWidth: wp(1),
    borderStyle: 'dashed',
    textAlign: 'center',
    color: '#a4add3',
  },
  priceText2: {
    borderBottomColor: '#705d97',
    borderBottomWidth: wp(1),
    borderStyle: 'dashed',
    textAlign: 'center',
    color: '#705d97',
  },
  priceText3: {
    borderBottomColor: '#32243d',
    borderBottomWidth: wp(1),
    borderStyle: 'dashed',
    textAlign: 'center',
    color: '#32243d',
  },
  buttonInnerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp(6),
  },
  formulaTextStyle: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: '#705d97',
  }
})