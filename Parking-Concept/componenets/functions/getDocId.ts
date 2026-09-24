export default function getDocId(lot: string, plate: string, prepay: number) {
  const dirtyString = `"Lot"${lot}"-"${plate}-${prepay}`;
  const cleanString = dirtyString.replace(/"/g, "");
  return cleanString;
}
