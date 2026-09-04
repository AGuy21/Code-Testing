import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useHangouts } from "../../hooks/useHangouts";
import { useThemePalette } from "../../hooks/useColorTheme";
import { Fonts } from "../../constants/Fonts";
import type { ThemePalette } from "../../constants/types/ColorsTypes";
import type { HangoutId, RsvpStatus } from "../../constants/types/hangout";

export interface RsvpButtonsProps {
  hangoutId: HangoutId;
  /** Let callers size the control (the feed card fixes its width). */
  style?: StyleProp<ViewStyle>;
}

/**
 * Segmented Join/Pass control — one pill, two halves. The active half fills
 * (solid emerald for going, soft emerald for passed); tapping the active half
 * again undoes the RSVP.
 */
export function RsvpButtons({ hangoutId, style }: RsvpButtonsProps) {
  const { rsvps, join, pass, clearRsvp, canRsvp } = useHangouts();
  const palette = useThemePalette();
  const status: RsvpStatus | undefined = rsvps[hangoutId];

  const choose = (value: RsvpStatus) => {
    if (!canRsvp) return;
    if (status === value) {
      clearRsvp(hangoutId);
    } else if (value === "going") {
      join(hangoutId);
    } else {
      pass(hangoutId);
    }
  };

  return (
    <View
      style={[
        styles.segment,
        {
          backgroundColor: palette.surfaceElevated,
          borderColor: palette.border,
          opacity: canRsvp ? 1 : 0.5,
        },
        style,
      ]}
    >
      <Segment
        label={status === "going" ? "Going ✓" : "Join"}
        tone={status === "going" ? "solid" : "idle"}
        disabled={!canRsvp || status === "passed"}
        onPress={() => choose("going")}
        palette={palette}
      />
      <Segment
        label={status === "passed" ? "Passed" : "Pass"}
        tone={status === "passed" ? "soft" : "idle"}
        disabled={!canRsvp || status === "going"}
        onPress={() => choose("passed")}
        palette={palette}
      />
    </View>
  );
}

interface SegmentProps {
  label: string;
  tone: "solid" | "soft" | "idle";
  disabled: boolean;
  onPress: () => void;
  palette: ThemePalette;
}

function Segment({ label, tone, disabled, onPress, palette }: SegmentProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.segmentOption,
        tone === "solid" && { backgroundColor: palette.primary },
        tone === "soft" && { backgroundColor: palette.accentSoft },
      ]}
    >
      <Text
        style={[
          styles.segmentText,
          {
            color:
              tone === "solid"
                ? "#0E1713"
                : tone === "soft"
                  ? palette.primary
                  : palette.textMuted,
          },
          tone !== "idle" && { fontFamily: Fonts.Bold },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  segment: {
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    padding: 3,
  },
  segmentOption: {
    alignItems: "center",
    borderRadius: 999,
    flex: 1,
    paddingVertical: 7,
  },
  segmentText: {
    fontFamily: Fonts.SemiBold,
    fontSize: 13,
  },
});
