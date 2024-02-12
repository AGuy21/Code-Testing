import {  Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {  useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Colors from '../../constants/Colors'
import ExpenseType from '../../components/rendered/ExpenseType';
import PaymentFrequency from '../../components/rendered/PaymentFrequency';
import AmountSlider from '../../components/rendered/AmountSlider';
import { collection, doc, addDoc } from 'firebase/firestore';
import {  FIREBASE_DB } from '../../FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

const CreateExpenseScreen = () => {
  /*
    This component renders all needed child components while taking
    in the data from the child components and being able
    to reset them to 0 upon completion.
    
    This component also alows for submission of the data to the
    database when the handleCreateExpense function is called.
  */
  // states
  const [expenseType, setExpenseType] = useState('');
  const [expenseFrequency, setExpenseFrequency] = useState('');
  const [amount, setAmount] = useState(0);
  const [expenseName, setExpenseName] = useState('')

  const handleExpenseTypeChange = (newState: string) => {
    setExpenseType(newState); // sets expense type to new state
  };

  const handlePaymentFrequencyChange = (newState: string) => {
    setExpenseFrequency(newState); // sets expense frequency to new state
  };

  const handleAmountChange = (newState: number) => {
    setAmount(newState); // sets amount to new state
  }
  // all below is used to create new sub-collection with users data
  const user = useUser();
  
  const createCollection = async () => {
    // creates a new collection ref with the users data
      const collectionRef = collection(FIREBASE_DB, "User Data", user.user?.emailAddresses[0]?.emailAddress, expenseType)
      await addDoc(collectionRef, { // adds doc with all needed data
          Name: expenseName,
          Frequency: expenseFrequency,
          Amount: amount,
      })

      console.log('-----------------------------');
      console.log('     New expense created!    ');
      console.log('-----------------------------');
      console.log(' Expense Name: ', expenseName);
      console.log(' Expense type: ', expenseType);
      console.log(' Expense frequency: ', expenseFrequency);
      console.log(' Amount: ', amount);
      console.log('-----------------------------');
  }

  const handleCreateExpense = async () => {
    createCollection()

    setAmount(0); // resets amount to 0 when creating new expense
    setExpenseFrequency(''); // resets expense frequency to empty string when creating new expense
    setExpenseName('') // resets expesnse name
  }
  return (
    <View style={styles.container}>

      <Text style={styles.titleText}>
        Expense Tracker
      </Text>
      <Text style={styles.subTitleText}>
        Add your expenses here
      </Text>
      {/* When the user selects an expense type, the expense type is sent to the parent component 
      and the parent can send its data on reset for components to be synced*/}
      <ExpenseType sendDataToParent={handleExpenseTypeChange} typeDataToChild={expenseType}/> 

      <Text style={styles.mainText}>
        Payment Frequency 
      </Text>

      <PaymentFrequency sendDataToParent={handlePaymentFrequencyChange} frequencyDataToChild={expenseFrequency}/>

      <Text style={styles.mainText}>
        Amount 
      </Text>

      <AmountSlider sendDataToParent={handleAmountChange} amountDataToChild={amount}/> 
      
      <View style={{marginTop: hp(10)}}/>
      <TextInput placeholder='Enter Name' value={expenseName} placeholderTextColor={ Colors.primary} onChangeText={(text) => setExpenseName(text)} style={{ textAlign: 'center', borderWidth: 2, borderColor: Colors.primary, width: wp(25), height: hp(10), color: Colors.primary}}/>
      <View style={{marginTop: hp(10)}}/>
      <Button title='Create Expense' onPress={handleCreateExpense} color={Colors.primary}/>

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
      fontSize: wp(3.5),
      fontFamily: 'Lato-Bold',
      marginBottom: hp(3),
      textAlign: 'center',
      width: wp(80),
    },
    mainText: {
      color: Colors.white,
      fontSize: wp(3.5),
      fontFamily: 'Lato-Bold',
      marginTop: hp(3),
      marginBottom: hp(2),
      textAlign: 'left',
      width: wp(80),
      paddingLeft: wp(3),
    },
    
})