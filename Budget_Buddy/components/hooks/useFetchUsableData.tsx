import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import expenseTotal from "../../components/functions/expenseTotal";
import incomeTotal from "../../components/functions/incomeTotal";
import { AppContext } from "../../app/_layout";
import calculateMontlyTotal from "../functions/calculateMontlyTotal";
import { moneyDataArrayProps } from "../../constants/types";

/**
 * Custom hook for fetching and managing usable data from Firebase.
 * This hook retrieves income and expense data for a user, converts it into usable format,
 * and provides the total expense, total income, and loading state.
 *
 * @returns An object containing incomeData, expenseData, totalExpense, totalIncome, and loading state.
 */

export default function useFetchUsableData() {
  // context states
  const appContext = React.useContext(AppContext); // This is used to refresh the screen

  const refresh = appContext?.refresh;
  const setRefresh = appContext?.setRefresh;

  const user = useUser();
  // states for hook
  const [loading, setLoading] = useState<boolean>(false);

  const [incomeData, setIncomeData] = useState<moneyDataArrayProps>([]); // This is used to make all of the user data in an object
  const [expenseData, setExpenseData] = useState<moneyDataArrayProps>([]); // This is used to make all of the user data in an object

  const [totalExpense, setTotalExpense] = useState<number>(1); // This is used to make all of the user data in an object
  const [totalIncome, setTotalIncome] = useState<number>(1); // This is used to make all of the user data in an object

  let tempIncomeData: { [key: string]: [string, number] } = {}; // This is used to make all of the user data in an object so it can be used in the leaderboard
  let tempExpenseData: { [key: string]: [string, number] } = {}; // This is used to make all of the user data in an object so it can be used in the leaderboard
  // used as refs for total data as state is not updated in time
  let incomeRef = [];
  let expenseRef = [];

  const getData = async () => {
    // gets all income data and returns it in a array
    const incomeDocRef = collection(
      FIREBASE_DB,
      "User Data",
      user.user?.emailAddresses[0]?.emailAddress,
      "Income"
    ); // document refrence for user data fetching and saving
    const incomeDocSnap = await getDocs(incomeDocRef);
    // for every doc it makes it into its own key and value in the temp income object
    incomeDocSnap.forEach((doc) => {
      tempIncomeData[doc.data()?.Name] = [
        doc.data()?.Frequency,
        doc.data()?.Amount,
      ];
    });

    // gets all expense data and returns it in a array
    const expenseDocRef = collection(
      FIREBASE_DB,
      "User Data",
      user.user?.emailAddresses[0]?.emailAddress,
      "Expense"
    ); // document refrence for user data fetching and saving
    const expenseDocSnap = await getDocs(expenseDocRef);

    expenseDocSnap.forEach((doc) => {
      tempExpenseData[doc.data()?.Name] = [
        doc.data()?.Frequency,
        doc.data()?.Amount,
      ];
    });
  };

  const convertData = () => {
    // converts all income data
    const incomeDataArray = Object.entries(tempIncomeData).map(
      ([name, data]) => ({
        name,
        frequency: data[0],
        amount: data[1],
      })
    );

    // Sort the incomeDataArray from highest calculated monthly income to lowest
    incomeDataArray.sort(
      (a, b) =>
        calculateMontlyTotal(b.amount, b.frequency) -
        calculateMontlyTotal(a.amount, a.frequency)
    );

    setIncomeData(incomeDataArray);
    incomeRef = incomeDataArray;

    // converts all expense data
    const expenseDataArray = Object.entries(tempExpenseData).map(
      ([name, data]) => ({
        name,
        frequency: data[0],
        amount: data[1],
      })
    );

    // Sort the expenseDataARray from highest calculated monthly income to lowest
    expenseDataArray.sort(
      (a, b) =>
        calculateMontlyTotal(b.amount, b.frequency) -
        calculateMontlyTotal(a.amount, a.frequency)
    );

    setExpenseData(expenseDataArray);
    expenseRef = expenseDataArray;
  };

  const getAndUseData = async () => {
    // this function gets all data and then converts it via async and awaiting data retrieval
    await getData();
    convertData();
  };

  useEffect(() => {
    if (refresh) {
      setLoading(true); // sets loading to true only if needs to get data.
      getAndUseData().then(() => {
        // gets all data and then converts it
        setTotalExpense(expenseTotal(expenseRef));
        setTotalIncome(incomeTotal(incomeRef));
        setLoading(false); // then sets loading to false
      });
      setRefresh(false);
    }
  }, [refresh]);

  return { incomeData, expenseData, totalExpense, totalIncome, loading };
}
