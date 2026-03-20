import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeStore } from "@/components/hooks/useThemeStore";
type CommentInputProps = {
  onAddComment: (text: string) => Promise<boolean | void>;
  onError: (message: string) => void;
};

export default function CommentInput({ onAddComment, onError }: CommentInputProps) {
  const { colors } = useThemeStore();
  const [newComment, setNewComment] = useState("");

  const handleSend = async () => {
    if (newComment.trim().length === 0) return;
    if (newComment.length > 250) {
        onError("Comment must be 250 characters or less.");
        return;
    }

    const success = await onAddComment(newComment);
    if (success) {
        setNewComment("");
    }
  };

  return (
    <View 
      style={[styles.inputContainer, { backgroundColor: colors.background, borderTopColor: colors.primaryDark }]}
    >
      <TextInput
        style={[styles.input, { color: colors.text, backgroundColor: colors.primaryDark }]}
        placeholder="Add a comment..."
        placeholderTextColor={colors.text2}
        value={newComment}
        onChangeText={setNewComment}
        maxLength={250}
      />
      <TouchableOpacity onPress={handleSend} disabled={!newComment.trim()}>
        <Ionicons name="send" size={24} color={newComment.trim() ? colors.secondary : colors.text2} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp(4),
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    padding: wp(3),
    borderRadius: 20,
    marginRight: wp(3),
  },
});
