import React, { useEffect, useState } from "react";

/**
 * Custom hook to calculate money bar data.
 *
 * @param expenseTotal - The total expense amount.
 * @param incomeTotal - The total income amount.
 * @returns An object containing the calculated data:
 *  - incomePrecentage: The percentage of income relative to the mean of income and expense.
 *  - expensePrecentage: The percentage of expense relative to the mean of income and expense.
 *  - fixedExpenseTotal: The fixed expense total as a ratio of expense to income.
 *  - fixedIncomeTotal: The fixed income total as a ratio of income to income.
 */

export default function useGetMoneyBarData(
  expenseTotal: number,
  incomeTotal: number
) {
  const [incomePrecentage, setIncomePrecentage] = useState<number>(0);
  const [expensePrecentage, setExpensePrecentage] = useState<number>(0);

  const [fixedExpenseTotal, setFixedExpenseTotal] = useState<number>(0);
  const [fixedIncomeTotal, setFixedIncomeTotal] = useState<number>(0);

  function getPrecentage(value1: number, value2: number) {
    let mean = (value1 + value2) / 2;
    return ((value2 / mean) * 100) / 2;
  }

  useEffect(() => {
    setExpensePrecentage(getPrecentage(expenseTotal, incomeTotal));
    setIncomePrecentage(getPrecentage(incomeTotal, expenseTotal));

    setFixedExpenseTotal(expenseTotal / incomeTotal);
    setFixedIncomeTotal(incomeTotal / incomeTotal);
  }, [expenseTotal, incomeTotal]);

  return {
    incomePrecentage,
    expensePrecentage,
    fixedExpenseTotal,
    fixedIncomeTotal,
    getPrecentage,
  };
}
