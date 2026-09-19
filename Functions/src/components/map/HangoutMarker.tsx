import { Marker } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import { Fonts } from "../../constants/Fonts";
import { useThemePalette } from "../../hooks/useColorTheme";
import type { Hangout, HangoutId } from "../../constants/types/hangout";

/** Diameter of the pin circle; the selected pin is slightly larger. */
const PIN_SIZE = 44;
const PIN_SIZE_SELECTED = 52;
/**
 * How far the count badge overhangs the circle edge. The wrapper below must
 * include this overhang — Android clips anything drawn outside the marker's
 * child-view bounds, which used to cut the badge off.
 */
const BADGE_OUTSET = 8;

export interface HangoutMarkerProps {
  hangout: Hangout;
  goingCount: number;
  selected: boolean;
  onPress: (id: HangoutId) => void;
}

export function HangoutMarker({
  hangout,
  goingCount,
  selected,
  onPress,
}: HangoutMarkerProps) {
  const palette = useThemePalette();
  const size = selected ? PIN_SIZE_SELECTED : PIN_SIZE;
  // The wrapper is the marker's render bounds: circle + badge overhang.
  const wrapper = size + BADGE_OUTSET;

  return (
    <Marker
      coordinate={hangout.location}
      // Anchored at the circle's bottom-center so the pin stays planted on
      // its location in both sizes (the wrapper scales with the circle).
      anchor={{ x: size / (2 * wrapper), y: size / wrapper }}
      zIndex={selected ? 10 : 1}
      onPress={() => onPress(hangout.id)}
    >
      <View style={{ width: wrapper, height: wrapper }}>
        <View
          style={[
            styles.circle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: selected
                ? palette.accentSoft
                : palette.surfaceElevated,
              borderColor: selected ? palette.primary : palette.borderStrong,
            },
          ]}
        >
          <Text style={styles.emoji}>{hangout.emoji}</Text>
        </View>
        <View style={[styles.countBadge, { backgroundColor: palette.primary }]}>
          <Text style={styles.countText}>{goingCount}</Text>
        </View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    top: 0,
  },
  emoji: {
    fontSize: 20,
  },
  countBadge: {
    alignItems: "center",
    borderRadius: 10,
    bottom: 0,
    height: 20,
    justifyContent: "center",
    minWidth: 20,
    paddingHorizontal: 5,
    position: "absolute",
    right: 0,
  },
  countText: {
    fontFamily: Fonts.Bold,
    fontSize: 11,
    color: "#0E1713",
  },
});