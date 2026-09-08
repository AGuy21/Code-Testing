export default function getDocId(lot: string, plate: string, password: string) {
  const dirtyString = `${lot}"-"${plate}"-"${password.substring(0, 2)}`;
  const cleanString = dirtyString.replace(/"/g, "");
  return cleanString;
}
