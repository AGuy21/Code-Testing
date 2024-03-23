import { Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import useGetMoneyBarData from "../hooks/useGetMoneyBarData";
import calculateMontlyTotal from "../functions/calculateMontlyTotal";
import getIncomeOtherTotal from "../functions/getIncomeOtherTotal";
import getExpenseOtherTotal from "../functions/getExpenseOtherTotal";
import { AppContext } from "../../app/_layout";
import { useGetMoneyProgressBarStyles } from "../../constants/styles";
import { moneyDataArrayProps } from "../../constants/types";

/**
 * Props for the MoneyProgressBar component.
 */
interface MoneyProgressBarProps {
  expenseTotal: number;
  incomeTotal: number;
  show: string;
  expenseData: moneyDataArrayProps;
  incomeData: moneyDataArrayProps;
}

/**
 * Renders the MoneyProgressBar component.
 *
 * @remarks
 * This component displays a progress bar that represents the income and expense percentages.
 *
 * @param expenseTotal - The total expense amount.
 * @param incomeTotal - The total income amount.
 * @param show - The display mode of the progress bar ('All', 'Income', 'Expenses').
 * @param expenseData - An array of expense data.
 * @param incomeData - An array of income data.
 *
 * @returns The rendered MoneyProgressBar component.
 */
const MoneyProgressBar: React.FC<MoneyProgressBarProps> = ({
  expenseTotal,
  incomeTotal,
  show,
  expenseData,
  incomeData,
}) => {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetMoneyProgressBarStyles(Colors);
  const {
    incomePrecentage,
    expensePrecentage,
    fixedIncomeTotal,
    fixedExpenseTotal,
    getPrecentage,
  } = useGetMoneyBarData(expenseTotal, incomeTotal);

  let incomeLastThreeTotal = getIncomeOtherTotal(incomeData);
  let expenseLastThreeTotal = getExpenseOtherTotal(expenseData);

  return (
    <View style={styles.container}>
      {show === "All" && (
        <>
          <View style={styles.progressBarContainer}>
            <View style={[styles.incomeIndicator, { flex: fixedIncomeTotal }]}>
              <Text style={{ color: Colors?.secondaryText }}>
                {expensePrecentage.toFixed(2)}%
              </Text>
            </View>
            <View
              style={[styles.expenseIndicator, { flex: fixedExpenseTotal }]}
            >
              <Text style={{ color: Colors?.secondaryText }}>
                {incomePrecentage.toFixed(2)}%
              </Text>
            </View>
          </View>

          <View style={styles.expenseTextContainer}>
            <Text style={[styles.incomeText, { flex: fixedIncomeTotal }]}>
              Income: ${incomeTotal}
            </Text>
            <Text style={[styles.expenseText, { flex: fixedExpenseTotal }]}>
              Expenses: ${expenseTotal}
            </Text>
          </View>
        </>
      )}
      {show === "Income" && (
        <>
          <View style={styles.progressBarContainer}>
            {incomeData.slice(0, 3).map((item, index) => (
              <View
                style={[
                  styles.incomeIndicator,
                  {
                    flex: calculateMontlyTotal(item.amount, item.frequency),
                    flexDirection: "row",
                    backgroundColor:
                      index === 0
                        ? Colors?.first
                        : index === 1
                        ? Colors?.second
                        : Colors?.third,
                  },
                ]}
                key={index}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: wp(2.5),
                    color: Colors?.secondaryText,
                  }}
                >
                  ${calculateMontlyTotal(item.amount, item.frequency)}
                </Text>
              </View>
            ))}
            {incomeData.length > 3 && (
              <View
                style={[
                  styles.incomeIndicator,
                  {
                    flex: incomeLastThreeTotal,
                    flexDirection: "row",
                    backgroundColor: Colors?.other,
                  },
                ]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: wp(2.5),
                    color: Colors?.secondaryText,
                  }}
                >
                  ${incomeLastThreeTotal}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.moneyBarTextContainer}>
            <Text style={styles.moneyBarText}>
              Income total: ${incomeTotal}
            </Text>

            <Text style={styles.moneyBarText}>
              Top 3 Total: ${incomeTotal - incomeLastThreeTotal}
            </Text>

            <Text style={styles.moneyBarText}>
              Other Total: ${incomeLastThreeTotal}
            </Text>
          </View>
        </>
      )}
      {show === "Expense" && (
        <>
          <View style={styles.progressBarContainer}>
            {expenseData.slice(0, 3).map((item, index) => (
              <View
                style={[
                  styles.expenseIndicator,
                  {
                    flex: calculateMontlyTotal(item.amount, item.frequency),
                    flexDirection: "row",
                    backgroundColor:
                      index === 0
                        ? Colors?.first
                        : index === 1
                        ? Colors?.second
                        : Colors?.third,
                  },
                ]}
                key={index}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: wp(2.5),
                    color: Colors?.secondaryText,
                  }}
                >
                  ${calculateMontlyTotal(item.amount, item.frequency)}
                </Text>
              </View>
            ))}
            {expenseData.length > 3 && (
              <View
                style={[
                  styles.expenseIndicator,
                  {
                    flex: expenseLastThreeTotal,
                    flexDirection: "row",
                    backgroundColor: Colors?.other,
                  },
                ]}
              >
                <Text
                  style={{ color: Colors?.secondaryText, fontSize: wp(2.5) }}
                >
                  ${expenseLastThreeTotal}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.moneyBarTextContainer}>
            <Text style={styles.moneyBarText}>
              Expense total: ${expenseTotal}
            </Text>

            <Text style={styles.moneyBarText}>
              Top 3 Total: ${expenseTotal - expenseLastThreeTotal}
            </Text>

            <Text style={styles.moneyBarText}>
              Other Total: ${expenseLastThreeTotal}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default MoneyProgressBar;
