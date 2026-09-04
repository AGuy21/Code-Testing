import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppText } from "../ui";
import { RsvpButtons } from "./RsvpButtons";
import { useHangouts } from "../../hooks/useHangouts";
import { useThemePalette } from "../../hooks/useColorTheme";
import { CATEGORY_META } from "../../constants/Categories";
import { Fonts } from "../../constants/Fonts";
import { formatStartsAt } from "../../utils/hangouts";
import type { Hangout } from "../../constants/types/hangout";

export interface HangoutCardProps {
  hangout: Hangout;
}

/**
 * Events-feed card, styled like a ticket: a time eyebrow up top, emoji tile,
 * one line of context, and a compact segmented RSVP in the footer. Tapping
 * anywhere outside the RSVP control opens the hangout on the map.
 */
export function HangoutCard({ hangout }: HangoutCardProps) {
  const router = useRouter();
  const palette = useThemePalette();
  const { goingCount, focusHangout } = useHangouts();
  const meta = CATEGORY_META[hangout.category];

  const startsAt = formatStartsAt(hangout.startsAt);
  const happensToday = startsAt.startsWith("Today");

  const openOnMap = () => {
    focusHangout(hangout.id);
    router.push("/(tabs)/map");
  };

  return (
    <Pressable
      onPress={openOnMap}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: palette.surface, borderColor: palette.border },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.emojiTile,
            { backgroundColor: palette.accentSoft, borderColor: palette.border },
          ]}
        >
          <Text style={styles.emoji}>{hangout.emoji}</Text>
        </View>

        <View style={styles.titleBlock}>
          <AppText
            variant="label"
            numberOfLines={1}
            style={happensToday ? undefined : { color: palette.textMuted }}
          >
            {startsAt}
          </AppText>
          <Text style={[styles.title, { color: palette.text }]} numberOfLines={1}>
            {hangout.title}
          </Text>
          <Text style={[styles.context, { color: palette.textMuted }]} numberOfLines={1}>
            {meta.label} · {hangout.placeLabel} · host {hangout.hostName}
          </Text>
        </View>

        <Text style={[styles.chevron, { color: palette.textMuted }]}>›</Text>
      </View>

      <Text style={[styles.description, { color: palette.text }]} numberOfLines={2}>
        {hangout.description}
      </Text>

      <View style={[styles.footer, { borderTopColor: palette.border }]}>
        <View style={styles.goingPill}>
          <View style={[styles.goingDot, { backgroundColor: palette.primary }]} />
          <Text style={[styles.goingText, { color: palette.text }]}>
            {goingCount(hangout.id)} going
          </Text>
        </View>
        <RsvpButtons hangoutId={hangout.id} style={styles.rsvp} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
  },
  emojiTile: {
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  emoji: {
    fontSize: 24,
  },
  titleBlock: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: Fonts.Bold,
    fontSize: 17,
    lineHeight: 22,
  },
  context: {
    fontFamily: Fonts.Medium,
    fontSize: 12.5,
  },
  chevron: {
    fontFamily: Fonts.Medium,
    fontSize: 22,
    lineHeight: 26,
    marginTop: 12,
  },
  description: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
    opacity: 0.92,
  },
  footer: {
    alignItems: "center",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    paddingTop: 12,
  },
  goingPill: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  goingDot: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  goingText: {
    fontFamily: Fonts.SemiBold,
    fontSize: 13,
  },
  rsvp: {
    width: 172,
  },
});
