import { Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";
import {
  AppText,
  Card,
  PrimaryButton,
  Screen,
} from "../../../componenets/ui";
import { theme } from "../../../constants/theme";

import { useAuth } from "@clerk/expo";
import LoadingScreen from "../../../componenets/ui/LoadingScreen";
import useLotData from "../../../componenets/hooks/useLotData";
import CarListItem from "../../../componenets/ui/CarListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Divider from "../../../componenets/ui/Divider";
import { useState } from "react";
import {AntDesign} from "@expo/vector-icons"

interface DashboardStat {
  label: string;
  value: number | string;
}

export default function DashboardScreen() {
  const { signOut } = useAuth({ treatPendingAsSignedOut: false });
  const [inputLotId, setInputLotId] = useState("1");
  const [activeLotId, setActiveLotId] = useState("1");
  const { error, refetch, loading, lotData } = useLotData("Lot" + activeLotId);

  console.log(loading, lotData);

  if (loading) {
    return <LoadingScreen />;
  }

  const DASHBOARD_STATS: readonly DashboardStat[] = [
    { label: "Total spots", value: lotData?.TotalSpots },
    { label: "Taken spots", value: lotData.TakenSpots },
    { label: "Free spots", value: lotData?.TotalSpots - lotData?.TakenSpots },
    { label: "Hourly rate", value: lotData?.HourlyRate },
  ];

function handleChangeLotId() {
  const formattedId = inputLotId.trim();
  if (!formattedId) return; 

  if (formattedId === activeLotId) {
    refetch(); // Forces a refresh if the ID didn't change
  } else {
    setActiveLotId(formattedId);
  }

  Keyboard.dismiss(); 
}
  return (
    <Screen scroll>
      {/* <Show when="signed-in"> */}
      <AppText variant="title">Dashboard</AppText>
      <AppText variant="caption" style={styles.subtitle}>
        Welcome back — here's today at a glance.
      </AppText>
      <Card variant="accent" style={styles.lotCard}>
        <AppText variant="label" style={styles.nowShowingLabel}>
          NOW SHOWING
        </AppText>
        
        <View style={styles.lotRow}>
          <View style={styles.inputWrapper}>
            <AppText variant="hero" style={styles.lotText}>
              Lot:
            </AppText>

            <TextInput
              value={inputLotId}
              onChangeText={setInputLotId}
              placeholder="e.g. 1"
              placeholderTextColor={theme.colors.textSecondary}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="go"
              onSubmitEditing={handleChangeLotId}
              textAlign="center"
              style={styles.textInput}
            />
          </View>

          <Pressable 
            onPress={handleChangeLotId}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          >
            <View style={styles.circle}>
              <AntDesign name="reload" size={22} color={theme.colors.white}/>
            </View>
          </Pressable>
        </View>
      </Card>

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
  lotCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg, 
  },
  nowShowingLabel: {
    marginBottom: theme.spacing.sm,
    textTransform: "uppercase",
  },
  lotRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, 
  },
  lotText: {
  },
  textInput: {
    ...theme.typography.hero,
    color: theme.colors.textPrimary,
    borderBottomWidth: 2, 
    borderBottomColor: theme.colors.accent,
    minWidth: 60, 
    paddingBottom: 2,
  },
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
  circle: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.accentStrong,
    alignItems: "center",
    justifyContent: "center",
  },
});
