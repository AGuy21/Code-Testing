import { useAuth } from "@clerk/expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from "react-native";
import { db } from "../../../Configs/FirebaseConfig";
import { AppText, Card, Icon, PrimaryButton, Screen } from "../../components/ui";
import { HangoutCard } from "../../components/hangouts/HangoutCard";
import { useChat } from "../../hooks/useChat";
import { useHangouts } from "../../hooks/useHangouts";
import { useThemePalette } from "../../hooks/useColorTheme";
import { Fonts } from "../../constants/Fonts";

interface PublicProfile {
  displayName: string;
  imageUrl?: string;
}

/** Another person's public profile: who they are, what they host, friend + DM. */
export default function UserProfile() {
  const { userId: targetId, name } = useLocalSearchParams<{ userId: string; name?: string }>();
  const router = useRouter();
  const palette = useThemePalette();
  const { userId: me } = useAuth();
  const { hangouts, friendIds, addFriend, removeFriend } = useHangouts();
  const { openDm } = useChat();

  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [messaging, setMessaging] = useState(false);

  useEffect(() => {
    let stale = false;
    getDoc(doc(db, "users", targetId))
      .then((snap) => {
        if (stale) return;
        const data = snap.data();
        setProfile(
          data
            ? {
                displayName: String(data.displayName ?? name ?? "Member"),
                imageUrl: typeof data.imageUrl === "string" ? data.imageUrl : undefined,
              }
            : null,
        );
      })
      .catch(() => undefined)
      .finally(() => !stale && setLoading(false));
    return () => {
      stale = true;
    };
  }, [targetId, name]);

  const displayName = profile?.displayName ?? name ?? "Member";
  const isMe = targetId === me;
  const isFriend = friendIds.includes(targetId);

  // Only what the viewer is already allowed to see in the feed.
  const hosting = useMemo(
    () => hangouts.filter((h) => h.hostId === targetId),
    [hangouts, targetId],
  );

  const message = async () => {
    setMessaging(true);
    try {
      const id = await openDm(targetId, displayName);
      router.push(`/chat/${id}`);
    } catch (error) {
      Alert.alert("Couldn't open chat", error instanceof Error ? error.message : "Try again.");
    } finally {
      setMessaging(false);
    }
  };

  return (
    <Screen scroll>
      <PrimaryButton label="Back" icon="chevron-back" variant="ghost" onPress={() => router.back()} />
      {loading ? (
        <ActivityIndicator color={palette.primary} style={{ marginTop: 40 }} />
      ) : (
        <>
          <View style={styles.header}>
            {profile?.imageUrl ? (
              <Image source={{ uri: profile.imageUrl }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarFallback, { backgroundColor: palette.accentSoft }]}>
                <Text style={[styles.initial, { color: palette.primary }]}>
                  {displayName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <AppText variant="hero" style={styles.center}>{displayName}</AppText>
            {isMe ? <AppText variant="caption">This is you</AppText> : null}
            {isFriend ? (
              <View style={styles.friendRow}>
                <Icon name="heart" size={14} color={palette.primary} />
                <AppText variant="caption">Friend</AppText>
              </View>
            ) : null}
          </View>

          {isMe ? (
            <PrimaryButton label="Go to my profile" onPress={() => router.replace("/(tabs)/profile")} />
          ) : (
            <View style={styles.actions}>
              <PrimaryButton
                label={messaging ? "Opening…" : "Message"}
                icon="chatbubble"
                onPress={() => void message()}
                disabled={messaging}
                style={styles.flex}
              />
              <PrimaryButton
                label={isFriend ? "Remove friend" : "Add friend"}
                icon={isFriend ? "person-remove" : "person-add"}
                variant="outline"
                onPress={() => void (isFriend ? removeFriend(targetId) : addFriend(targetId))}
                style={styles.flex}
              />
            </View>
          )}

          <Text style={[styles.section, { color: palette.textMuted }]}>
            Hosting ({hosting.length})
          </Text>
          {hosting.length === 0 ? (
            <Card>
              <Text style={{ color: palette.textMuted }}>No upcoming hangouts.</Text>
            </Card>
          ) : (
            hosting.map((h) => (
              <View key={h.id} style={styles.gap}>
                <HangoutCard hangout={h} />
              </View>
            ))
          )}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  friendRow: { alignItems: "center", flexDirection: "row", gap: 6 },
  header: { alignItems: "center", gap: 8, marginVertical: 16 },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  avatarFallback: { alignItems: "center", justifyContent: "center" },
  initial: { fontSize: 40, fontFamily: Fonts.Bold },
  center: { textAlign: "center" },
  actions: { flexDirection: "row", gap: 10 },
  flex: { flex: 1 },
  section: { marginTop: 22, marginBottom: 8, fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase", fontFamily: Fonts.SemiBold },
  gap: { marginBottom: 12 },
});
