import { useLocalSearchParams } from "expo-router";
import { Alert, StyleSheet, View } from "react-native";
import { AppText, Card, PrimaryButton, Screen } from "../../componenets/ui";
import { theme } from "../../constants/theme";

interface LotStat {
  label: string;
  value: string;
}

const LOT_STATS: readonly LotStat[] = [
  { label: "Hourly rate", value: "$3.50" },
  { label: "Open spots", value: "24" },
  { label: "Type", value: "Compact" },
];

export default function ParkingLotScreen() {
  const { lotId } = useLocalSearchParams<{ lotId: string }>();
  const displayLotId = Array.isArray(lotId) ? (lotId[0] ?? "Unknown lot") : lotId;

  const handlePay = () => {
    Alert.alert("Payment", `Starting payment for lot ${displayLotId}…`);
  };

  return (
    <Screen scroll>
      <Card variant="accent" style={styles.lotCard}>
        <AppText variant="label">Now parking</AppText>
        <AppText variant="hero" style={styles.lotId}>
          {displayLotId}
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

      <PrimaryButton label="Pay now" onPress={handlePay} />
      <AppText variant="muted" style={styles.disclaimer}>
        Payments open in the checkout flow once enabled.
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
