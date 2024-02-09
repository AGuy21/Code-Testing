import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const LoadingScreen2 = () => {
    let large = wp(30) // to get desired size

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>
                Getting Character Data...
            </Text>

            <ActivityIndicator size={large} color={'#80ff80'} />
        </View>
  )
}

export default LoadingScreen2

const styles = StyleSheet.create({
    container: {
        width: wp(110),
        height: hp(110),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0d0c22',
        position: 'absolute',
    },
        mainText: {
        fontSize: hp(5.5),
        textAlign: 'center',
        marginBottom: hp(10),
        fontWeight: '600',
        color: '#80ff80'
    }
})