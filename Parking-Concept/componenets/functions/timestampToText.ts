import { Timestamp } from "firebase/firestore";

export default function timestampToText(timestamp: Timestamp) {
  if (!timestamp) return "";
  return timestamp.toDate().toLocaleString();
}
