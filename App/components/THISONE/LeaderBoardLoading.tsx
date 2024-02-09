import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, {  FadeInLeft, LightSpeedOutRight,  } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';


const LeaderboardLoading = () => {
    let large = wp(30) // to get desired size

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#32243d'/>
            <Animated.View entering={FadeInLeft} exiting={LightSpeedOutRight}>
                <Text style={styles.mainText}>
                    Fethcing Latest Leaderboard Data...
                </Text>
            </Animated.View>

            <ActivityIndicator size={wp(30)} color={'#a4add3'} />
        </View>
  )
}

export default LeaderboardLoading

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        height: hp(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#32243d',
    },
        mainText: {
        fontSize: hp(5),
        textAlign: 'center',
        marginBottom: hp(10),
        fontWeight: '600',
        color: '#a4add3'
    }
})