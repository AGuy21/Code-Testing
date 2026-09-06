import { db } from "../../Configs/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { LotDataType } from "../../constants/types/LotDataTypes";

export default async function getLotData(lotId: string) {
  try {
    const lotRef = doc(db, "lots", lotId);
    const lotSnap = await getDoc(lotRef);

    if (lotSnap.exists()) {
      return lotSnap.data() as LotDataType;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching lot data:", error);
    return null;
  }
}