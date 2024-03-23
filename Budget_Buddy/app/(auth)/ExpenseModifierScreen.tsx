import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { moneyDataItemProps } from "../../constants/types";
import useFixSearchParams from "../../components/hooks/useFixSearchParams";
import ExpenseType from "../../components/ui/ExpenseType";
import AmountSlider from "../../components/ui/AmountSlider";
import { AppContext } from "../_layout";
import PaymentFrequency from "../../components/ui/PaymentFrequency";
import ModifySubmitButton from "../../components/ui/ModifySubmitButton";

const ExpenseModifierScreen = () => {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;
  const { id, name, frequency, amount } = useLocalSearchParams();

  const { fixedName, fixedFrequency, fixedAmount } = useFixSearchParams({
    name,
    frequency,
    amount,
  });

  const [editedName, setEditedName] = useState<string>(fixedName);
  const [editedFrequency, setEditedFrequency] =
    useState<string>(fixedFrequency);
  const [editedAmount, setEditedAmount] = useState<number>(fixedAmount);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <TextInput onChangeText={setEditedName}>
        <Text style={{ color: Colors.text }}>{fixedName}</Text>
      </TextInput>
      <PaymentFrequency
        sendDataToParent={setEditedFrequency}
        frequencyDataToChild={fixedFrequency}
      />
      <AmountSlider
        sendDataToParent={setEditedAmount}
        amountDataToChild={fixedAmount}
      />
      <ModifySubmitButton />
    </View>
  );
};

export default ExpenseModifierScreen;
