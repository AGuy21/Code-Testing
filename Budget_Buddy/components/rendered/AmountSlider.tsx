import { StyleSheet, TextInput, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Slider from '@react-native-community/slider'
import Colors from '../../constants/Colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AmountSlider = ({sendDataToParent}) => {
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        sendDataToParent(amount)
    },[amount])
    return (
        <View style={styles.container}>

            <View style={styles.input} >
                <Text style={styles.text}>
                    $
                </Text>
                <TextInput style={styles.text}onChangeText={(text: any) => setAmount(text)} keyboardType='numeric'  >
                    {amount}
                </TextInput>
            </View>

            <Slider
                style={{width: wp(90), height: hp(3)}}
                minimumValue={10}
                maximumValue={1000}
                minimumTrackTintColor={Colors.primary}
                maximumTrackTintColor={Colors.white60}
                thumbTintColor={Colors.primary}
                step={10}
                onValueChange={(value) => setAmount(value)}
            
            />

        </View>
  )
}

export default AmountSlider

const styles = StyleSheet.create({
    input: {
        width: wp(15),
        height: hp(4),
        backgroundColor: Colors.gray,
        borderRadius: wp(100),
        display: 'flex',
        borderWidth: wp(.25),
        borderColor: Colors.white60,
        opacity: .7,
        marginTop: hp(1),
        color: Colors.primary,
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: wp(90),
        height: hp(5),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    text: {
        color: Colors.primary,
        fontSize: wp(3.5),
        fontFamily: 'Lato-Reg',
    }
})