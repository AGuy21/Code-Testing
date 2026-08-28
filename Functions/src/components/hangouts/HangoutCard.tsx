import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText, Badge, Card } from "../ui";
import { RsvpButtons } from "./RsvpButtons";
import { useHangouts } from "../../hooks/useHangouts";
import { CATEGORY_META } from "../../constants/Categories";
import { formatStartsAt } from "../../utils/hangouts";
import type { Hangout } from "../../constants/types/hangout";

export interface HangoutCardProps {
  hangout: Hangout;
}

export function HangoutCard({ hangout }: HangoutCardProps) {
  const router = useRouter();
  const { goingCount, focusHangout } = useHangouts();
  const meta = CATEGORY_META[hangout.category];

  const handleViewOnMap = () => {
    focusHangout(hangout.id);
    router.push("/(tabs)/map");
  };

  return (
    <Card>
      <View style={styles.header}>
        <View style={styles.emojiBubble}>
          <AppText variant="subtitle">{hangout.emoji}</AppText>
        </View>
        <View style={styles.titleBlock}>
          <AppText variant="subtitle" numberOfLines={1}>
            {hangout.title}
          </AppText>
          <AppText variant="caption" numberOfLines={1}>
            {hangout.placeLabel} · host {hangout.hostName}
          </AppText>
        </View>
        <Badge label={meta.label} emoji={meta.emoji} variant="accent" />
      </View>

      <AppText variant="body" numberOfLines={2} style={styles.description}>
        {hangout.description}
      </AppText>

      <View style={styles.metaRow}>
        <AppText variant="caption">🕒 {formatStartsAt(hangout.startsAt)}</AppText>
        <AppText variant="caption">👥 {goingCount(hangout.id)} going</AppText>
      </View>

      <RsvpButtons hangoutId={hangout.id} />

      <Pressable onPress={handleViewOnMap} hitSlop={8} style={styles.viewOnMap}>
        <AppText variant="label">View on map →</AppText>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  emojiBubble: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    width: 44,
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
  viewOnMap: {
    alignSelf: "center",
    marginTop: 10,
  },
});