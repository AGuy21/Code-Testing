import { StyleSheet, View } from "react-native";
import { AppText, Card, PrimaryButton, Screen } from "../../../componenets/ui";
import { theme } from "../../../constants/theme";

import { useAuth } from "@clerk/expo";
import { useEffect, useState } from "react";
import getLotData from "../../../componenets/functions/getLotData";
import { LotDataType } from "../../../constants/types/LotDataTypes";
import { LotDummyData } from "../../../constants/data/LotDummyData";
import  LoadingScreen  from "../../../componenets/ui/LoadingScreen"
interface DashboardStat {
  label: string;
  value: number | string;
}

export default function DashboardScreen() {
  const { isSignedIn, signOut } = useAuth({ treatPendingAsSignedOut: false });
  const [lotData, setLotData] = useState<LotDataType | null>(LotDummyData);

  useEffect(() => {
    const fetchLotData = async () => {
      const data = await getLotData("Lot1");
      console.log("Fetched lot data:", data);
      setLotData(data);
    };

    fetchLotData();
  }, []);

  if (!lotData) {
    return <LoadingScreen/>
  }

  const DASHBOARD_STATS: readonly DashboardStat[] = [
    { label: "Total spots", value: lotData?.TotalSpots },
    { label: "Taken spots", value: lotData.TakenSpots },
    { label: "Free spots", value: lotData?.TotalSpots - lotData?.TakenSpots },
    { label: "Open tickets", value: "3" },
  ];

  return (
    <Screen scroll>
      {/* <Show when="signed-in"> */}
      <AppText variant="title">Dashboard</AppText>
      <AppText variant="caption" style={styles.subtitle}>
        Welcome back — here's today at a glance.
      </AppText>
      <AppText>
        {isSignedIn ? "You are signed in." : "You are not signed in."}
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
      {/* </Show> */}
      {/* fallback incase a non signed in user (customer) gets on dashboard page they must be signed in*/}
      {!isSignedIn && (
        <View style={{ marginTop: theme.spacing.lg }}>
          <AppText variant="title">Not signed in</AppText>
          <AppText variant="caption" style={styles.subtitle}>
            Please sign in to view your dashboard.
          </AppText>
        </View>
      )}

      <PrimaryButton label="Sign Out" onPress={signOut} />
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
