import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { moneyDataArrayProps } from "../../constants/types";
import moment from "moment";

export default function calculateGoalArrival({
  incomeData,
  expenseData,
  goal,
  totalExpense,
  totalIncome,
}: {
  incomeData: moneyDataArrayProps;
  expenseData: moneyDataArrayProps;
  goal: number;
  totalExpense: number;
  totalIncome: number;
}) {
  // Calculate the total disposable income per month
  let monthlyDisposable = totalIncome - totalExpense;
  let biWeeklyDisposable = 0;
  let weeklyDisposable = 0;
  let totalMonths = 0;
  let totalWeeks = 0;
  // This will sort through the income data and find the bi-weekly disposable income by
  // adding the bi-weekly income and doubling the weekly income
  function findBiWeeklyDisposable() {
    incomeData.forEach((data) => {
      if (data.frequency === "bi-weekly") {
        biWeeklyDisposable += data.amount;
      } else if (data.frequency === "weekly") {
        biWeeklyDisposable += data.amount * 2;
      }
    });
    expenseData.forEach((data) => {
      if (data.frequency === "bi-weekly") {
        biWeeklyDisposable -= data.amount;
      } else if (data.frequency === "weekly") {
        biWeeklyDisposable -= data.amount * 2;
      }
    });
  }
  // This will sort through the income data and find the weekly disposable income
  // by adding the weekly income per weekly frequency item
  function findWeeklyDisposable() {
    incomeData.forEach((data) => {
      if (data.frequency === "weekly") {
        weeklyDisposable += data.amount;
      }
    });
    expenseData.forEach((data) => {
      if (data.frequency === "weekly") {
        weeklyDisposable -= data.amount;
      }
    });
  }
  function findPrecise() {}
  // when called it will format and add all the time needed and then return it as a string to the uer
  function completeFunction() {
    let arrivalTime: string = moment().add(totalMonths, "months").add(totalWeeks, "weeks").format("MMMM Do YYYY");
    console.log(arrivalTime);
    return arrivalTime;
  }

  if (monthlyDisposable === goal) {
    totalMonths += 1;
    return completeFunction();
  } else {
    return "You will never reach your goal";
  }

}
