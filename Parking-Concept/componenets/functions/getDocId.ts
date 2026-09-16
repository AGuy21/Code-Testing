export default function getDocId(lot: string, plate: string, prepay: number) {
  const dirtyString = `${lot}"-"${plate}-${prepay}`;
  const cleanString = dirtyString.replace(/"/g, "");
  return cleanString;
}
