/** Formats a hangout start time as "Today · 8:30 PM" style text. */
export function formatStartsAt(iso: string): string {
  const date = new Date(iso);
  const now = new Date();

  const time = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  if (date.toDateString() === now.toDateString()) {
    return `Today · ${time}`;
  }

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (date.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow · ${time}`;
  }

  const day = date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  return `${day} · ${time}`;
}