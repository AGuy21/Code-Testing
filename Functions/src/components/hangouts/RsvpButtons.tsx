import { StyleSheet, View } from "react-native";
import { PrimaryButton } from "../ui";
import { useHangouts } from "../../hooks/useHangouts";
import type { HangoutId } from "../../constants/types/hangout";

export interface RsvpButtonsProps {
  hangoutId: HangoutId;
}

/**
 * Join / Pass controls for a hangout.
 * Tapping the active answer again undoes the RSVP.
 */
export function RsvpButtons({ hangoutId }: RsvpButtonsProps) {
  const { rsvps, join, pass, clearRsvp } = useHangouts();
  const status = rsvps[hangoutId];

  return (
    <View style={styles.row}>
      {status === "going" ? (
        <PrimaryButton
          label="Going ✓"
          variant="outline"
          onPress={() => clearRsvp(hangoutId)}
          style={styles.button}
        />
      ) : (
        <PrimaryButton
          label="Join"
          onPress={() => join(hangoutId)}
          disabled={status === "passed"}
          style={styles.button}
        />
      )}
      {status === "passed" ? (
        <PrimaryButton
          label="Passed"
          variant="ghost"
          onPress={() => clearRsvp(hangoutId)}
          style={styles.button}
        />
      ) : (
        <PrimaryButton
          label="Pass"
          variant="outline"
          onPress={() => pass(hangoutId)}
          disabled={status === "going"}
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
  },
});