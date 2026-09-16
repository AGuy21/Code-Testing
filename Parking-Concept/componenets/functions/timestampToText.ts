import { Timestamp } from "firebase/firestore";

type SerializedTimestamp = { seconds: number; nanoseconds: number };

export default function timestampToText(timestamp: unknown): string {
  if (!timestamp) return "";

  // Standard JavaScript Date
  if (timestamp instanceof Date) {
    return timestamp.toLocaleString();
  }

  // Live Firebase Timestamp instance
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toLocaleString();
  }

  // Plain/serialized object containing { seconds, nanoseconds }
  if (
    typeof timestamp === "object" &&
    timestamp !== null &&
    "seconds" in timestamp &&
    typeof (timestamp as SerializedTimestamp).seconds === "number"
  ) {
    const raw = timestamp as SerializedTimestamp;
    return new Date(raw.seconds * 1000).toLocaleString();
  }

  return "";
}