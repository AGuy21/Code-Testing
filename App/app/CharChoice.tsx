import {  Text, StatusBar, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserContext } from '../../App/app/_layout';
import {  Stack, router } from 'expo-router';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import LoadingScreen2 from '../components/THISONE/LoadingChar';
import { LinearGradient } from 'expo-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { COLORS } from '../styles/COLORS';
import globalStyles from '../styles/globalStyles';

const CharChoice = () => {

    const auth = FIREBASE_AUTH; // to use firebase authentication to get user info
    const docRef =  doc(FIREBASE_DB, 'count', auth.currentUser?.email ) // document refrence for user data fetching and saving
    
    // Grabs contexts to be used for states
    const userContext = React.useContext(UserContext)

    const setCharacter = userContext?.setCharacter 
    const character: number = userContext?.character

    // all screen states
    const [ loading, setLoading] = useState(false)
    // functions used for choices
    const knightChoice = () => {
        saveCharacterData(1); // saves character data with the params 1 to show knight choice
        setCharacter(1)
        router.push('/Knight')
    }
    const asassinChoice = () => {
        saveCharacterData(2);
        setCharacter(2)
        router.push('/Assassin')
    }

    const saveCharacterData = async (data: number) => { // saves character data with a param "data" with number type
        const characterSet = await updateDoc( docRef,   { Character: data})
    }

    const getData = async () => { //  gets Character data
        const getUserName = await getDoc( docRef).then((doc) => {
          console.log('Loading...' + loading)
          // gets Character data
        if (doc.data().Character) {
            console.log('Has Character Data ' + doc.data().Character)
            setCharacter(doc.data().Character)
            router.replace('/(drawer)/(tabs)') 
        } else {
            console.log('No Character ' + doc.data().Character) // if user has no data it will make it so nothing changes and user puts in username
            setLoading(false)
        }
        })
      }

    useEffect(() => {
        setLoading(true)
        console.log('Getting Character Data')
        getData()
        console.log('Got Character Data')
    }, [])

    return (
        <>
            { loading ? ( <LoadingScreen2 />
            ) : (
                <>
                    <View>
                        <StatusBar backgroundColor={COLORS.knight} />
                        <Stack.Screen  options={{ 
                            headerTitleStyle: {
                                fontWeight:"900",
                                fontSize: wp(8)
                            },
                            headerTitle: 'Select Character',
                            headerTitleAlign: 'center',
                            headerShadowVisible: false,
                            headerTintColor: COLORS.background2,
                            headerStyle: {
                                backgroundColor: COLORS.knight,
                            } }} 
                        />
                        <LinearGradient
                            colors={[COLORS.knight, COLORS.background2, COLORS.background2, COLORS.assassin]}
                            style={globalStyles.container}
                        >
                            <View style={globalStyles.margin} />
                            <View style={globalStyles.margin} />
                            <TouchableOpacity style={globalStyles.knightSelect}
                                onPress={knightChoice}
                            >
                                <Text style={globalStyles.selectionText}> Knight </Text>
                            </TouchableOpacity>

                            <View style={{height: hp(10)}} />

                            <TouchableOpacity style={globalStyles.assassinSelect}
                                onPress={asassinChoice}
                            > 
                                <Text style={globalStyles.selectionText}> Assassin </Text>
                            </TouchableOpacity>
                            <View style={globalStyles.margin} />
                        </LinearGradient>
                    </View>
                </>
            )}
        </>
    )
}

export default CharChoice