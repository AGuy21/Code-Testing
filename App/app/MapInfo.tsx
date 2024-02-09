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
            <Stack.Screen  options={{
                headerShown: false,
            }}
            />
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
                    You won't be able to see most of the map as we aren't close enough to spot where their camps are and there power! So 
                    you will need to take over the camps to see how many camps we need to capture!
                </Text>
                <Text style={styles.text}>
                    Your base will also be on the map and will have the first camp you will take over closest to you!
                    it will also show your power so you can gague if you want to strike or not!
                </Text>
                <Text style={styles.text}>
                    You can navigate by swiping left or right on the screen. You will be using this to find enemy camps to conquer!
                </Text>
                <Text style={styles.text}>
                    When you take over camps make sure you have the correct power or you could lose some if not all of your troops!
                </Text>
                <Text style={styles.text}>
                    You will win by capturing the enemies main hideout! Best of luck to you leader!
                </Text>
            </View>
        </View>
    )
}

export default Info

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:  'rgba(70, 40, 60, 0.5)',
    },
    text: {
        textAlign: 'center',
        color: 'white',
    },
  })