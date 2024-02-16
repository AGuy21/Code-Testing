import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../constants/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface MoneyProgressBarProps {
  expenseTotal: number;
  incomeTotal: number;
  show: string;
}

/**
 * Renders a money progress bar component.
 * @param expenseTotal The total expense amount.
 * @param incomeTotal The total income amount.
 */
const MoneyProgressBar: React.FC<MoneyProgressBarProps> = ({ expenseTotal, incomeTotal, show }) => {
  // states for fixed totals so that it can be used in the progress bar
  const [fixedExpenseTotal, setFixedExpenseTotal] = useState<number>(0);
  const [fixedIncomeTotal, setFixedIncomeTotal] = useState<number>(0);
  const [ incomePrecentage, setIncomePrecentage ] = useState<number>(0);
  const [ expensePrecentage, setExpensePrecentage ] = useState<number>(0);
  
  /**
   * Calculates the percentage based on two values.
   * @param value1 The first value.
   * @param value2 The second value.
   * @returns The calculated percentage. (value 1)
   */
  function getPrecentage(value1: number, value2: number) {
    let mean = (value1 + value2) / 2
    return ((value2 / mean) * 100) /2
  }
  
  // sets fixed totals on render
  useEffect(() => {
    // checks if it is 0 and if so makes sure it doesnt divide by 0
    if (expenseTotal === 0) {
      setFixedExpenseTotal(0.01);
    } else if (incomeTotal === 0) {
      setFixedIncomeTotal(0.01);
    }

    setFixedExpenseTotal((expenseTotal / incomeTotal));
    setFixedIncomeTotal((incomeTotal / incomeTotal));

    setExpensePrecentage(getPrecentage(expenseTotal, incomeTotal))
    setIncomePrecentage(getPrecentage(incomeTotal, expenseTotal))
  }, [expenseTotal, incomeTotal]);
  
  return (
    <View style={styles.container}>  
      { show === 'All' &&
        <>
          <View style={styles.allProgressBar}>
            <View style={[styles.allIncomeIndicator, { flex: fixedIncomeTotal }]} >
              <Text>
                {expensePrecentage.toFixed(2)}%
              </Text>
            </View>
            <View style={[styles.allExpenseIndicator, { flex: fixedExpenseTotal }]} >
              <Text>
                {incomePrecentage.toFixed(2)}%
              </Text>
            </View>
          </View>

          <View style={styles.expenseTextContainer}>
            <Text style={[styles.incomeText, { flex: fixedIncomeTotal}]}>
              Income:   ${incomeTotal}
            </Text>
            <Text style={[styles.expenseText, { flex: fixedExpenseTotal}]}>
              Expenses:   ${expenseTotal}
            </Text>
          </View>
        </>
      }
    </View>
  );
};

export default MoneyProgressBar

const styles = StyleSheet.create({
  container: {
    height: hp(10),
    width: wp(95),
    backgroundColor: Colors.gray,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    borderRadius: wp(5),
    paddingHorizontal: wp(5),
    borderWidth: wp(.25),
    borderColor: Colors.primary,

  },
  allProgressBar: {
    flexDirection: 'row',
    height: hp(2.5),
  },
  allIncomeIndicator: {
    backgroundColor: 'lime',
    borderRadius: wp(5),
    alignItems: 'center',
  },
  allExpenseIndicator: {
    backgroundColor: 'yellow',
    borderRadius: wp(5),
    alignItems: 'center',
  },

  expenseTextContainer: {
    width: wp(85),
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    marginTop: hp(1),
  },
  expenseText: {
    color: 'yellow',
    fontSize: wp(3),
    fontFamily: 'Lato-Bold'
  },
  incomeText: {
    color: 'lime',
    fontSize: wp(3),
    fontFamily: 'Lato-Bold'
  },
})