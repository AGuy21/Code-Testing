import { router } from "expo-router";
import { Car } from "../../constants/types/LotDataTypes";
import {
  getFirestore,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import getDocId from "./getDocId";

const db = getFirestore();

export default async function addCar(
  lot: string,
  plate: string,
  prepay: number,
) {
  try {
    const docId = getDocId(lot,plate,prepay)
    const docRef = doc(db, "Lots", lot, "Cars", docId);

    const docData: Car = {
      Plate: plate,
      Start: serverTimestamp(),
      Prepayment: prepay,
    };

    console.log("Writing Doc: ", docId)
    console.log("Data: ", docData)
    
    await setDoc(docRef,docData)

    router.replace("/")
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
