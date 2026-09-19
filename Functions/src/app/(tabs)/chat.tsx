import { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/expo";
import { AppText, Card, Screen } from "../../components/ui";
import { useChat } from "../../hooks/useChat";
import { useThemePalette } from "../../hooks/useColorTheme";
import { Fonts } from "../../constants/Fonts";
import type { Conversation } from "../../constants/types/chat";

/** "9:41 PM" today, "Mon" this week, "Aug 3" otherwise. */
function relativeTime(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  const now = new Date();
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  }
  const days = (now.getTime() - date.getTime()) / 86_400_000;
  if (days < 7) {
    return date.toLocaleDateString(undefined, { weekday: "short" });
  }
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function Chat() {
  const router = useRouter();
  const palette = useThemePalette();
  const { userId } = useAuth();
  const { conversations, isLoading, ensurePushReady } = useChat();

  // Register the FCM token (asks permission once, on the first chat visit).
  useEffect(() => {
    if (userId) ensurePushReady();
  }, [userId, ensurePushReady]);

  const titleOf = (conversation: Conversation): string => {
    if (conversation.type === "group") {
      return conversation.hangoutTitle ?? "Hangout";
    }
    const other = conversation.participantUserIds.find((id) => id !== userId);
    return (
      conversation.participantNames?.[other ?? ""] ?? other ?? "Direct message"
    );
  };

  const snippetOf = (conversation: Conversation): string => {
    const last = conversation.lastMessage;
    if (!last) {
      return conversation.type === "group"
        ? "No messages yet — say hi 👋"
        : "Say hello";
    }
    const who = last.senderId === userId ? "You" : last.senderName;
    return `${who}: ${last.text}`;
  };

  const isUnread = (conversation: Conversation): boolean => {
    const last = conversation.lastMessage;
    if (!last || !last.sentAt || last.senderId === userId) return false;
    const readAt = conversation.lastReadAt[userId ?? ""];
    return !readAt || Date.parse(readAt) < Date.parse(last.sentAt);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <AppText variant="hero">Chat</AppText>
        <AppText variant="caption" style={styles.headerCaption}>
          Hangout groups and direct messages — all in one place
        </AppText>
      </View>

      {isLoading ? (
        <Card variant="accent">
          <AppText variant="caption" style={styles.emptyText}>
            Loading chats…
          </AppText>
        </Card>
      ) : conversations.length === 0 ? (
        <Card variant="accent">
          <AppText variant="caption" style={styles.emptyText}>
            No chats yet. Tap "Join" on a hangout to enter its group chat, or
            message someone from a hangout you're part of.
          </AppText>
        </Card>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/chat/${item.id}`)}
              style={({ pressed }) => [
                styles.row,
                pressed && styles.rowPressed,
              ]}
            >
              {item.type === "group" ? (
                <View
                  style={[
                    styles.avatar,
                    {
                      backgroundColor: palette.accentSoft,
                      borderColor: palette.border,
                    },
                  ]}
                >
                  <Text style={styles.avatarEmoji}>{item.emoji ?? "💬"}</Text>
                </View>
              ) : (
                <View style={[styles.avatar, styles.avatarDm]}>
                  <Text style={styles.avatarInitial}>
                    {titleOf(item).charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <View style={styles.rowText}>
                <Text
                  style={[styles.rowTitle, { color: palette.text }]}
                  numberOfLines={1}
                >
                  {titleOf(item)}
                </Text>
                <Text
                  style={[
                    styles.rowSnippet,
                    {
                      color: isUnread(item) ? palette.text : palette.textMuted,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {snippetOf(item)}
                </Text>
              </View>
              <View style={styles.rowMeta}>
                <Text style={[styles.rowTime, { color: palette.textMuted }]}>
                  {relativeTime(item.lastMessage?.sentAt ?? null)}
                </Text>
                {isUnread(item) ? (
                  <View
                    style={[styles.unreadDot, { backgroundColor: palette.primary }]}
                  />
                ) : null}
              </View>
            </Pressable>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      {userId ? null : (
        <Text style={[styles.hint, { color: palette.textMuted }]}>
          Sign in to see your chats
        </Text>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 4,
    marginBottom: 14,
  },
  emptyText: {
    textAlign: "center",
  },
  list: {
    paddingBottom: 16,
  },
  row: {
    alignItems: "center",
    borderRadius: 16,
    flexDirection: "row",
    gap: 12,
    paddingVertical: 12,
  },
  rowPressed: {
    opacity: 0.7,
  },
  avatar: {
    alignItems: "center",
    borderRadius: 24,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  avatarDm: {
    backgroundColor: "#50c878",
    borderColor: "transparent",
  },
  avatarEmoji: {
    fontSize: 22,
  },
  avatarInitial: {
    color: "#0E1713",
    fontFamily: Fonts.Bold,
    fontSize: 20,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontFamily: Fonts.SemiBold,
    fontSize: 15.5,
  },
  rowSnippet: {
    fontFamily: Fonts.Medium,
    fontSize: 13,
  },
  rowMeta: {
    alignItems: "flex-end",
    gap: 6,
  },
  rowTime: {
    fontFamily: Fonts.Medium,
    fontSize: 11.5,
  },
  unreadDot: {
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  hint: {
    fontFamily: Fonts.Medium,
    fontSize: 12,
    marginTop: 12,
    textAlign: "center",
  },
  headerCaption: {
    
  }
});
