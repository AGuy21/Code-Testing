import { Fragment, useMemo } from "react";
import { useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/expo";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AppText, Card, PrimaryButton, Screen } from "../../components/ui";
import { useHangouts } from "../../hooks/useHangouts";
import { useThemePalette } from "../../hooks/useColorTheme";
import { Fonts } from "../../constants/Fonts";
import { formatStartsAt } from "../../utils/hangouts";
import type { Hangout } from "../../constants/types/hangout";

export default function Profile() {
  const router = useRouter();
  const palette = useThemePalette();
  const { userId, isLoaded, signOut } = useAuth();
  const { user } = useUser();
  const { hangouts, rsvps, focusHangout } = useHangouts();

  // Live from Firestore: what this user hosts and where they said yes.
  const hosting = useMemo(
    () => hangouts.filter((hangout) => hangout.hostId === userId),
    [hangouts, userId],
  );
  const going = useMemo(
    () => hangouts.filter((hangout) => rsvps[hangout.id] === "going"),
    [hangouts, rsvps],
  );

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "Your profile";
  const email = user?.emailAddresses[0]?.emailAddress ?? null;
  const initial = (user?.firstName ?? user?.username ?? "?").charAt(0).toUpperCase();

  const confirmSignOut = () => {
    Alert.alert("Sign out", "See you at the next hangout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: () => {
          void (async () => {
            try {
              await signOut();
              router.replace("/(auth)/login");
            } catch (error) {
              console.error("Error signing out:", error);
            }
          })();
        },
      },
    ]);
  };

  if (!isLoaded) {
    return (
      <Screen style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={palette.primary} />
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <AppText variant="hero">
        {user?.firstName ? `Hey ${user.firstName} 👋` : "Profile"}
      </AppText>
      <AppText variant="caption" style={styles.tagline}>
        Your RSVPs, hosting and account — all in one place.
      </AppText>

      <Card style={styles.identityCard}>
        <View style={styles.identityRow}>
          {user?.imageUrl ? (
            <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
          ) : (
            <View
              style={[
                styles.avatar,
                styles.avatarFallback,
                {
                  backgroundColor: palette.accentSoft,
                  borderColor: palette.borderStrong,
                },
              ]}
            >
              <Text style={[styles.avatarInitial, { color: palette.primary }]}>
                {initial}
              </Text>
            </View>
          )}
          <View style={styles.identityText}>
            <Text style={[styles.name, { color: palette.text }]} numberOfLines={1}>
              {fullName}
            </Text>
            {email ? (
              <Text style={[styles.email, { color: palette.textMuted }]} numberOfLines={1}>
                {email}
              </Text>
            ) : null}
          </View>
        </View>
      </Card>

      <View style={styles.statsRow}>
        <StatTile label="Hosting" value={hosting.length} />
        <StatTile label="Going" value={going.length} />
      </View>

      <Text style={[styles.sectionLabel, { color: palette.textMuted }]}>
        Your RSVPs
      </Text>
      {going.length > 0 ? (
        <Card style={styles.listCard}>
          {going.map((hangout, index) => (
            <Fragment key={hangout.id}>
              {index > 0 ? (
                <View style={[styles.divider, { backgroundColor: palette.border }]} />
              ) : null}
              <EventRow hangout={hangout} />
            </Fragment>
          ))}
        </Card>
      ) : (
        <Card variant="accent" style={styles.emptyCard}>
          <Text style={[styles.emptyText, { color: palette.textMuted }]}>
            No RSVPs yet — say you're in from the Events tab.
          </Text>
        </Card>
      )}

      <Text style={[styles.sectionLabel, { color: palette.textMuted }]}>
        Hosted by you
      </Text>
      {hosting.length > 0 ? (
        <Card style={styles.listCard}>
          {hosting.map((hangout, index) => (
            <Fragment key={hangout.id}>
              {index > 0 ? (
                <View style={[styles.divider, { backgroundColor: palette.border }]} />
              ) : null}
              <EventRow hangout={hangout} />
            </Fragment>
          ))}
        </Card>
      ) : (
        <Card variant="accent" style={styles.emptyCard}>
          <Text style={[styles.emptyText, { color: palette.textMuted }]}>
            Nothing pinned yet — host one from the + tab.
          </Text>
        </Card>
      )}

      <Text style={[styles.sectionLabel, { color: palette.textMuted }]}>
        Account
      </Text>
      <Card>
        <Text style={[styles.accountNote, { color: palette.textMuted }]}>
          Secured by Clerk. Your RSVPs sync live across every device you sign
          in on.
        </Text>
        <PrimaryButton
          label="Sign out"
          variant="outline"
          onPress={confirmSignOut}
          style={styles.signOutButton}
        />
      </Card>

      <Text style={[styles.footer, { color: palette.textMuted }]}>
        Functions · plan less, hang more
      </Text>
    </Screen>
  );
}

