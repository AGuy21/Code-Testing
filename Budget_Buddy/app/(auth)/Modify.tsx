import { View, Text } from "react-native";
import React, { useState } from "react";
import ModifyDataPanel from "../../components/ui/ModifyDataPanel";
import useFetchUsableData from "../../components/hooks/useFetchUsableData";
import Loader from "../../components/ui/Loader";
import { AppContext } from "../_layout";
import { useGetModifyScreenStyles } from "../../constants/styles";
import FilterButtonRow from "../../components/ui/FilterButtonRow";

/**
 * Represents the ModifyScreen component.
 * This component is responsible for rendering the modify screen of the Budget Buddy app.
 */
export default function ModifyScreen() {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;
  const styles = useGetModifyScreenStyles(Colors);
  
  // Fetching income and expense data using a custom hook
  const { incomeData, expenseData, loading } = useFetchUsableData({
    BypassRefresh: true,
  });

  const [show, setShow] = useState<string>("All");

  /**
   * Handles the change in the "show" state.
   * @param show - The new value for the "show" state.
   */
  const handleShowChange = (show: string) => {
    setShow(show);
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Loader />
        </View>
      ) : (
        <View style={styles.container}>
          <FilterButtonRow sendDataToParent={handleShowChange} />
          <Text style={styles.title}> Click on expense to modify </Text>
          <ModifyDataPanel
            incomeData={incomeData}
            expenseData={expenseData}
            show={show}
          />
        </View>
      )}
    </>
  );
}
