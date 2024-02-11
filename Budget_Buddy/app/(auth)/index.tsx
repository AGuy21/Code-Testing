import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Colors from '../../constants/Colors'
import ExpenseType from '../../components/rendered/ExpenseType';

const CreateExpenseScreen = () => {

  const [expenseType, setExpenseType] = useState('');

  const handleChildStateChange = (newState: string) => {
    setExpenseType(newState); // sets expense type to new state
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titleText}>
        Add A Expense
      </Text>
      <Text style={styles.subTitleText}>
        Add a new income source, expense, or budget!
      </Text>

      {/* When the user selects an expense type, the expense type is sent to the parent component */}
      <ExpenseType onStateChange={handleChildStateChange} />

      <Text style={styles.subTitleText}>
        Payment Frequency
      </Text>
    </View>
  )
}

export default CreateExpenseScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      color: Colors.white,
      fontSize: wp(6), 
      fontFamily: 'Lato-Bold',
      marginBottom: hp(2),
    },
    subTitleText: {
      color: Colors.white,
      fontSize: wp(4),
      fontFamily: 'Lato-Reg',
      marginBottom: hp(2),
    },

})