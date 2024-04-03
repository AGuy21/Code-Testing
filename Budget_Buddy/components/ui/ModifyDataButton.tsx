import { View, Text, Button, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { AppContext } from "../../app/_layout";
import { useGetModifyButtonStyles } from "../../constants/styles";

interface ModifyDataButtonProps {
  id: string;
  name: string;
  frequency: string;
  amount: number;
  type: string;
}

const ModifyDataButton = ({
  id,
  name,
  frequency,
  amount,
  type,
}: ModifyDataButtonProps) => {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;
  const styles = useGetModifyButtonStyles(Colors);
  const handleButtonPress = () => {
    router.setParams;
    router.push({
      pathname: "ExpenseModifierScreen",
      params: {
        id: id,
        name: name,
        frequency: frequency,
        amount: amount,
        type: type,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={() => handleButtonPress()}>
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ModifyDataButton;
