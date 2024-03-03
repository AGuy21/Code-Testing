import {TextInput, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Slider from '@react-native-community/slider'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AppContext } from '../../app/_layout';
import {useGetAmountSliderStyles } from '../../constants/styles';

/**
 * Props for the AmountSlider component.
 */
interface AmountSliderProps {
    /**
     * Function to send data to the parent component.
     * @param val The value to be sent to the parent component.
     */
    sendDataToParent: (val: number) => void;
    /**
     * The amount data passed from the parent component to the child component.
     */
    amountDataToChild: number;
}

/**
 * Represents the AmountSlider component.
 * @component
 */
const AmountSlider: React.FC<AmountSliderProps> = ({sendDataToParent, amountDataToChild}) => {
    const colorContext = React.useContext(AppContext);
    const Colors = colorContext?.Colors;
  
    const styles = useGetAmountSliderStyles(Colors);

    /**
     * Represents the current amount value.
     */
    const [amount, setAmount] = useState<number>(0);

    useEffect(() => {
        sendDataToParent(amount)
    },[amount])

    useEffect(() => { // when amount from parent is changed it syncs it here
        setAmount(amountDataToChild)
    }, [amountDataToChild])

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
                minimumTrackTintColor={Colors?.primary}
                maximumTrackTintColor={Colors?.white60}
                thumbTintColor={Colors?.primary}
                step={10}
                onValueChange={(value) => setAmount(value)}
            
            />

        </View>
  )
}

export default AmountSlider

