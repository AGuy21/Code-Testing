import { StyleSheet, View } from "react-native";
import { AppText, Card, Screen } from "../../componenets/ui";
import { theme } from "../../constants/theme";
import { Show } from "@clerk/expo";
interface DashboardStat {
  label: string;
  value: string;
}

const DASHBOARD_STATS: readonly DashboardStat[] = [
  { label: "Active lots", value: "6" },
  { label: "Free spots", value: "41" },
  { label: "Revenue today", value: "$862" },
  { label: "Open tickets", value: "3" },
];

export default function DashboardScreen() {
  return (
    <Screen scroll>
      <Show when="signed-in">
        <AppText variant="title">Dashboard</AppText>
        <AppText variant="caption" style={styles.subtitle}>
          Welcome back — here's today at a glance.
        </AppText>

        <View style={styles.grid}>
          {DASHBOARD_STATS.map((stat) => (
            <Card key={stat.label} style={styles.tile}>
              <AppText variant="title" style={styles.tileValue}>
                {stat.value}
              </AppText>
              <AppText variant="caption">{stat.label}</AppText>
            </Card>
          ))}
        </View>
      </Show>
          {/* fallback incase a non signed in user (customer) gets on dashboard page they must be signed in*/}
      <Show when="signed-out">
        <AppText variant="title">Not signed in</AppText>
        <AppText variant="caption" style={styles.subtitle}>
          Please sign in to view your dashboard.
        </AppText>
      </Show>
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginBottom: theme.spacing.lg,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  tile: {
    flexBasis: "48%",
    flexGrow: 1,
    padding: theme.spacing.lg,
  },
  tileValue: {
    marginBottom: theme.spacing.xs,
  },
});
