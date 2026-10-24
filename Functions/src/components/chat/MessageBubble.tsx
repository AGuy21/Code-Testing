import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useThemePalette } from "../../hooks/useColorTheme";
import { Avatar } from "../ui/Avatar";
import { Fonts } from "../../constants/Fonts";
import type { ChatMessage } from "../../constants/types/chat";

export interface MessageBubbleProps {
  message: ChatMessage;
  isMine: boolean;
}

/** One chat bubble — emerald for mine, elevated surface for everyone else. */
export function MessageBubble({ message, isMine }: MessageBubbleProps) {
  const palette = useThemePalette();
  const router = useRouter();
  const openProfile = () =>
    router.push({
      pathname: "/user/[userId]",
      params: { userId: message.senderId, name: message.senderName },
    });
  return (
    <View
      style={[
        styles.row,
        isMine ? styles.rowMine : styles.rowTheirs,
      ]}
    >
      {!isMine ? (
        <Pressable onPress={openProfile} hitSlop={6} style={styles.avatar}>
          <Avatar userId={message.senderId} name={message.senderName} size={30} />
        </Pressable>
      ) : null}
      <View
        style={[
          styles.bubble,
          isMine
            ? { backgroundColor: palette.primary }
            : { backgroundColor: palette.surfaceElevated },
        ]}
      >
        {!isMine ? (
          <Text
            style={[styles.sender, { color: palette.primary }]}
            numberOfLines={1}
            onPress={openProfile}
          >
            {message.senderName}
          </Text>
        ) : null}
        <Text
          style={[
            styles.text,
            { color: isMine ? "#0E1713" : palette.text },
          ]}
        >
          {message.text}
        </Text>
        <Text
          style={[styles.time, { color: isMine ? "#2E4B3E" : palette.textMuted }]}
        >
          {message.createdAt ? shortTime(message.createdAt) : "Sending…"}
        </Text>
      </View>
    </View>
  );
}

function shortTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

const styles = StyleSheet.create({
  avatar: { alignSelf: "flex-end", marginRight: 8 },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  rowMine: {
    justifyContent: "flex-end",
  },
  rowTheirs: {
    justifyContent: "flex-start",
  },
  bubble: {
    borderRadius: 16,
    maxWidth: "78%",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sender: {
    fontFamily: Fonts.SemiBold,
    fontSize: 11.5,
    marginBottom: 2,
  },
  text: {
    fontFamily: Fonts.Medium,
    fontSize: 14.5,
    lineHeight: 20,
  },
  time: {
    fontFamily: Fonts.Medium,
    fontSize: 10,
    marginTop: 3,
    textAlign: "right",
  },
});