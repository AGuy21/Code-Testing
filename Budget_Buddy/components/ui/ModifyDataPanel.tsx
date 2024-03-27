import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { moneyDataArrayProps } from "../../constants/types";
import FilterButtonRow from "./FilterButtonRow";
import ModifyDataButton from "./ModifyDataButton";

interface ModifyDataPanelProps {
  incomeData: moneyDataArrayProps;
  expenseData: moneyDataArrayProps;
}

export default function ModifyDataPanel({
  incomeData,
  expenseData,
}: ModifyDataPanelProps): JSX.Element {
  const [show, setShow] = useState<string>("All");

  const handleShowChange = (show: string) => {
    setShow(show);
  };
  return (
    <View>
      <FilterButtonRow sendDataToParent={handleShowChange} />
      {show === "Income" && (
        <FlatList
          data={incomeData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <ModifyDataButton 
                id={item.id}
                name={item.name}
                frequency={item.frequency}
                amount={item.amount}
                type={"Income"}
              />
            </View>
          )}
        />
      )}
      {show === "Expense" && (
        <FlatList
          data={expenseData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <ModifyDataButton 
                id={item.id}
                name={item.name}
                frequency={item.frequency}
                amount={item.amount}
                type={"Expense"}
              />
            </View>
          )}
        />
      )}
      {show === "All" && (
        <>
          <FlatList
            data={incomeData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <ModifyDataButton 
                id={item.id}
                name={item.name}
                frequency={item.frequency}
                amount={item.amount}
                type={"Income"}
              />
              </View>
            )}
          />
          <FlatList
            data={expenseData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <ModifyDataButton 
                id={item.id}
                name={item.name}
                frequency={item.frequency}
                amount={item.amount}
                type={"Expense"}
              />
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}
