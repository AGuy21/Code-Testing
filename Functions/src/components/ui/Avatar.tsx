import { useUser } from "@clerk/expo";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { db } from "../../../Configs/FirebaseConfig";
import { useThemePalette } from "../../hooks/useColorTheme";

// undefined = not fetched yet; null = fetched, no photo.
const photoCache = new Map<string, string | null>();
const inflight = new Map<string, Promise<string | null>>();

function fetchPhoto(userId: string): Promise<string | null> {
  const pending = inflight.get(userId);
  if (pending) return pending;
  const request = getDoc(doc(db, "users", userId))
    .then((snap) => {
      const url = snap.exists() ? snap.data().imageUrl : null;
      const value = typeof url === "string" && url ? url : null;
      photoCache.set(userId, value);
      return value;
    })
    .catch(() => null)
    .finally(() => inflight.delete(userId));
  inflight.set(userId, request);
  return request;
}

export interface AvatarProps {
  userId?: string;
  name?: string;
  size?: number;
}

/** A person's profile photo, falling back to their initial while loading or when unset. */
export function Avatar({ userId, name, size = 44 }: AvatarProps) {
  const palette = useThemePalette();
  const { user } = useUser();
  const isMe = Boolean(userId) && user?.id === userId;
  const [fetched, setFetched] = useState<string | null | undefined>(
    userId ? photoCache.get(userId) : null,
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!userId || isMe || photoCache.has(userId)) return;
    let live = true;
    void fetchPhoto(userId).then((url) => live && setFetched(url));
    return () => {
      live = false;
    };
  }, [userId, isMe]);

  const uri = isMe ? user?.imageUrl : fetched;
  const dimension = { width: size, height: size, borderRadius: size / 2 };

  if (uri && !failed) {
    return (
      <Image
        source={{ uri }}
        style={[dimension, { backgroundColor: palette.accentSoft }]}
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <View
      style={[
        styles.fallback,
        dimension,
        { backgroundColor: palette.accentSoft, borderColor: palette.border },
      ]}
    >
      <Text style={[styles.initial, { color: palette.primary, fontSize: size * 0.42 }]}>
        {(name?.trim().charAt(0) || "?").toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: { alignItems: "center", borderWidth: 1.5, justifyContent: "center" },
  initial: { fontWeight: "800" },
});
