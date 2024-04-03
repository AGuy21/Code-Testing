import { View, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { moneyDataArrayProps } from "../../constants/types";
import ModifyDataButton from "./ModifyDataButton";
import { AppContext } from "../../app/_layout";
import { useGetModifyPanelStyles } from "../../constants/styles";

interface ModifyDataPanelProps {
  incomeData: moneyDataArrayProps;
  expenseData: moneyDataArrayProps;
  show: string;
}

export default function ModifyDataPanel({
  incomeData,
  expenseData,
  show,
}: ModifyDataPanelProps): JSX.Element {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;
  const styles = useGetModifyPanelStyles(Colors);
  return (
    <View style={styles.container}>
      {show === "Income" && (
        <View style={styles.container}>
          <FlatList
            data={incomeData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ScrollView showsVerticalScrollIndicator={false}>
                <ModifyDataButton
                  id={item.id}
                  name={item.name}
                  frequency={item.frequency}
                  amount={item.amount}
                  type={"Income"}
                />
              </ScrollView>
            )}
          />
        </View>
      )}
      {show === "Expense" && (
        <View style={styles.container}>
          <FlatList
            data={expenseData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ScrollView showsVerticalScrollIndicator={false}>
                <ModifyDataButton
                  id={item.id}
                  name={item.name}
                  frequency={item.frequency}
                  amount={item.amount}
                  type={"Expense"}
                />
              </ScrollView>
            )}
          />
        </View>
      )}
      {show === "All" && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            scrollEnabled={false}
            data={incomeData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ModifyDataButton
                id={item.id}
                name={item.name}
                frequency={item.frequency}
                amount={item.amount}
                type={"Income"}
              />
            )}
          />
          <FlatList
            scrollEnabled={false}
            data={expenseData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ModifyDataButton
                id={item.id}
                name={item.name}
                frequency={item.frequency}
                amount={item.amount}
                type={"Expense"}
              />
            )}
          />
        </ScrollView>
      )}
    </View>
  );
}
