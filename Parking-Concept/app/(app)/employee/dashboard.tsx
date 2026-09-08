import { FlatList, StyleSheet, View } from "react-native";
import { AppText, Card, PrimaryButton, Screen } from "../../../componenets/ui";
import { theme } from "../../../constants/theme";

import { useAuth } from "@clerk/expo";
import LoadingScreen from "../../../componenets/ui/LoadingScreen";
import useLotData from "../../../componenets/hooks/useLotData";
import CarListItem from "../../../componenets/ui/CarListItem";
import { Car } from "../../../constants/types/LotDataTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Divider from "../../../componenets/ui/Divider";
interface DashboardStat {
  label: string;
  value: number | string;
}

export default function DashboardScreen() {
  const { signOut } = useAuth({ treatPendingAsSignedOut: false });
  const { loading, lotData } = useLotData("Lot1");

  console.log(loading, lotData);
  if (loading) {
    return <LoadingScreen />;
  }

  const DASHBOARD_STATS: readonly DashboardStat[] = [
    { label: "Total spots", value: lotData?.TotalSpots },
    { label: "Taken spots", value: lotData.TakenSpots },
    { label: "Free spots", value: lotData?.TotalSpots - lotData?.TakenSpots },
    { label: "Open tickets", value: "3" },
  ];

  const renderItem = ({ item }: { item: Car }) => (
    <View style={{ marginBottom: theme.spacing.md }}>
      <CarListItem car={item} />
    </View>
  );

  return (
    <Screen scroll>
      {/* <Show when="signed-in"> */}
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

      <SafeAreaView>
        <View>
          {lotData.Cars.map((item) => (
            <View key={item.Plate} style={{ marginBottom: theme.spacing.md }}>
              <CarListItem car={item} />
            </View>
          ))}
        </View>
      </SafeAreaView>

      <PrimaryButton label="Sign Out" onPress={signOut} />
      <Divider />
      <PrimaryButton
        variant="outline"
        label="Go Back"
        onPress={() => router.replace("/")}
      />
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
