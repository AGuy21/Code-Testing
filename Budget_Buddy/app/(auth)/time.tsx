import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { DataContext } from "./_layout";
import calculateGoalArrival from "../../components/functions/calculateGoalArrival";

/**
 * Represents a component that displays the goal arrival information based on income and expense data.
 */
const Time = () => {
  // This will get the data from the data context
  const data = React.useContext(DataContext);
  const { incomeData, expenseData, totalExpense, totalIncome } = data;
  const [goalArrival, setGoalArrival] = useState<string>();

  useEffect(() => {
    setGoalArrival(calculateGoalArrival({ incomeData, expenseData, goal: 680, totalExpense, totalIncome}));
    console.log(goalArrival);
  }, []);

  return (
    <View>
      <Text>{goalArrival}</Text>
    </View>
  );
};

export default Time;
