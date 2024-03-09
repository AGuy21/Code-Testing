import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import ExpenseType from "../../components/rendered/ExpenseType";
import PaymentFrequency from "../../components/rendered/PaymentFrequency";
import AmountSlider from "../../components/rendered/AmountSlider";
import { collection, addDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { AppContext } from "../_layout";
import { useGetCreateExpenseScreenStyles } from "../../constants/styles";

/**
 * This component renders a screen for creating expenses.
 * It includes child components for selecting expense type, payment frequency, and amount.
 * The data entered by the user is submitted to the Firebase database.
 *
 * @returns {JSX.Element} The JSX element representing the CreateExpenseScreen component.
 */

function CreateExpenseScreen(): JSX.Element {
  const appContext = React.useContext(AppContext);

  const Colors = appContext?.Colors;
  const setRefresh = appContext?.setRefresh;

  const styles = useGetCreateExpenseScreenStyles(Colors);
  // states
  const [expenseType, setExpenseType] = useState<string>("");
  const [expenseFrequency, setExpenseFrequency] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [expenseName, setExpenseName] = useState<string>("");

  const handleExpenseTypeChange = (newState: string) => {
    setExpenseType(newState); // sets expense type to new state
  };

  const handlePaymentFrequencyChange = (newState: string) => {
    setExpenseFrequency(newState); // sets expense frequency to new state
  };

  const handleAmountChange = (newState: number) => {
    setAmount(newState); // sets amount to new state
  };
  // all below is used to create new sub-collection with users data
  const user = useUser();

  /**
   * Creates a new collection in the Firebase database with the user's data.
   *
   * @returns {Promise<void>} A promise that resolves when the collection is created.
   */

  const createCollection = async (): Promise<void> => {
    // creates a new collection ref with the users data
    const collectionRef = collection(
      FIREBASE_DB,
      "User Data",
      user.user?.emailAddresses[0]?.emailAddress,
      expenseType
    );
    await addDoc(collectionRef, {
      // adds doc with all needed data
      Name: expenseName,
      Frequency: expenseFrequency,
      Amount: amount,
    });
  };

  /**
   * Handles the creation of an expense.
   * - Calls the createCollection function.
   * - Sets the refresh state to true, which refreshes the screen on Home.
   * - Resets the amount to 0 when creating a new expense.
   * - Resets the expense frequency to an empty string when creating a new expense.
   * - Resets the expense name.
   */
  const handleCreateExpense = async () => {
    createCollection();
    setRefresh(true); // refreshes the screen on Home

    setAmount(0); // resets amount to 0 when creating new expense
    setExpenseFrequency(""); // resets expense frequency to empty string when creating new expense
    setExpenseName(""); // resets expense name
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Expense Tracker</Text>
      <Text style={styles.subTitleText}>Add your expenses here</Text>
      {/* When the user selects an expense type, the expense type is sent to the parent component 
      and the parent can send its data on reset for components to be synced*/}
      <ExpenseType
        sendDataToParent={handleExpenseTypeChange}
        typeDataToChild={expenseType}
      />

      <Text style={styles.mainText}>Payment Frequency</Text>

      <PaymentFrequency
        sendDataToParent={handlePaymentFrequencyChange}
        frequencyDataToChild={expenseFrequency}
      />

      <Text style={styles.mainText}>Amount</Text>

      <AmountSlider
        sendDataToParent={handleAmountChange}
        amountDataToChild={amount}
      />

      <View style={{ marginTop: hp(10) }} />

      <TextInput
        placeholder="Enter Expense Name"
        value={expenseName}
        placeholderTextColor={Colors?.primary}
        onChangeText={(text) => setExpenseName(text)}
        style={{
          textAlign: "center",
          borderWidth: 2,
          borderColor: Colors?.primary,
          width: wp(60),
          height: hp(5),
          color: Colors?.primary,
        }}
      />
      <View style={{ marginTop: hp(10) }} />

      <Button
        title="Create Expense"
        onPress={handleCreateExpense}
        color={Colors?.primary}
      />
    </View>
  );
}

export default CreateExpenseScreen;
