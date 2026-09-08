import { useLocalSearchParams } from "expo-router";
import { Alert, StyleSheet, View } from "react-native";
import {
  AppText,
  AppTextInput,
  Card,
  PrimaryButton,
  Screen,
} from "../../componenets/ui";
import { theme } from "../../constants/theme";
import useLotData from "../../componenets/hooks/useLotData";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import Divider from "../../componenets/ui/Divider";
import LoadingScreen from "../../componenets/ui/LoadingScreen";
import addCar from "../../componenets/functions/addCar";
import removeCar from "../../componenets/functions/removeCar";
interface LotStats {
  label: string;
  value: number;
}

export default function ParkingLotScreen() {
  const { lotId } = useLocalSearchParams<{ lotId: string }>();
  console.log("LotID: ", lotId);
  const lotIdNumber = lotId.split("Lot");
  console.log("LotIDNumber: ", lotIdNumber);

  const { loading, lotData } = useLotData(lotId);

  const [plate, setPlate] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>();

  if (loading) {
    return <LoadingScreen />;
  }

  const LOT_STATS: readonly LotStats[] = [
    { label: "Free spots", value: lotData?.TotalSpots - lotData?.TakenSpots },
    { label: "Hourly Rate", value: lotData.HourlyRate },
  ];

  const acceptablePlate = plate.trim().length >= 5;
  const acceptablePassword = password.trim().length >= 4;

  const handlePay = () => {
    if (!acceptablePlate) {
      setError("Plate length too small")
      return;
    }
    if (!acceptablePassword) {
      setError("Password must be 4 or more characters")
      return;
    }
    console.log("Adding New Car: ")
    console.log("LotId:", lotId)
    console.log("Plate:", plate)
    console.log("Password:", password)
    
    addCar(lotId, plate, password);
  };

  function handleEnd() {
    if (!acceptablePlate) {
      setError("Plate length too small")
      return;
    }
    if (!acceptablePassword) {
      setError("Password must be 4 or more characters")
      return;
    }
    console.log("Removing Car: ")
    console.log("LotId:", lotId)
    console.log("Plate:", plate)
    console.log("Password:", password)
    removeCar(lotId, plate, password)
  }

  return (
    <Screen scroll>
      <Card variant="accent" style={styles.lotCard}>
        <AppText variant="label">Now parking</AppText>
        <AppText variant="hero" style={styles.lotId}>
          Lot: {lotIdNumber}
        </AppText>
        <AppText variant="body" style={styles.lotCaption}>
          You are paying for parking at this lot.
        </AppText>
      </Card>

      <View style={styles.statsRow}>
        {LOT_STATS.map((stat) => (
          <Card key={stat.label} style={styles.statCard}>
            <AppText variant="subtitle" style={styles.statValue}>
              {stat.value}
            </AppText>
            <AppText variant="caption">{stat.label}</AppText>
          </Card>
        ))}
      </View>
      {error && <AppText variant="error">{error}</AppText>}
      <AppTextInput
        label="Input Lisence Plate"
        value={plate}
        onChangeText={setPlate}
        autoCapitalize="characters"
      />

      <AppTextInput
        label="Input Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="characters"
      />

      <PrimaryButton label="Pay now" onPress={handlePay} />
      <Divider />

      <PrimaryButton
        variant="outline"
        label="End Parking"
        onPress={handleEnd}
      />
      <AppText variant="muted" style={styles.disclaimer}>
        Please input lisence plate and password you want saved for ending
        parking later, then pay. If ending your parking re-enter the plate and
        passowrd for authentication and press "End Parking"
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  lotCard: {
    alignItems: "flex-start",
    marginBottom: theme.spacing.md,
  },
  lotId: {
    marginVertical: theme.spacing.xs,
  },
  lotCaption: {
    opacity: 0.9,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    minWidth: "30%",
    padding: theme.spacing.md,
  },
  statValue: {
    marginBottom: 2,
  },
  disclaimer: {
    marginTop: theme.spacing.md,
    textAlign: "center",
  },
});
