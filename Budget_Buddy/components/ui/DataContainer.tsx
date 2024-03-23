import { Text, View, ScrollView, FlatList } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";
import Loader from "./Loader";
import { AppContext } from "../../app/_layout";
import { useGetDataContainerStyles } from "../../constants/styles";
import calculateMontlyTotal from "../functions/calculateMontlyTotal";
import { moneyDataArrayProps } from "../../constants/types";

/**
 * Props for the DataContainer component.
 */

type DataContainerPropTypes = {
  show: string;
  incomeData: moneyDataArrayProps;
  expenseData: moneyDataArrayProps;
  loading: boolean;
};
/**
 * Renders a container component that displays income or expense data based on the selected show prop.
 *
 * @component
 * @param {string} show - The selected show prop, which determines whether to display income or expense data.
 * @param {array} incomeData - The array of income data to be displayed.
 * @param {array} expenseData - The array of expense data to be displayed.
 * @param {boolean} loading - A boolean value indicating whether the data is currently loading.
 * @returns {JSX.Element} The rendered DataContainer component.
 */

const DataContainer = ({
  show,
  incomeData,
  expenseData,
  loading,
}: DataContainerPropTypes): JSX.Element => {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetDataContainerStyles(Colors);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingDataContainer}>
          <Loader />
        </View>
      ) : (
        <>
          {show === "Income" && (
            <ScrollView
              style={styles.dataContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Income Data  */}
              <FlatList
                scrollEnabled={false}
                data={incomeData}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.expenseTextRow}>
                    {/*The first 3 items of the array will be color identified for progress bar*/}
                    <Entypo
                      name="dot-single"
                      size={wp(8)}
                      color={
                        item.name === incomeData[0].name
                          ? Colors?.first
                          : item.name === incomeData[1].name
                          ? Colors?.second
                          : item.name === incomeData[2].name
                          ? Colors?.third
                          : Colors?.other
                      }
                    />
                    <Text
                      style={[
                        styles.dataText,
                        {
                          color:
                            item.name === incomeData[0].name
                              ? Colors?.first
                              : item.name === incomeData[1].name
                              ? Colors?.second
                              : item.name === incomeData[2].name
                              ? Colors?.third
                              : Colors?.text,
                        },
                      ]}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        styles.dataText,
                        {
                          color:
                            item.frequency === "Monthly"
                              ? Colors?.monthly
                              : item.frequency === "Bi-Weekly"
                              ? Colors?.bi_weekly
                              : Colors?.weekly,
                        },
                      ]}
                    >
                      {item.frequency}
                    </Text>
                    <Text style={styles.dataText}>${item.amount}</Text>
                    <Text style={[styles.dataText, { color: Colors?.income }]}>
                      ${calculateMontlyTotal(item.amount, item.frequency)}
                    </Text>
                  </View>
                )}
              />
            </ScrollView>
          )}
          {show === "Expense" && (
            <ScrollView
              style={styles.dataContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Expense Data  */}
              <FlatList
                scrollEnabled={false}
                data={expenseData}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.expenseTextRow}>
                    {/*The first 3 items of the array will be color identified for progress bar*/}
                    <Entypo
                      name="dot-single"
                      size={wp(8)}
                      color={
                        item.name === expenseData[0].name
                          ? Colors?.first
                          : item.name === expenseData[1].name
                          ? Colors?.second
                          : item.name === expenseData[2].name
                          ? Colors?.third
                          : Colors?.other
                      }
                    />
                    <Text
                      style={[
                        styles.dataText,
                        {
                          color:
                            item.name === expenseData[0].name
                              ? Colors?.first
                              : item.name === expenseData[1].name
                              ? Colors?.second
                              : item.name === expenseData[2].name
                              ? Colors?.third
                              : Colors?.text,
                        },
                      ]}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        styles.dataText,
                        {
                          color:
                            item.frequency === "Monthly"
                              ? Colors?.monthly
                              : item.frequency === "Bi-Weekly"
                              ? Colors?.bi_weekly
                              : Colors?.weekly,
                        },
                      ]}
                    >
                      {item.frequency}
                    </Text>
                    <Text style={styles.dataText}>${item.amount}</Text>
                    <Text style={[styles.dataText, { color: Colors?.expense }]}>
                      ${calculateMontlyTotal(item.amount, item.frequency)}
                    </Text>
                  </View>
                )}
              />
            </ScrollView>
          )}
          {show === "All" && (
            <ScrollView
              style={styles.dataContainer}
              showsVerticalScrollIndicator={false}
            >
              {loading && (
                <View style={styles.loadingDataContainer}>
                  <Loader />
                </View>
              )}
              {/* Income Data  */}
              <FlatList
                scrollEnabled={false}
                data={incomeData}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.expenseTextRow}>
                    <Entypo
                      name="dot-single"
                      size={wp(8)}
                      color={Colors?.income}
                    />
                    <Text style={styles.dataText}>{item.name}</Text>
                    <Text
                      style={[
                        styles.dataText,
                        {
                          color:
                            item.frequency === "Monthly"
                              ? Colors?.monthly
                              : item.frequency === "Bi-Weekly"
                              ? Colors?.bi_weekly
                              : Colors?.weekly,
                        },
                      ]}
                    >
                      {item.frequency}
                    </Text>
                    <Text style={styles.dataText}>${item.amount}</Text>
                    <Text style={[styles.dataText, { color: Colors?.income }]}>
                      ${calculateMontlyTotal(item.amount, item.frequency)}
                    </Text>
                  </View>
                )}
              />
              {/* Expense Data  */}
              <FlatList
                scrollEnabled={false}
                data={expenseData}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.expenseTextRow}>
                    <Entypo
                      name="dot-single"
                      size={wp(8)}
                      color={Colors?.expense}
                    />
                    <Text style={styles.dataText}>{item.name}</Text>
                    <Text
                      style={[
                        styles.dataText,
                        {
                          color:
                            item.frequency === "Monthly"
                              ? Colors?.monthly
                              : item.frequency === "Bi-Weekly"
                              ? Colors?.bi_weekly
                              : Colors?.weekly,
                        },
                      ]}
                    >
                      {item.frequency}
                    </Text>
                    <Text style={styles.dataText}>${item.amount}</Text>
                    <Text style={[styles.dataText, { color: Colors?.expense }]}>
                      ${calculateMontlyTotal(item.amount, item.frequency)}
                    </Text>
                  </View>
                )}
              />
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default DataContainer;
