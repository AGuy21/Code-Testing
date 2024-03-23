import { View, Text, Button } from "react-native";
import React from "react";
import { router } from "expo-router";

interface ModifyDataButtonProps {
  id: string;
  name: string;
  frequency: string;
  amount: number;
}

const ModifyDataButton = ({
  id,
  name,
  frequency,
  amount,
}: ModifyDataButtonProps) => {
  const handleButtonPress = () => {
    router.setParams
    router.push({pathname: "ExpenseModifierScreen", params: {id: id, name: name, frequency: frequency, amount: amount}});
  };

  return (
    <View>
      <Button
        title={name + " " + frequency + " " + amount}
        onPress={() => handleButtonPress()}
      />
    </View>
  );
};

export default ModifyDataButton;
