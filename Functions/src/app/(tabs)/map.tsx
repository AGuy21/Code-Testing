import { getCurrentFix } from "../../utils/location";
import { StatusBar } from "expo-status-bar";
import MapView from "react-native-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText, Badge, Card } from "../../components/ui";
import { HangoutMap } from "../../components/map/HangoutMap";
import { RsvpButtons } from "../../components/hangouts/RsvpButtons";
import { useHangouts } from "../../hooks/useHangouts";
import { useThemePalette } from "../../hooks/useColorTheme";
import { CATEGORY_META } from "../../constants/Categories";
import { MAP_INITIAL_REGION } from "../../data/hangouts";
import { formatStartsAt } from "../../utils/hangouts";
import type { HangoutId } from "../../constants/types/hangout";

export default function Map() {
  const palette = useThemePalette();
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();

  const {
    hangouts,
    goingCount,
    focusedHangoutId,
    clearFocus,
    syncError,
  } = useHangouts();

  const [selectedId, setSelectedId] = useState<HangoutId | null>(null);
  const [showsUserLocation, setShowsUserLocation] = useState(false);
  const [locating, setLocating] = useState(false);
  const mapRef = useRef<MapView>(null);

  // Focus a marker requested from another tab (e.g. "View on map").
  useEffect(() => {
    if (!focusedHangoutId) return;
    const target = hangouts.find((hangout) => hangout.id === focusedHangoutId);
    setSelectedId(target ? target.id : null);
    if (target) {
      mapRef.current?.animateToRegion(
        { ...target.location, latitudeDelta: 0.02, longitudeDelta: 0.015 },
        400,
      );
    }
    clearFocus();
  }, [focusedHangoutId, hangouts, clearFocus]);

  const handleLocate = useCallback(async () => {
    if (locating) return;
    setLocating(true);
    try {
      const fix = await getCurrentFix();
      if (!fix) return;
      setShowsUserLocation(true);
      mapRef.current?.animateCamera(
        {
          center: { latitude: fix.latitude, longitude: fix.longitude },
          zoom: 15,
        },
        { duration: 500 },
      );
    } finally {
      setLocating(false);
    }
  }, [locating]);

  const selected = selectedId
    ? hangouts.find((hangout) => hangout.id === selectedId) ?? null
    : null;
  const selectedMeta = selected ? CATEGORY_META[selected.category] : null;

  return (
    <View style={[styles.root, { backgroundColor: palette.background }]}>
      <StatusBar style={scheme === "light" ? "dark" : "light"} />

      <HangoutMap
        mapRef={mapRef}
        hangouts={hangouts}
        selectedId={selectedId}
        onSelect={setSelectedId}
        goingCountFor={goingCount}
        initialRegion={MAP_INITIAL_REGION}
        showsUserLocation={showsUserLocation}
      />

      {/* Header overlay */}
      <View style={[styles.headerOverlay, { top: insets.top + 8 }]}>
        <Card variant="accent" style={styles.headerCard}>
          <AppText variant="subtitle">{hangouts.length} hangouts nearby</AppText>
          <AppText variant="caption">
            {syncError ? `⚠️ ${syncError}` : "Tap a pin to see details and RSVP"}
          </AppText>
        </Card>
      </View>

      {/* Locate me FAB */}
      <Pressable
        onPress={handleLocate}
        style={[
          styles.fab,
          { backgroundColor: palette.primary },
          selected && styles.fabRaised,
        ]}
      >
        {locating ? (
          <ActivityIndicator color="#0E1713" />
        ) : (
          <Text style={styles.fabIcon}>📍</Text>
        )}
      </Pressable>

      {/* Selected hangout card */}
      {selected ? (
        <View style={styles.bottomWrap}>
          <Card>
            <View style={styles.cardHeader}>
              <View style={[styles.emojiBubble, { backgroundColor: palette.accentSoft }]}>
                <Text style={styles.emoji}>{selected.emoji}</Text>
              </View>
              <View style={styles.titleBlock}>
                <AppText variant="subtitle" numberOfLines={1}>
                  {selected.title}
                </AppText>
                <AppText variant="caption" numberOfLines={1}>
                  {selected.placeLabel} · {formatStartsAt(selected.startsAt)}
                </AppText>
              </View>
              {selectedMeta ? (
                <Badge label={selectedMeta.label} emoji={selectedMeta.emoji} variant="accent" />
              ) : null}
            </View>

            <AppText variant="body" numberOfLines={2} style={styles.description}>
              {selected.description}
            </AppText>

            <View style={styles.metaRow}>
              <AppText variant="caption">👥 {goingCount(selected.id)} going</AppText>
              <AppText variant="caption">Host {selected.hostName}</AppText>
            </View>

            <RsvpButtons hangoutId={selected.id} />
          </Card>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerOverlay: {
    left: 16,
    position: "absolute",
    right: 16,
  },
  headerCard: {
    paddingVertical: 12,
  },
  fab: {
    alignItems: "center",
    borderRadius: 28,
    bottom: 24,
    height: 56,
    justifyContent: "center",
    position: "absolute",
    right: 16,
    width: 56,
  },
  fabRaised: {
    bottom: 320,
  },
  fabIcon: {
    fontSize: 22,
  },
  bottomWrap: {
    bottom: 16,
    left: 16,
    position: "absolute",
    right: 16,
  },
  cardHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  emojiBubble: {
    alignItems: "center",
    borderRadius: 22,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  emoji: {
    fontSize: 20,
  },
  titleBlock: {
    flex: 1,
    gap: 2,
  },
  description: {
    marginTop: 12,
  },
  metaRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 14,
    marginTop: 6,
  },
});
