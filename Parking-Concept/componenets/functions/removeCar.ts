import { router } from "expo-router";
import { Car } from "../../constants/types/LotDataTypes";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import getDocId from "./getDocId";
import { backupCar } from "./backupCar";

const db = getFirestore();

export default async function removeCar(
  lot: string,
  plate: string,
  prepay: number,
): Promise<boolean> {
  try {
    const docId = getDocId(lot, plate, prepay);
    const docRef = doc(db, "Lots", lot, "Cars", docId);
    console.log("Deleting Doc...", docId)
    console.log("Ref...", docRef)

    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() as Car;

    if (docSnap.exists()) {
      console.log("Doc Exist");
      console.log("Backing Up Doc...");
      await backupCar(docId, lot, docData);
      console.log("Deleting Doc...");
      await deleteDoc(docRef);
      return true;
    } else {
      console.error("Document does not exist")
      return false;
    }
  } catch (error) {
    console.error("Error removing document: ", error);
    return false;
  }
}
