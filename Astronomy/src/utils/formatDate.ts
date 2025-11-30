export function formatToMMDDYYYY(dateString?: string | null): string {
  if (!dateString) return "";
  // strip non digits
  const digits = dateString.replace(/[^0-9]/g, "");
  if (digits.length === 8) {
    // assume MMDDYYYY
    const mm = digits.slice(0, 2);
    const dd = digits.slice(2, 4);
    const yyyy = digits.slice(4);
    return `${mm}/${dd}/${yyyy}`; // return as MM/DD/YYYY
  }
  // try parse if possible
  const parsed = new Date(dateString);
  if (!isNaN(parsed.getTime())) {
    const mm = String(parsed.getMonth() + 1).padStart(2, "0");
    const dd = String(parsed.getDate()).padStart(2, "0");
    const yyyy = String(parsed.getFullYear());
    return `${mm}/${dd}/${yyyy}`;
  }
  // fallback: return original
  return dateString;
}
