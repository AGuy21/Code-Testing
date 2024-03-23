import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
/**
 * Props for the fix params hook these can take
 * two diffrent types as that is why we need to fix it
 */
interface useFixSearchParamsProps {
  name: string | string[];
  frequency: string | string[];
  amount: string | string[];
}

/**
 * Hook to fix the search params
 * @param {string | string[]} name - The name to be fixed.
 * @param {string | string[]} frequency - The frequency to be fixed.
 * @param {string | string[]} amount - The amount to be fixed.
 * @returns {Object} - The fixed search params.
 */
const useFixSearchParams = ({
  name,
  frequency,
  amount,
}: useFixSearchParamsProps) => {
  const [fixedName, setFixedName] = useState<string>("");
  const [fixedFrequency, setFixedFrequency] = useState<string>("");
  const [fixedAmount, setFixedAmount] = useState<number>(0);
  useEffect(() => {
    setFixedName(name.toString());
    setFixedFrequency(frequency.toString());
    setFixedAmount(+amount.toString());
  });

  return {
    fixedName: fixedName,
    fixedFrequency: fixedFrequency,
    fixedAmount: fixedAmount,
  };
};

export default useFixSearchParams;
