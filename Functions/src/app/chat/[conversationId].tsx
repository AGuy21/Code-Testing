import Ionicons from "@react-native-vector-icons/ionicons";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "@clerk/expo";
import { doc, getDoc } from "firebase/firestore";
import { AppText, Card, Screen } from "../../components/ui";
import { MessageBubble } from "../../components/chat/MessageBubble";
import {
  useChat,
  useConversationMessages,
} from "../../providers/ChatProvider";
import { useThemePalette } from "../../hooks/useColorTheme";
import { Fonts } from "../../constants/Fonts";
import { db } from "../../../Configs/FirebaseConfig";

export default function ConversationThread() {
  const params = useLocalSearchParams<{ conversationId: string }>();
  const conversationId = String(params.conversationId ?? "");
  const palette = useThemePalette();
  const { userId } = useAuth();
  const { conversations, sendMessage, markRead, openDm, ensurePushReady } =
    useChat();
  const { messages, isLoading } = useConversationMessages(conversationId);

  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [memberNames, setMemberNames] = useState<Record<string, string>>({});
  const fetchedNamesRef = useRef<Set<string>>(new Set());

  const conversation = conversations.find((item) => item.id === conversationId);
  const isGroup = conversation?.type !== "dm";
  const otherId = conversation?.participantUserIds.find((id) => id !== userId);
  const title = isGroup
    ? conversation?.hangoutTitle ?? "Hangout"
    : conversation?.participantNames?.[otherId ?? ""] ?? "Direct message";

  // Push registration + read receipt while the thread is open.
  useEffect(() => {
    if (!conversationId) return;
    ensurePushReady();
    markRead(conversationId);
  }, [conversationId, ensurePushReady, markRead, messages.length]);

  // Group chats don't snapshot member names — resolve them from the public
  // users collection the first time the member panel opens.
  useEffect(() => {
    if (!showMembers || !conversation || !isGroup) return;
    const missing = conversation.participantUserIds.filter(
      (id) => id !== userId && !fetchedNamesRef.current.has(id),
    );
    missing.forEach((id) => fetchedNamesRef.current.add(id));
    if (missing.length === 0) return;
    let cancelled = false;
    void Promise.all(
      missing.map(async (id) => {
        const snap = await getDoc(doc(db, "users", id));
        const name = (snap.data()?.displayName as string | undefined) ?? "Member";
        return [id, name] as const;
      }),
    ).then((pairs) => {
      if (cancelled) return;
      setMemberNames((prev) => ({ ...prev, ...Object.fromEntries(pairs) }));
    });
    return () => {
      cancelled = true;
    };
  }, [showMembers, conversation?.participantUserIds, isGroup, userId]);

  const send = async () => {
    const text = draft.trim();
    if (!text || isSending) return;
    setIsSending(true);
    try {
      await sendMessage(conversationId, text);
      setDraft("");
    } finally {
      setIsSending(false);
    }
  };

  /** Tapping a member chip opens (or resumes) your DM with them. */
  const messageMember = async (memberId: string) => {
    if (!userId || memberId === userId) return;
    try {
      const id = await openDm(memberId, memberNames[memberId] ?? "Member");
      router.push(`/chat/${id}`);
    } catch (error) {
      console.warn("Failed to open DM:", error);
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={24} color={palette.text} />
          </Pressable>
          {isGroup ? (
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor: palette.accentSoft,
                  borderColor: palette.border,
                },
              ]}
            >
              <Text style={styles.avatarEmoji}>{conversation?.emoji ?? "💬"}</Text>
            </View>
          ) : (
            <View style={[styles.avatar, styles.avatarDm]}>
              <Text style={styles.avatarInitial}>
                {title.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.headerText}>
            <Text
              style={[styles.headerTitle, { color: palette.text }]}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              style={[styles.headerSubtitle, { color: palette.textMuted }]}
              numberOfLines={1}
            >
              {isGroup
                ? `${conversation?.participantUserIds.length ?? 0} members`
                : "Direct message"}
            </Text>
          </View>
          {isGroup ? (
            <Pressable
              onPress={() => setShowMembers((value) => !value)}
              style={styles.headerButton}
              hitSlop={8}
            >
              <Ionicons
                name={showMembers ? "close" : "people"}
                size={20}
                color={palette.text}
              />
            </Pressable>
          ) : null}
        </View>

        {showMembers && isGroup ? (
          <View
            style={[
              styles.membersCard,
              {
                backgroundColor: palette.surface,
                borderColor: palette.border,
              },
            ]}
          >
            <FlatList
              horizontal
              data={conversation?.participantUserIds ?? []}
              keyExtractor={(id) => id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                const isMe = item === userId;
                return (
                  <Pressable
                    onPress={() => void messageMember(item)}
                    disabled={isMe}
                    style={[
                      styles.memberChip,
                      {
                        backgroundColor: palette.surfaceElevated,
                        borderColor: palette.border,
                        opacity: isMe ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.memberChipText,
                        { color: isMe ? palette.textMuted : palette.text },
                      ]}
                    >
                      {isMe ? "You" : memberNames[item] ?? "Member"}
                    </Text>
                    {isMe ? null : (
                      <Ionicons
                        name="chatbubble-ellipses-outline"
                        size={12}
                        color={palette.primary}
                      />
                    )}
                  </Pressable>
                );
              }}
            />
          </View>
        ) : null}

        {!conversation ? (
          <View style={styles.emptyWrap}>
            <Card variant="accent">
              <AppText variant="caption" style={styles.emptyText}>
                This chat isn't available — it may belong to a hangout you're
                not part of.
              </AppText>
            </Card>
          </View>
        ) : isLoading ? (
          <View style={styles.emptyWrap}>
            <ActivityIndicator size="large" color={palette.primary} />
          </View>
        ) : messages.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Card variant="accent">
              <AppText variant="caption" style={styles.emptyText}>
                No messages yet — break the ice 👋
              </AppText>
            </Card>
          </View>
        ) : (
          <FlatList
            data={messages}
            inverted
            keyExtractor={(message) => message.id}
            renderItem={({ item }) => (
              <MessageBubble message={item} isMine={item.senderId === userId} />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}

        <View style={[styles.inputRow, { borderTopColor: palette.border }]}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: palette.surfaceElevated,
                borderColor: palette.border,
                color: palette.text,
              },
            ]}
            placeholder="Message…"
            placeholderTextColor={palette.textMuted}
            selectionColor={palette.primary}
            value={draft}
            onChangeText={setDraft}
            multiline
          />
          <Pressable
            onPress={() => void send()}
            disabled={!draft.trim() || isSending}
            style={({ pressed }) => [
              styles.sendButton,
              { backgroundColor: palette.primary },
              pressed && styles.sendPressed,
              (!draft.trim() || isSending) && styles.sendDisabled,
            ]}
          >
            {isSending ? (
              <ActivityIndicator size="small" color="#0E1713" />
            ) : (
              <Ionicons name="send" size={18} color="#0E1713" />
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  backButton: {
    alignItems: "center",
    height: 36,
    justifyContent: "center",
    width: 28,
  },
  headerButton: {
    alignItems: "center",
    height: 36,
    justifyContent: "center",
    width: 32,
  },
  avatar: {
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  avatarDm: {
    backgroundColor: "#50c878",
    borderColor: "transparent",
  },
  avatarEmoji: {
    fontSize: 20,
  },
  avatarInitial: {
    color: "#0E1713",
    fontFamily: Fonts.Bold,
    fontSize: 18,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    fontFamily: Fonts.Bold,
    fontSize: 17,
  },
  headerSubtitle: {
    fontFamily: Fonts.Medium,
    fontSize: 12,
  },
  membersCard: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  memberChip: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  memberChipText: {
    fontFamily: Fonts.SemiBold,
    fontSize: 12.5,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
  },
  list: {
    paddingBottom: 12,
  },
  inputRow: {
    alignItems: "flex-end",
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 10,
    paddingTop: 12,
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    fontFamily: Fonts.Medium,
    fontSize: 15,
    maxHeight: 110,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sendButton: {
    alignItems: "center",
    borderRadius: 999,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  sendPressed: {
    opacity: 0.85,
  },
  sendDisabled: {
    opacity: 0.4,
  },
});
