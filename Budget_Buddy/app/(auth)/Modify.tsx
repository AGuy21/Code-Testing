import { View, Text } from "react-native";
import React from "react";
import ModifyDataPanel from "../../components/ui/ModifyDataPanel";
import useFetchUsableData from "../../components/hooks/useFetchUsableData";
import Loader from "../../components/ui/Loader";

export default function Modify() {
  const { incomeData, expenseData, loading, totalExpense, totalIncome } =
    useFetchUsableData({ BypassRefresh: true });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ModifyDataPanel incomeData={incomeData} expenseData={expenseData} />
        </View>
      )}
    </>
  );
}
