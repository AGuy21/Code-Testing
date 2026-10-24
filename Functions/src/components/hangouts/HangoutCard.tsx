import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/expo";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppText } from "../ui";
import { CategoryTile } from "../ui/CategoryTile";
import { RsvpButtons } from "./RsvpButtons";
import { useHangouts } from "../../hooks/useHangouts";
import { useChat } from "../../hooks/useChat";
import { useThemePalette } from "../../hooks/useColorTheme";
import { categoryMeta, goingLabel } from "../../constants/Categories";
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
  const { goingCount, rsvps, focusHangout } = useHangouts();
  const { openGroupChat } = useChat();
  const { userId } = useAuth();

  // The group chat is for the host and anyone who said they're going.
  const isMember = Boolean(
    userId && (rsvps[hangout.id] === "going" || hangout.hostId === userId),
  );

  const openChat = async () => {
    try {
      await openGroupChat(hangout);
      router.push(`/chat/${hangout.id}`);
    } catch (error) {
      console.warn("Failed to open chat:", error);
    }
  };

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
        <CategoryTile category={hangout.category} size={52} />

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
            {hangout.placeLabel} · by{" "}
            {hangout.hostId ? (
              <Text
                style={{ color: palette.primary, fontFamily: Fonts.SemiBold }}
                onPress={() =>
                  router.push({
                    pathname: "/user/[userId]",
                    params: { userId: hangout.hostId as string, name: hangout.hostName },
                  })
                }
              >
                {hangout.hostName}
              </Text>
            ) : (
              hangout.hostName
            )}
          </Text>
        </View>

        {hangout.privacy !== "public" ? (
          <Ionicons name="lock-closed" size={16} color={palette.textMuted} style={styles.lock} />
        ) : (
          <Ionicons name="chevron-forward" size={18} color={palette.textMuted} style={styles.lock} />
        )}
      </View>

      {hangout.description?.trim() && !/^no details yet/i.test(hangout.description) ? (
        <Text style={[styles.description, { color: palette.text }]} numberOfLines={2}>
          {hangout.description}
        </Text>
      ) : null}

      <View style={[styles.footer, { borderTopColor: palette.border }]}>
        <View style={styles.goingPill}>
          <View style={[styles.goingDot, { backgroundColor: palette.primary }]} />
          <Text style={[styles.goingText, { color: palette.text }]}>
            {goingLabel(goingCount(hangout.id))}
          </Text>
        </View>
        {isMember ? (
          <Pressable
            onPress={() => void openChat()}
            style={styles.chatIcon}
            hitSlop={8}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={18}
              color={palette.primary}
            />
          </Pressable>
        ) : null}
        <RsvpButtons hangoutId={hangout.id} style={styles.rsvp} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 26,
    borderWidth: 1.5,
    padding: 20,
    marginBottom: 6,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 14,
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
    gap: 4,
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
  lock: { marginTop: 14 },
  chevron: {
    fontFamily: Fonts.Medium,
    fontSize: 22,
    lineHeight: 26,
    marginTop: 12,
  },
  description: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 16,
    opacity: 0.92,
  },
  footer: {
    alignItems: "center",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    paddingTop: 16,
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
  chatIcon: {
    alignItems: "center",
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  rsvp: {
    width: 172,
  },
});
