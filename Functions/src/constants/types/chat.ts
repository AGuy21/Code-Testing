import type { HangoutId } from "./hangout";

export type ConversationType = "group" | "dm";

export interface LastMessage {
  text: string;
  senderId: string;
  senderName: string;
  /** ISO 8601; null while the server timestamp is still pending. */
  sentAt: string | null;
}

export interface Conversation {
  id: string;
  type: ConversationType;
  /** Present on group chats (the conversation id === hangout id). */
  hangoutId?: HangoutId;
  hangoutTitle?: string;
  emoji?: string;
  participantUserIds: string[];
  /** DM display-name snapshot: uid → name. */
  participantNames?: Record<string, string>;
  lastMessage: LastMessage | null;
  /** uid → ISO timestamp of that user's last read. */
  lastReadAt: Record<string, string>;
}

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  /** ISO 8601; null while the server timestamp is still pending. */
  createdAt: string | null;
}