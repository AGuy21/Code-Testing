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
  type: string | string[];
  id: string | string[];
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
  type,
  id
}: useFixSearchParamsProps) => {
  const [fixedName, setFixedName] = useState<string>("");
  const [fixedFrequency, setFixedFrequency] = useState<string>("");
  const [fixedAmount, setFixedAmount] = useState<number>(0);
  const [fixedType, setFixedType] = useState<string>("");
  const [fixedId, setFixedId] = useState<string>("");
  useEffect(() => {
    setFixedName(name.toString());
    setFixedFrequency(frequency.toString());
    setFixedAmount(+amount.toString());
    setFixedType(type.toString());
    setFixedId(id.toString());
  });

  return {
    fixedName: fixedName,
    fixedFrequency: fixedFrequency,
    fixedAmount: fixedAmount,
    fixedType: fixedType,
    fixedId: fixedId,
  };
};

export default useFixSearchParams;
