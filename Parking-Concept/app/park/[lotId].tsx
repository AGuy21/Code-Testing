import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function ParkingLotScreen() {
  const { lotId } = useLocalSearchParams<{ lotId: string }>();

  return (
    <View>
      <Text>You are paying for parking at: {lotId}</Text>
    </View>
  );
}
