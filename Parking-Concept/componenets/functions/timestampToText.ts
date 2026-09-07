export default function timestampToText(timestamp: any ) {
  if (!timestamp) return "";
  return timestamp.toDate().toLocaleString();
}
