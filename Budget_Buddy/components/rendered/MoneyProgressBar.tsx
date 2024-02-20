import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import useGetMoneyBarData from '../hooks/useGetMoneyBarData';
import calculateMontlyTotal from '../functions/calculateMontlyTotal';

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
    fixedExpenseTotal
  } = useGetMoneyBarData(expenseTotal, incomeTotal);

  
  
  return (
    <View style={styles.container}>  
      { show === 'All' &&
        <>
          <View style={styles.allProgressBar}>
            <View style={[styles.incomeIndicator, { flex: fixedIncomeTotal }]} >
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
      { show === 'Income' &&
          <FlatList
            style={{ flexDirection: 'row', height: hp(2.5), display: 'flex', width: wp(95), maxHeight: hp(2.5)}}
            horizontal={true}
            data={incomeData.slice(0,3)}
            renderItem={({ item }) => (
                <View style={[styles.incomeIndicator, { flex: incomeTotal / calculateMontlyTotal(item.amount, item.frequency) }]} >
                  <Text>
                    {expensePrecentage.toFixed(2)}%
                  </Text>
                </View>
            )}
          />
      }
      { show === 'Expenses' &&
        <>
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
  incomeIndicator: {
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