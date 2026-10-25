import { useContext } from "react";
import { ChatContext, type ChatContextValue } from "../providers/ChatProvider";

export function useChat(): ChatContextValue {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used inside a ChatProvider");
  }
  return context;
}