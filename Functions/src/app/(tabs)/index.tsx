import { useMemo, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
  AppText,
  AppTextInput,
  Card,
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
      <AppText variant="hero">Events</AppText>
      <AppText variant="caption" style={styles.subtitle}>
        {isLoading
          ? "Syncing hangouts…"
          : `${visible.length} hangouts happening around you — say if you're in`}
      </AppText>

      {syncError ? (
        <Card variant="accent" style={styles.syncBanner}>
          <AppText variant="caption">⚠️ {syncError}</AppText>
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
          <FilterChip
            key={mode}
            label={mode === "soonest" ? "🕒 Soonest" : "📍 Nearest"}
            active={sort === mode}
            onPress={() => void chooseSort(mode)}
          />
        ))}
        <FilterChip label="All" active={category === null} onPress={() => setCategory(null)} />
        {CATEGORY_ORDER.map((key) => (
          <FilterChip
            key={key}
            label={`${CATEGORY_META[key].emoji} ${CATEGORY_META[key].label}`}
            active={category === key}
            onPress={() => setCategory(category === key ? null : key)}
          />
        ))}
      </View>

      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HangoutCard hangout={item} />}
        ItemSeparatorComponent={ListSeparator}
        scrollEnabled={false}
      />
    </Screen>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const palette = useThemePalette();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: active ? palette.primary : palette.surfaceElevated,
          borderColor: active ? palette.borderStrong : palette.border,
        },
      ]}
    >
      <Text style={{ color: active ? "#0E1713" : palette.text, fontFamily: Fonts.SemiBold, fontSize: 13 }}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  chip: { borderRadius: 999, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 7 },
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