function StatTile({ label, value }: { label: string; value: number }) {
  const palette = useThemePalette();
  return (
    <Card style={styles.statTile}>
      <Text style={[styles.statValue, { color: palette.text }]}>{value}</Text>
      <Text style={[styles.statLabelText, { color: palette.primary }]}>{label}</Text>
    </Card>
  );
}

interface EventRowProps {
  hangout: Hangout;
}

function EventRow({ hangout }: EventRowProps) {
  const router = useRouter();
  const palette = useThemePalette();
  const { focusHangout } = useHangouts();

  const openOnMap = () => {
    focusHangout(hangout.id);
    router.push("/(tabs)/map");
  };

  return (
    <Pressable
      onPress={openOnMap}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View
        style={[
          styles.rowTile,
          { backgroundColor: palette.accentSoft, borderColor: palette.border },
        ]}
      >
        <Text style={styles.rowEmoji}>{hangout.emoji}</Text>
      </View>
      <View style={styles.rowText}>
        <Text style={[styles.rowTitle, { color: palette.text }]} numberOfLines={1}>
          {hangout.title}
        </Text>
        <Text style={[styles.rowMeta, { color: palette.textMuted }]} numberOfLines={1}>
          {formatStartsAt(hangout.startsAt)} · {hangout.placeLabel}
        </Text>
      </View>
      <Text style={[styles.rowChevron, { color: palette.textMuted }]}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    alignItems: "center",
    justifyContent: "center",
  },
  tagline: {
    marginBottom: 20,
    marginTop: 6,
  },
  identityCard: {},
  identityRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
  },
  avatar: {
    borderRadius: 999,
    height: 64,
    width: 64,
  },
  avatarFallback: {
    alignItems: "center",
    borderWidth: 1,
    justifyContent: "center",
  },
  avatarInitial: {
    fontFamily: Fonts.ExtraBold,
    fontSize: 26,
  },
  identityText: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: Fonts.Bold,
    fontSize: 19,
  },
  email: {
    fontFamily: Fonts.Medium,
    fontSize: 13,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 6,
    marginTop: 14,
  },
  statTile: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 18,
  },
  statValue: {
    fontFamily: Fonts.ExtraBold,
    fontSize: 28,
    lineHeight: 32,
  },
  statLabelText: {
    fontFamily: Fonts.SemiBold,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  sectionLabel: {
    fontFamily: Fonts.SemiBold,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 18,
    textTransform: "uppercase",
  },
  listCard: {
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  divider: {
    height: 1,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    paddingVertical: 12,
  },
  rowPressed: {
    opacity: 0.7,
  },
  rowTile: {
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  rowEmoji: {
    fontSize: 19,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontFamily: Fonts.SemiBold,
    fontSize: 14.5,
  },
  rowMeta: {
    fontFamily: Fonts.Medium,
    fontSize: 12,
  },
  rowChevron: {
    fontFamily: Fonts.Medium,
    fontSize: 20,
  },
  emptyCard: {
    paddingVertical: 18,
  },
  emptyText: {
    fontFamily: Fonts.Medium,
    fontSize: 13.5,
    textAlign: "center",
  },
  accountNote: {
    fontFamily: Fonts.Medium,
    fontSize: 13,
    lineHeight: 19,
  },
  signOutButton: {
    marginTop: 14,
  },
  footer: {
    fontFamily: Fonts.Medium,
    fontSize: 12,
    marginTop: 24,
    textAlign: "center",
  },
});
