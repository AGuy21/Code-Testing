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
import getTimeTotal from "./getTimeTotal";
import { Alert } from "react-native";

const db = getFirestore();

export default async function removeCar(
  lot: string,
  plate: string,
  prepay: number,
) {
  try {
    const docId = getDocId(lot, plate, prepay);
    const docRef = doc(db, "Lots", lot, "Cars", docId);
    console.log("Deleting Doc...", docId)
    console.log("Ref...", docRef)

    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() as Car;

    if (docSnap.exists()) {
      console.log("Doc Exist");
      const elapsedTime = await getTimeTotal(docData);
      const timeString = elapsedTime?.toString();
      console.log("Deleting Doc...");
      deleteDoc(docRef);
    } else {
      console.error("Document does not exist")
    }
  } catch (error) {
    console.error("Error removing document: ", error);
  }
}
