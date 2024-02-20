import React, { useEffect, useState } from 'react'
import Colors from '../../constants/Colors'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

/**
 * Props for the PaymentFrequency component.
 */
interface PaymentFrequencyProps {
  /**
   * Function to send data to the parent component.
   * @param val - The value to be sent to the parent component.
   */
  sendDataToParent: (val: string) => void;
  
  /**
   * Data received from the parent component.
   */
  frequencyDataToChild: string;
}

/**
 * Renders a component for selecting payment frequency.
 * @param {Object} props - The component props.
 * @param {Function} props.sendDataToParent - The function to send the selected frequency to the parent component.
 * @param {string} props.frequencyDataToChild - The selected frequency received from the parent component.
 * @returns {JSX.Element} The rendered component.
 */

const PaymentFrequency: React.FC<PaymentFrequencyProps> = ({ sendDataToParent, frequencyDataToChild}) => {

  const [expenseFrequency, setExpenseFrequency] = useState<string>('');
  
  useEffect(() => { // this sends the parent the expense freq when changed
    sendDataToParent(expenseFrequency)
  }, [expenseFrequency])
  
  useEffect(() => { // this sets the expense freq when changed by parent done on reset
    setExpenseFrequency(frequencyDataToChild)
  }, [frequencyDataToChild])

  return (
    <View style={styles.buttonRowContainer}>
        
        <Pressable style={ 
            expenseFrequency === 'Weekly' ? 
            styles.activeButton : styles.button
          } 
          onPress={() => setExpenseFrequency('Weekly')}
        >
          <Text style={ 
            expenseFrequency === 'Weekly' ? 
            styles.activeButtonText : styles.buttonText
          }>
            Weekly
          </Text>
        </Pressable>
        <Pressable style={ 
            expenseFrequency === 'Bi-Weekly' ? 
            styles.activeButton : styles.button
          } 
          onPress={() => setExpenseFrequency('Bi-Weekly')}

        >
          <Text style={ 
            expenseFrequency === 'Bi-Weekly' ? 
            styles.activeButtonText : styles.buttonText
          }>
            Bi-Weekly
          </Text>
        </Pressable>
        <Pressable style={ 
            expenseFrequency === 'Monthly' ? 
            styles.activeButton : styles.button
          } 

          onPress={() => setExpenseFrequency('Monthly')}
        >
          <Text style={ 
            expenseFrequency === 'Monthly' ? 
            styles.activeButtonText : styles.buttonText
          }>
            Monthly
          </Text>
        </Pressable>
      </View>
  )
}

export default PaymentFrequency

const styles = StyleSheet.create({
    button: {
        width: wp(25),
        height: hp(5),
        borderRadius: hp(100),
        backgroundColor: Colors.gray,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: wp(.25),
        borderColor: Colors.white60,
      },
      activeButton: {
        width: wp(25),
        height: hp(5),
        borderRadius: hp(100),
        backgroundColor: Colors.white60,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: wp(.25),
        borderColor: Colors.primary,
      },
      activeButtonText: {
        color: Colors.primary,
        fontFamily: 'Lato-Reg',
        fontSize: wp(3),
      },
      buttonRowContainer: {
        width: wp(90),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-evenly',
      },
      buttonText: {
        color: Colors.white60,
        fontFamily: 'Lato-Reg',
        fontSize: wp(3),
      }
})