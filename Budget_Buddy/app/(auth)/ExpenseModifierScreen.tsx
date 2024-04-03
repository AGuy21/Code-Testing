import { View, Text, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFixSearchParams from "../../components/hooks/useFixSearchParams";
import ExpenseType from "../../components/ui/ExpenseType";
import AmountSlider from "../../components/ui/AmountSlider";
import { AppContext } from "../_layout";
import PaymentFrequency from "../../components/ui/PaymentFrequency";
import ModifySubmitButton from "../../components/ui/ModifySubmitButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useGetCreateExpenseScreenStyles } from "../../constants/styles";
import { AntDesign } from "@expo/vector-icons";
/**
 * This component renders a screen for modifying expenses.
 * It includes child components for selecting expense type, payment frequency, and amount.
 * The data entered by the user is submitted to the Firebase database.
 */
const ExpenseModifierScreen = () => {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;
  const styles = useGetCreateExpenseScreenStyles(Colors);
  // uses the params given when routed to this page to carry our actions dynamically
  const { id, name, frequency, amount, type } = useLocalSearchParams();
  // when params routed they may sometimes convert to stringp[] so we need to fix them with this hook
  const { fixedName, fixedFrequency, fixedAmount, fixedType, fixedId } =
    useFixSearchParams({
      name,
      frequency,
      amount,
      type,
      id,
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
      }}
    >
      <View
        style={{
          width: wp(100),
          height: hp(90),
          alignItems: "flex-end",
          justifyContent: "flex-start",
          paddingRight: wp(5),
          position: "absolute",
        }}
      >
        <Pressable onPress={() => router.replace("Home")}>
          <AntDesign name="close" size={wp(7.5)} color={Colors.secondary} />
        </Pressable>
      </View>
      <Text
        style={{
          color: Colors.primary,
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: hp(6),
        }}
      >
        Modifying {fixedName}
      </Text>
      <ExpenseType
        sendDataToParent={setEditedType}
        typeDataToChild={fixedType}
      />

      <Text style={styles.mainText}>Payment Frequency</Text>

      <PaymentFrequency
        sendDataToParent={setEditedFrequency}
        frequencyDataToChild={fixedFrequency}
      />

      <Text style={styles.mainText}>Amount</Text>

      <AmountSlider
        sendDataToParent={setEditedAmount}
        amountDataToChild={fixedAmount}
      />

      <View style={{ marginTop: hp(4) }} />

      <TextInput
        placeholder="Enter New Name"
        value={editedName}
        placeholderTextColor={Colors?.primary}
        onChangeText={(text) => setEditedName(text)}
        style={{
          textAlign: "center",
          borderBottomWidth: 2,
          borderBottomColor: Colors?.primary,
          width: wp(30),
          height: hp(5),
          color: Colors?.primary,
        }}
      />
      <View style={{ marginTop: hp(10) }} />

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
