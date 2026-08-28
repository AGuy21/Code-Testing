import { Marker } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import { Fonts } from "../../constants/Fonts";
import { useThemePalette } from "../../hooks/useColorTheme";
import type { Hangout, HangoutId } from "../../constants/types/hangout";

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

  return (
    <Marker
      coordinate={hangout.location}
      anchor={{ x: 0.5, y: 1 }}
      zIndex={selected ? 10 : 1}
      onPress={() => onPress(hangout.id)}
    >
      <View
        style={[
          styles.pin,
          {
            backgroundColor: selected ? palette.accentSoft : palette.surfaceElevated,
            borderColor: selected ? palette.primary : palette.borderStrong,
          },
          selected && styles.pinSelected,
        ]}
      >
        <Text style={styles.emoji}>{hangout.emoji}</Text>
        <View style={[styles.countBadge, { backgroundColor: palette.primary }]}>
          <Text style={styles.countText}>{goingCount}</Text>
        </View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  pin: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  pinSelected: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
  },
  emoji: {
    fontSize: 20,
  },
  countBadge: {
    position: "absolute",
    bottom: -8,
    right: -8,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  countText: {
    fontFamily: Fonts.Bold,
    fontSize: 11,
    color: "#0E1713",
  },
});