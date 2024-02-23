import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import useGetMoneyBarData from '../hooks/useGetMoneyBarData';
import calculateMontlyTotal from '../functions/calculateMontlyTotal';
import getIncomeOtherTotal from '../functions/getIncomeOtherTotal';
import getExpenseOtherTotal from '../functions/getExpenseOtherTotal';

/**
 * Props for the MoneyProgressBar component.
 */
interface MoneyProgressBarProps {
  expenseTotal: number;
  incomeTotal: number;
  show: string;
  expenseData: any[];
  incomeData: any[];
}


const MoneyProgressBar: React.FC<MoneyProgressBarProps> = ({ expenseTotal, incomeTotal, show, expenseData, incomeData }) => {

  /**
   * Renders the MoneyProgressBar component.
   * 
   * @returns JSX.Element representing the MoneyProgressBar component.
   */
  const { 
    incomePrecentage, 
    expensePrecentage, 
    fixedIncomeTotal, 
    fixedExpenseTotal,
    getPrecentage
  } = useGetMoneyBarData(expenseTotal, incomeTotal);

  let incomeLastThreeTotal = getIncomeOtherTotal(incomeData);
  let expenseLastThreeTotal = getExpenseOtherTotal(expenseData);

  

  return (
    <View style={styles.container}>  
      { show === 'All' &&
        <>
          <View style={styles.progressBarContainer}>
            <View style={[styles.incomeIndicator, { flex: fixedIncomeTotal }]} >
              <Text>
                {expensePrecentage.toFixed(2)}%
              </Text>
            </View>
            <View style={[styles.expenseIndicator, { flex: fixedExpenseTotal }]} >
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
      {show === 'Income' && (
        <>
          <View style={styles.progressBarContainer}>
            {incomeData.slice(0, 3).map((item, index) => (
              <View style={[styles.incomeIndicator, { 
                flex: calculateMontlyTotal(item.amount, item.frequency), 
                flexDirection: 'row', 
                backgroundColor: index === 0 ? 'red' : index === 1 ? 'orange' : 'yellow'
              }]} 
                key={index}
              >
                <Text style={{textAlign: 'center', fontSize: wp(2.5)}}>
                  ${calculateMontlyTotal(item.amount, item.frequency)}
                </Text>
              </View>
            ))}
            {incomeData.length > 3 && (
            <View style={[styles.incomeIndicator, { 
              flex: incomeLastThreeTotal, flexDirection: 'row', backgroundColor: 'gray' }]}>

              <Text style={{textAlign: 'center', fontSize: wp(2.5)}}>
                ${incomeLastThreeTotal}
              </Text>
            </View>
            )}
          </View>

          <View style={styles.moneyBarTextContainer}>
            <Text style={styles.moneyBarText}>
                Income total:   ${incomeTotal} 
            </Text>

            <Text style={styles.moneyBarText}>
                Top 3 Total:   ${incomeTotal - incomeLastThreeTotal}
            </Text>

            <Text style={styles.moneyBarText}>
                Other Total:   ${incomeLastThreeTotal}
            </Text>
          </View>
        </>
      )}
      { show === 'Expenses' && (
        <>
          <View style={styles.progressBarContainer}>
            {expenseData.slice(0, 3).map((item, index) => (
              <View style={[styles.expenseIndicator, { 
                flex: calculateMontlyTotal(item.amount, item.frequency), 
                flexDirection: 'row', 
                backgroundColor: index === 0 ? 'red' : index === 1 ? 'orange' : 'yellow'
              }]} 
                key={index}
              >
              <Text style={{textAlign: 'center', fontSize: wp(2.5)}}>
                  ${calculateMontlyTotal(item.amount, item.frequency)}
                </Text>
              </View>
            ))}
            {expenseData.length > 3 && (
            <View style={[styles.expenseIndicator, { 
              flex: expenseLastThreeTotal, flexDirection: 'row', backgroundColor: 'gray' }]}>
              <Text style={{ color: Colors.white, fontSize: wp(2.5)}}>
                Other: ${expenseLastThreeTotal}
              </Text>
            </View>
            )}
          </View>
          
          <View style={styles.moneyBarTextContainer}>
            <Text style={styles.moneyBarText}>
                Expense total:   ${expenseTotal} 
            </Text>

            <Text style={styles.moneyBarText}>
                Top 3 Total:   ${expenseTotal - expenseLastThreeTotal}
            </Text>

            <Text style={styles.moneyBarText}>
                Other Total:   ${expenseLastThreeTotal}
            </Text>
          </View>
        </>
      )}
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
  progressBarContainer: {
    flexDirection: 'row',
    height: hp(2.5),
  },
  incomeIndicator: {
    display: 'flex',
    backgroundColor: 'lime',
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  expenseIndicator: {
    display: 'flex',
    backgroundColor: 'yellow',
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
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
  moneyBarTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: wp(85),
  },
  moneyBarText: {
    color: Colors.primary,
    fontSize: wp(2.5),
    fontFamily: 'Lato-Reg'
  }
})