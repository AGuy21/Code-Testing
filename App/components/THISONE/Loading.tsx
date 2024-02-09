import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const LoadingScreen = () => {
    let large = wp(30) // to get desired size

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>
                Getting User Data...
            </Text>

            <ActivityIndicator size={large} color={'#80ff80'} />
        </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        width: wp(110),
        height: hp(110),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0d0c22'
    },
        mainText: {
        fontSize: hp(6.5),
        textAlign: 'center',
        marginBottom: hp(10),
        fontWeight: '600',
        color: '#80ff80'
    }
})