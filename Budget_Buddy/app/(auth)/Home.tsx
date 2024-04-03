import { View, Text } from "react-native";
import React, { useState } from "react";
import DataContainer from "../../components/ui/DataContainer";
import MoneyProgressBar from "../../components/ui/MoneyProgressBar";
import useFetchUsableData from "../../components/hooks/useFetchUsableData";
import FilterButtonRow from "../../components/ui/FilterButtonRow";
import { useGetHomeStyles } from "../../constants/styles";
import { AppContext } from "../_layout";
import DataContainerHeader from "../../components/ui/DataContainerHeader";
/**
 * Renders the Home component.
 *
 * @returns JSX.Element
 */
export default function Home() {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetHomeStyles(Colors);

  const [show, setShow] = useState<string>("All");

  /**
   * Handles the change of the show state.
   * @param {string} show - The new value for the show state.
   */

  const handleShowChange = (show: string) => {
    setShow(show);
  };

  const { incomeData, expenseData, loading, totalExpense, totalIncome } =
    useFetchUsableData({ BypassRefresh: false });

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <FilterButtonRow sendDataToParent={handleShowChange} />
        <MoneyProgressBar
          expenseTotal={totalExpense || 1}
          incomeTotal={totalIncome || 1}
          show={show}
          incomeData={incomeData}
          expenseData={expenseData}
        />
      </View>

      <View style={styles.endContainer}>
        <DataContainerHeader />
        <DataContainer
          show={show}
          expenseData={expenseData}
          incomeData={incomeData}
          loading={loading}
        />
      </View>
    </View>
  );
}
