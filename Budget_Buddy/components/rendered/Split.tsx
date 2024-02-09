import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';

const Split = () => {
  return (
    <View style={styles.split}>
    <View style={styles.splitLine} />
    <Text style={styles.splitText}>
        Don't have an account?
    </Text>
    <View style={styles.splitLine} />
</View>
  )
}

export default Split

const styles = StyleSheet.create({
    split: {
        flexDirection: 'row',
        gap: wp(1),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp(4)
    },
    splitText: {
        color: Colors.primary,
        fontSize: wp(3.3),
        fontFamily: 'Lato-Light',
    },
    splitLine: {
        width: wp(20),
        height: hp(.1),
        backgroundColor: Colors.primary,
    },
})