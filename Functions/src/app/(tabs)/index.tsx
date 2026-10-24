import { useMemo, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, View } from "react-native";
import {
  AppText,
  AppTextInput,
  Card,
  Chip,
  Icon,
  PrimaryButton,
  Screen,
} from "../../components/ui";
import { HangoutCard } from "../../components/hangouts/HangoutCard";
import { useHangouts } from "../../hooks/useHangouts";
import { useThemePalette } from "../../hooks/useColorTheme";
import { CATEGORY_META, CATEGORY_ORDER } from "../../constants/Categories";
import { Fonts } from "../../constants/Fonts";
import { distanceKm } from "../../utils/hangouts";
import { getCurrentFix } from "../../utils/location";
import type { HangoutCategory, LatLng } from "../../constants/types/hangout";

type SortMode = "soonest" | "nearest";

function ListSeparator() {
  return <View style={styles.separator} />;
}

export default function HomeScreen() {
  const { hangouts, isLoading, syncError, redeemInviteCode, canRsvp } =
    useHangouts();
  const palette = useThemePalette();
  const [category, setCategory] = useState<HangoutCategory | null>(null);
  const [sort, setSort] = useState<SortMode>("soonest");
  const [here, setHere] = useState<LatLng | null>(null);
  const [code, setCode] = useState("");
  const [redeeming, setRedeeming] = useState(false);

  const chooseSort = async (mode: SortMode) => {
    if (mode === "nearest" && !here) {
      const fix = await getCurrentFix();
      if (!fix) return; // permission denied — stay on soonest
      setHere(fix);
    }
    setSort(mode);
  };

  const visible = useMemo(() => {
    const filtered = category
      ? hangouts.filter((item) => item.category === category)
      : hangouts;
    if (sort !== "nearest" || !here) return filtered;
    return [...filtered].sort(
      (a, b) => distanceKm(here, a.location) - distanceKm(here, b.location),
    );
  }, [hangouts, category, sort, here]);

  const redeem = async () => {
    setRedeeming(true);
    try {
      const title = await redeemInviteCode(code);
      setCode("");
      Alert.alert("You're in", `You can now see "${title}".`);
    } catch (error) {
      Alert.alert(
        "Couldn't use that code",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setRedeeming(false);
    }
  };

  return (
    <Screen scroll>
      <View style={styles.titleRow}>
        <AppText variant="hero">What's on</AppText>
        <Icon name="flame" size={30} color="#FF8A4C" />
      </View>
      <AppText variant="caption" style={styles.subtitle}>
        {isLoading
          ? "Looking around…"
          : visible.length === 1
            ? "1 hangout nearby"
            : `${visible.length} hangouts nearby`}
      </AppText>

      {syncError ? (
        <Card variant="accent" style={styles.syncBanner}>
          <View style={styles.bannerRow}><Icon name="alert-circle" size={16} color="#E5A23C" /><AppText variant="caption" style={styles.flex}>{syncError}</AppText></View>
        </Card>
      ) : null}

      <AppTextInput
        value={code}
        onChangeText={setCode}
        placeholder="Have an invite code?"
        autoCapitalize="characters"
        autoCorrect={false}
        returnKeyType="go"
        onSubmitEditing={() => void redeem()}
      />
      {code.trim().length > 0 ? (
        <PrimaryButton
          label={redeeming ? "Checking…" : "Use invite code"}
          onPress={() => void redeem()}
          disabled={redeeming || !canRsvp}
          style={styles.redeem}
        />
      ) : null}

      <View style={styles.chips}>
        {(["soonest", "nearest"] as const).map((mode) => (
          <Chip
            key={mode}
            label={mode === "soonest" ? "Soonest" : "Nearest"}
            icon={mode === "soonest" ? "time" : "navigate"}
            selected={sort === mode}
            onPress={() => void chooseSort(mode)}
          />
        ))}
        <Chip label="All" icon="apps" selected={category === null} onPress={() => setCategory(null)} />
        {CATEGORY_ORDER.map((key) => (
          <Chip
            key={key}
            label={CATEGORY_META[key].label}
            icon={CATEGORY_META[key].icon}
            color={CATEGORY_META[key].color}
            selected={category === key}
            onPress={() => setCategory(category === key ? null : key)}
          />
        ))}
      </View>

      <FlatList
        data={visible}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HangoutCard hangout={item} />}
        ItemSeparatorComponent={ListSeparator}
        scrollEnabled={false}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator color={palette.primary} style={{ marginTop: 32 }} />
          ) : (
            <Card variant="accent">
              <AppText variant="caption">
                {category
                  ? "No hangouts in this category yet."
                  : "No upcoming hangouts yet — host one from the + tab!"}
              </AppText>
            </Card>
          )
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 },
  titleRow: { alignItems: "center", flexDirection: "row", gap: 8 },
  bannerRow: { alignItems: "center", flexDirection: "row", gap: 8 },
  flex: { flex: 1 },
  syncBanner: {
    marginBottom: 16,
  },
  subtitle: {
    marginBottom: 20,
    marginTop: 6,
  },
  redeem: {
    marginBottom: 16,
  },
  separator: {
    height: 14,
  },
});
