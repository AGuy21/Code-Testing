import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { CountContext } from "../../app/_layout";
import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function DMButton() {

    const countContext = React.useContext(CountContext)


    const increment = countContext?.countIncrement


    return (
        <TouchableOpacity onPress={increment} style={{ width: wp(100), alignItems: 'center'}}>
            <View style={{ borderColor: '#444444', borderWidth: wp(2), height: hp(18), width: wp(90), borderRadius: wp(8), }}> 
                <LinearGradient colors={['#32243d','#472360', '#32243d']} style={{ borderRadius: wp(6), height: hp(16), width: wp(86), alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                    <Image source={require('../../assets/images/ROThumb_DarkMatter.webp')} style={{ height: hp(5), width: hp(5)}}/>
                        <Text style={{ fontSize: wp(4.5), color: '#a4add3', textAlign: 'center'}}>
                            Press For Dark Matter
                        </Text>
                    <Image source={require('../../assets/images/ROThumb_DarkMatter.webp')} style={{ height: hp(5), width: hp(5)}}/>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    )
}