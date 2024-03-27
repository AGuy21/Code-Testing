import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs, useLocalSearchParams } from "expo-router";
import { moneyDataItemProps } from "../../constants/types";
import useFixSearchParams from "../../components/hooks/useFixSearchParams";
import ExpenseType from "../../components/ui/ExpenseType";
import AmountSlider from "../../components/ui/AmountSlider";
import { AppContext } from "../_layout";
import PaymentFrequency from "../../components/ui/PaymentFrequency";
import ModifySubmitButton from "../../components/ui/ModifySubmitButton";

/**
 * This component renders a screen for modifying expenses.
 * It includes child components for selecting expense type, payment frequency, and amount.
 * The data entered by the user is submitted to the Firebase database.
 */
const ExpenseModifierScreen = () => {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;
  // uses the params given when routed to this page to carry our actions dynamically
  const { id, name, frequency, amount, type } = useLocalSearchParams();
  // when params routed they may sometimes convert to stringp[] so we need to fix them with this hook
  const { fixedName, fixedFrequency, fixedAmount, fixedType, fixedId } =
    useFixSearchParams({
      name,
      frequency,
      amount,
      type,
      id
    });
  // all states to be changed
  const [editedName, setEditedName] = useState<string>(fixedName);
  const [editedFrequency, setEditedFrequency] =
    useState<string>(fixedFrequency);
  const [editedAmount, setEditedAmount] = useState<number>(fixedAmount);
  const [editedType, setEditedType] = useState<string>(fixedType);
  // this keeps all states up to date to prevent any bugs
  useEffect(() => {
    setEditedName(fixedName);
    setEditedFrequency(fixedFrequency);
    setEditedAmount(fixedAmount);
    setEditedType(fixedType);
  }, [fixedName, fixedFrequency, fixedAmount, fixedType]);
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
      <ExpenseType
        sendDataToParent={setEditedType}
        typeDataToChild={fixedType}
      />
      <PaymentFrequency
        sendDataToParent={setEditedFrequency}
        frequencyDataToChild={fixedFrequency}
      />
      <AmountSlider
        sendDataToParent={setEditedAmount}
        amountDataToChild={fixedAmount}
      />
      <ModifySubmitButton
      /**
       * This component renders a button for submitting the data entered by the user.
       * It is given all the data changed from the other children and all funneled in one submit component.
      */
        editedAmount={editedAmount}
        editedName={editedName}
        editedFrequency={editedFrequency}
        editedType={editedType}
        fixedType={fixedType}
        id={fixedId}
      />
    </View>
  );
};

export default ExpenseModifierScreen;
