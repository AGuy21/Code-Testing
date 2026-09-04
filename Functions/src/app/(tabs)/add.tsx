import { useRouter } from "expo-router";
import { useState } from "react";
import { useAuth, useUser } from "@clerk/expo";
import {
  Alert,
  Platform,
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
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { formatStartsAt } from "../../utils/hangouts";
import { getCurrentFix } from "../../utils/location";

type PickerMode = "date" | "time";

const makeDate = (dayOffset: number, hour: number, minute = 0): Date => {
  const value = new Date();
  value.setDate(value.getDate() + dayOffset);
  value.setHours(hour, minute, 0, 0);
  return value;
};

/** Quick-start options; anything else goes through the native picker. */
const QUICK_TIMES: readonly { label: string; value: () => Date }[] = [
  { label: "Tonight 8 PM", value: () => makeDate(0, 20) },
  { label: "Tomorrow noon", value: () => makeDate(1, 12) },
  { label: "This weekend", value: () => makeDate(5, 15) },
];

/** Keeps the chosen time of day, swaps in a new calendar date. */
const mergeDateKeepTime = (source: Date, base: Date): Date => {
  const next = new Date(base);
  next.setFullYear(source.getFullYear(), source.getMonth(), source.getDate());
  return next;
};

/** Keeps the chosen calendar date, swaps in a new time of day. */
const mergeTimeKeepDate = (source: Date, base: Date): Date => {
  const next = new Date(base);
  next.setHours(source.getHours(), source.getMinutes(), 0, 0);
  return next;
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
  const [date, setDate] = useState(() => makeDate(0, 20));
  const [draft, setDraft] = useState<Date>(() => makeDate(0, 20));
  const [activeQuick, setActiveQuick] = useState<number | null>(0);
  const [showPicker, setShowPicker] = useState<PickerMode | null>(null);
  const [location, setLocation] = useState<LatLng | null>(null);
  const [locating, setLocating] = useState(false);

  const canSubmit =
    title.trim().length > 0 && location !== null && !isSubmitting;

  const handleUseLocation = async () => {
    if (locating) return;
    setLocating(true);
    try {
      const fix = await getCurrentFix();
      if (fix) setLocation(fix);
    } finally {
      setLocating(false);
    }
  };

  const openPicker = (mode: PickerMode) => {
    setDraft(date);
    setShowPicker(mode);
  };

  const confirmIosPicker = () => {
    if (!showPicker) return;
    if (showPicker === "date") {
      // Chain date → time so both parts are always chosen.
      setShowPicker("time");
      return;
    }
    setDate(draft);
    setActiveQuick(null);
    setShowPicker(null);
  };

  const handlePickerChange = (event: DateTimePickerEvent, selected?: Date) => {
    setShowPicker(null); // Android dialogs close themselves.
    if (event.type !== "set" || !selected) return;
    if (showPicker === "date") {
      setDraft(mergeDateKeepTime(selected, draft));
      setShowPicker("time");
      return;
    }
    const next = mergeTimeKeepDate(selected, draft);
    setDraft(next);
    setDate(next);
    setActiveQuick(null);
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
        startsAt: date.toISOString(),
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
        {QUICK_TIMES.map((option, index) => {
          const isSelected = activeQuick === index;
          return (
            <Pressable
              key={option.label}
              onPress={() => {
                setActiveQuick(index);
                setDate(option.value());
              }}
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
                {option.label}
              </Text>
            </Pressable>
          );
        })}
        <Pressable
          onPress={() => openPicker("date")}
          style={[
            styles.chip,
            {
              backgroundColor: activeQuick === null ? palette.primary : palette.surfaceElevated,
              borderColor: activeQuick === null ? palette.borderStrong : palette.border,
            },
          ]}
        >
          <Text
            style={[
              styles.chipText,
              { color: activeQuick === null ? "#0E1713" : palette.text },
            ]}
          >
            📅 Pick date & time
          </Text>
        </Pressable>
      </View>
      <Text style={[styles.selectedTime, { color: palette.textMuted }]}>
        🕒 Starts {formatStartsAt(date.toISOString())}
      </Text>

      {showPicker !== null && Platform.OS === "android" ? (
        <DateTimePicker
          value={draft}
          mode={showPicker}
          is24Hour={false}
          onChange={handlePickerChange}
        />
      ) : null}
      {showPicker !== null && Platform.OS === "ios" ? (
        <View
          style={[
            styles.pickerSheet,
            { backgroundColor: palette.surface, borderColor: palette.border },
          ]}
        >
          <DateTimePicker
            value={draft}
            mode={showPicker}
            display="spinner"
            is24Hour={false}
            minimumDate={showPicker === "date" ? new Date() : undefined}
            onChange={(_event, selected) => {
              if (selected) setDraft(selected);
            }}
          />
          <View style={styles.pickerActions}>
            <PrimaryButton
              label="Cancel"
              variant="ghost"
              onPress={() => setShowPicker(null)}
              style={styles.pickerButton}
            />
            <PrimaryButton label="Set" onPress={confirmIosPicker} style={styles.pickerButton} />
          </View>
        </View>
      ) : null}

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
  selectedTime: {
    fontFamily: Fonts.Medium,
    fontSize: 13,
    marginBottom: 18,
    marginTop: -10,
  },
  pickerSheet: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 18,
    padding: 8,
  },
  pickerActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  pickerButton: {
    flex: 1,
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
