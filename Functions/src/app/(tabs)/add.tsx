import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useAuth, useUser } from "@clerk/expo";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  AppText,
  AppTextInput,
  PrimaryButton,
  Screen,
} from "../../components/ui";
import { useHangouts } from "../../hooks/useHangouts";
import { useThemePalette } from "../../hooks/useColorTheme";
import { CATEGORY_META, CATEGORY_ORDER } from "../../constants/Categories";
import { Fonts } from "../../constants/Fonts";
import type { HangoutCategory, LatLng } from "../../constants/types/hangout";

interface TimeChip {
  label: string;
  dayOffset: number;
  hour: number;
  minute?: number;
}

const TIME_CHIPS: readonly TimeChip[] = [
  { label: "Tonight 8 PM", dayOffset: 0, hour: 20 },
  { label: "Tomorrow noon", dayOffset: 1, hour: 12 },
  { label: "This weekend", dayOffset: 5, hour: 15 },
];

const toStartsAt = (chip: TimeChip): string => {
  const date = new Date();
  date.setDate(date.getDate() + chip.dayOffset);
  date.setHours(chip.hour, chip.minute ?? 0, 0, 0);
  return date.toISOString();
};

export default function Add() {
  const router = useRouter();
  const palette = useThemePalette();
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const { addHangout, focusHangout, isSubmitting } = useHangouts();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [placeLabel, setPlaceLabel] = useState("");
  const [category, setCategory] = useState<HangoutCategory>("chill");
  const [timeIndex, setTimeIndex] = useState(0);
  const [location, setLocation] = useState<LatLng | null>(null);
  const [locating, setLocating] = useState(false);

  const canSubmit =
    title.trim().length > 0 && location !== null && !isSubmitting;

  const handleUseLocation = async () => {
    if (locating) return;
    setLocating(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location needed",
          "Allow location access so your hangout can be pinned on the map.",
        );
        return;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      console.warn("Failed to get location:", error);
    } finally {
      setLocating(false);
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit || !location || isSubmitting) return;
    try {
      const created = await addHangout({
        title: title.trim(),
        description: description.trim() || "No details yet — just show up!",
        category,
        emoji: CATEGORY_META[category].emoji,
        location,
        placeLabel: placeLabel.trim() || "Shared pin",
        startsAt: toStartsAt(TIME_CHIPS[timeIndex]),
        hostName: user?.firstName ?? user?.username ?? "You",
      });
      focusHangout(created.id);
      router.push("/(tabs)/map");
    } catch (error) {
      const message =
        error instanceof Error && error.message.length > 0
          ? error.message
          : "Something went wrong — please try again.";
      Alert.alert("Couldn't publish your hangout", message);
    }
  };

  return (
    <Screen scroll>
      <AppText variant="hero">Host a hangout</AppText>
      <AppText variant="caption" style={styles.subtitle}>
        Pin it, and others can say if they want to join
      </AppText>

      <AppTextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. Sunset frisbee at the park"
        returnKeyType="next"
      />
      <AppTextInput
        label="Details (optional)"
        value={description}
        onChangeText={setDescription}
        placeholder="What should people know?"
        multiline
        style={styles.multiline}
      />

      <Text style={[styles.fieldLabel, { color: palette.textMuted }]}>Vibe</Text>
      <View style={styles.chipRow}>
        {CATEGORY_ORDER.map((key) => {
          const meta = CATEGORY_META[key];
          const isSelected = key === category;
          return (
            <Pressable
              key={key}
              onPress={() => setCategory(key)}
              style={[
                styles.chip,
                {
                  backgroundColor: isSelected ? palette.primary : palette.surfaceElevated,
                  borderColor: isSelected ? palette.borderStrong : palette.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: isSelected ? "#0E1713" : palette.text },
                ]}
              >
                {meta.emoji} {meta.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={[styles.fieldLabel, { color: palette.textMuted }]}>When</Text>
      <View style={styles.chipRow}>
        {TIME_CHIPS.map((chip, index) => {
          const isSelected = index === timeIndex;
          return (
            <Pressable
              key={chip.label}
              onPress={() => setTimeIndex(index)}
              style={[
                styles.chip,
                {
                  backgroundColor: isSelected ? palette.primary : palette.surfaceElevated,
                  borderColor: isSelected ? palette.borderStrong : palette.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: isSelected ? "#0E1713" : palette.text },
                ]}
              >
                {chip.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={[styles.fieldLabel, { color: palette.textMuted }]}>Where</Text>
      <View style={styles.locationRow}>
        <PrimaryButton
          label="Use my location"
          variant="outline"
          onPress={handleUseLocation}
          disabled={locating}
          style={styles.locationButton}
        />
        <Text style={[styles.locationStatus, { color: palette.textMuted }]}>
          {locating
            ? "Locating…"
            : location
              ? `📍 ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
              : "No pin yet"}
        </Text>
      </View>

      <AppTextInput
        label="Place name (optional)"
        value={placeLabel}
        onChangeText={setPlaceLabel}
        placeholder="e.g. Zilker Park great lawn"
        returnKeyType="done"
      />

      <PrimaryButton
        label={isSubmitting ? "Pinning…" : "Pin it on the map"}
        onPress={() => void handleSubmit()}
        disabled={!canSubmit}
        style={styles.submit}
      />
      {isSignedIn ? null : (
        <Text style={[styles.hint, { color: palette.textMuted }]}>
          You're signed out — sign in to publish your hangout
        </Text>
      )}
      {!location ? (
        <Text style={[styles.hint, { color: palette.textMuted }]}>
          Add a location pin to publish your hangout
        </Text>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginBottom: 20,
    marginTop: 6,
  },
  multiline: {
    height: 90,
    textAlignVertical: "top",
  },
  fieldLabel: {
    fontFamily: Fonts.SemiBold,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 4,
    textTransform: "uppercase",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipText: {
    fontFamily: Fonts.SemiBold,
    fontSize: 13,
  },
  locationRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  locationButton: {
    flexGrow: 0,
  },
  locationStatus: {
    flex: 1,
    fontFamily: Fonts.Medium,
    fontSize: 13,
  },
  submit: {
    marginTop: 8,
  },
  hint: {
    fontFamily: Fonts.Medium,
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
  },
});
