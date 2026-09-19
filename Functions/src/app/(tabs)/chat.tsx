import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AppText, Card, Screen } from "../../components/ui";
import { useThemePalette } from "../../hooks/useColorTheme";
import { Fonts } from "../../constants/Fonts";

/**
 * UI-only chat skeleton. Messages live in local state for now — the plan is
 * to back each hangout with a Firestore subcollection (see README roadmap),
 * at which point this screen just swaps the local list for a snapshot.
 */
interface ChatMessage {
  id: string;
  text: string;
  mine: boolean;
}

export default function Chat() {
  const palette = useThemePalette();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    // Newest first: the list is inverted, so index 0 renders at the bottom.
    setMessages((prev) => [
      { id: `local-${Date.now()}-${prev.length}`, text, mine: true },
      ...prev,
    ]);
    setDraft("");
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <AppText variant="hero">Chat</AppText>
          <AppText variant="caption" style={styles.headerCaption}>
            Group chats per hangout are coming soon — here's a preview.
          </AppText>
        </View>

        {messages.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Card variant="accent">
              <AppText variant="caption" style={styles.emptyText}>
                No messages yet. Say something to try the layout — live hangout
                chats land here.
              </AppText>
            </Card>
          </View>
        ) : (
          <FlatList
            data={messages}
            inverted
            keyExtractor={(message) => message.id}
            renderItem={({ item }) => <MessageBubble message={item} />}
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
            placeholder="Message the hangout…"
            placeholderTextColor={palette.textMuted}
            selectionColor={palette.primary}
            value={draft}
            onChangeText={setDraft}
            multiline
          />
          <Pressable
            onPress={send}
            disabled={!draft.trim()}
            style={({ pressed }) => [
              styles.sendButton,
              { backgroundColor: palette.primary },
              pressed && styles.sendPressed,
              !draft.trim() && styles.sendDisabled,
            ]}
          >
            <Ionicons name="send" size={18} color="#0E1713" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const palette = useThemePalette();
  return (
    <View
      style={[
        styles.bubbleRow,
        message.mine ? styles.bubbleRowMine : styles.bubbleRowTheirs,
      ]}
    >
      <View
        style={[
          styles.bubble,
          message.mine
            ? { backgroundColor: palette.primary }
            : { backgroundColor: palette.surfaceElevated },
        ]}
      >
        <Text
          style={[
            styles.bubbleText,
            { color: message.mine ? "#0E1713" : palette.text },
          ]}
        >
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    gap: 4,
  },
  headerCaption: {
    marginBottom: 14,
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
  bubbleRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bubbleRowMine: {
    justifyContent: "flex-end",
  },
  bubbleRowTheirs: {
    justifyContent: "flex-start",
  },
  bubble: {
    borderRadius: 16,
    maxWidth: "78%",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleText: {
    fontFamily: Fonts.Medium,
    fontSize: 14.5,
    lineHeight: 20,
  },
  inputRow: {
    alignItems: "flex-end",
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 10,
    paddingTop: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
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
