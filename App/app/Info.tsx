import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { Link, Stack, router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'; 
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Info = () => {
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <View style={{ paddingLeft: wp(3),flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: top + hp(5)}}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name='close' size={wp(7.5)} color={'white'} />
                </TouchableOpacity>
                <Text style={{ marginLeft: wp(28), fontSize: wp(5), fontWeight: 'bold', marginVertical: hp(2), color: 'white', }}>
                    Instructions
                </Text>
            </View>
            <View style={{ justifyContent: 'space-evenly', height: hp(80) }}>
                <Text style={styles.text}>
                    You can open up your navigation drawer by swiping left on your screen you can also click the toggle drawer button in the 
                    top left of your screen.
                </Text>
                <Text style={styles.text}>
                    You will be getting as much Dark Matter as possible to then convert into a 
                    highly maliable material called "Dark Steel" in the "Dark Matter Transmutator"!
                </Text>
                <Text style={styles.text}>
                    You can use your newly aquired Dark steel to create equipment for your army and space for more troops
                    then you will conquer your enemies camps and become the strongest of all!
                </Text>
                <Text style={styles.text}>
                    You can compare your dark matter amount and power with other players by going to the leaderboard and
                    checking either placements!
                </Text>
                <Text style={styles.text}>
                    You can upgrade your stats and power in the drawer navigator and
                    you can check all of your stats in your drawer view!
                </Text>
                <Text style={styles.text}>
                    !!! DATA DOES AUTOSAVE BUT TO BE COMPLETELY SURE YOU DONT LOSE SOME DATA MAKE SURE TO MANUALLY SAVE AND NOT CLOSE ABRUBTLY !!! 
                </Text>
                <Text style={styles.text}>
                    (You can do this in the profile screen at the bottom of your drawer)
                </Text>
            </View>
        </View>
    )
}

export default Info

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:  'rgba(70, 40, 60, 0.8)',
    },
    text: {
        textAlign: 'center',
        color: 'white',
    },
  })