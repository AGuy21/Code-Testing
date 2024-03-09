import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { AppContext } from "../../app/_layout";

import { useGetPaymentFrequencyStyles } from "../../constants/styles";
/**
 * Props for the PaymentFrequency component.
 */
interface PaymentFrequencyProps {
  /**
   * Function to send data to the parent component.
   * @param val - The value to be sent to the parent component.
   */
  sendDataToParent: (val: string) => void;

  /**
   * Data received from the parent component.
   */
  frequencyDataToChild: string;
}

/**
 * Renders a component for selecting payment frequency.
 * @param {Object} props - The component props.
 * @param {Function} props.sendDataToParent - The function to send the selected frequency to the parent component.
 * @param {string} props.frequencyDataToChild - The selected frequency received from the parent component.
 * @returns {JSX.Element} The rendered component.
 */

const PaymentFrequency: React.FC<PaymentFrequencyProps> = ({
  sendDataToParent,
  frequencyDataToChild,
}) => {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetPaymentFrequencyStyles(Colors);

  const [expenseFrequency, setExpenseFrequency] = useState<string>("");

  useEffect(() => {
    // this sends the parent the expense freq when changed
    sendDataToParent(expenseFrequency);
  }, [expenseFrequency]);

  useEffect(() => {
    // this sets the expense freq when changed by parent done on reset
    setExpenseFrequency(frequencyDataToChild);
  }, [frequencyDataToChild]);

  return (
    <View style={styles.buttonRowContainer}>
      <Pressable
        style={
          expenseFrequency === "Weekly" ? styles.activeButton : styles.button
        }
        onPress={() => setExpenseFrequency("Weekly")}
      >
        <Text
          style={
            expenseFrequency === "Weekly"
              ? styles.activeButtonText
              : styles.buttonText
          }
        >
          Weekly
        </Text>
      </Pressable>
      <Pressable
        style={
          expenseFrequency === "Bi-Weekly" ? styles.activeButton : styles.button
        }
        onPress={() => setExpenseFrequency("Bi-Weekly")}
      >
        <Text
          style={
            expenseFrequency === "Bi-Weekly"
              ? styles.activeButtonText
              : styles.buttonText
          }
        >
          Bi-Weekly
        </Text>
      </Pressable>
      <Pressable
        style={
          expenseFrequency === "Monthly" ? styles.activeButton : styles.button
        }
        onPress={() => setExpenseFrequency("Monthly")}
      >
        <Text
          style={
            expenseFrequency === "Monthly"
              ? styles.activeButtonText
              : styles.buttonText
          }
        >
          Monthly
        </Text>
      </Pressable>
    </View>
  );
};

export default PaymentFrequency;
