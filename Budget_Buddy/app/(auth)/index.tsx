import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  View,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import ExpenseType from "../../components/ui/ExpenseType";
import PaymentFrequency from "../../components/ui/PaymentFrequency";
import AmountSlider from "../../components/ui/AmountSlider";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);

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
   * - Checks if the user has selected an expense type, payment frequency, and amount.
   * - Calls the createCollection function.
   * - Sets the refresh state to true, which refreshes the screen on Home.
   * - Resets the amount to 0 when creating a new expense.
   * - Resets the expense frequency to an empty string when creating a new expense.
   * - Resets the expense name.
   */
  const handleCreateExpense = async () => {
    setLoading(true); // sets loading to true
    if (expenseType === "") {
      alert("Please select an expense type");
      setLoading(false);
      return;
    }
    if (expenseFrequency === "") {
      alert("Please select a payment frequency");
      setLoading(false);
      return;
    }
    if (amount === 0) {
      alert("Please select an amount");
      setLoading(false);
      return;
    }
    if (expenseName === "") {
      alert("Please enter an expense name");
      setLoading(false);
      return;
    }
    if (expenseName.length > 25) {
      alert("Please enter an expense name with less than 25 characters");
      setLoading(false);
      return;
    }
    await createCollection();
    setRefresh(true); // refreshes the screen on Home
    setAmount(0); // resets amount to 0 when creating new expense
    setExpenseFrequency(""); // resets expense frequency to empty string when creating new expense
    setExpenseName(""); // resets expense name
    setLoading(false); // sets loading to false
    setComplete(true); // sets complete to true
    let duration = setTimeout(() => {
      setComplete(false);
    }, 2000);
  };
  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors?.primary} />
          <Text style={styles.titleText}>Creating Expense...</Text>
        </View>
      ) : (
        <>
          {complete ? (
            <>
              <ImageBackground
                source={require("../../assets/gifs/Completed-Background-Gif.gif")}
                style={{
                  width: wp(100),
                  height: hp(100),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.titleText}>Expense Created!</Text>
              </ImageBackground>
            </>
          ) : (
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
                  borderBottomWidth: 2,
                  borderBottomColor: Colors?.primary,
                  width: wp(40),
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
          )}
        </>
      )}
    </>
  );
}

export default CreateExpenseScreen;
