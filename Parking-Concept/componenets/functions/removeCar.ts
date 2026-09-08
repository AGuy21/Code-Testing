import { router } from "expo-router";
import { Car } from "../../constants/types/LotDataTypes";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
} from "firebase/firestore";
import getDocId from "./getDocId";
import getTimeTotal from "./getTimeTotal";

const db = getFirestore();

export default async function removeCar(
  lot: string,
  plate: string,
  password: string,
) {
  try {
    const docId = getDocId(lot, plate, password);
    const docRef = doc(db, "Lots", lot, "Cars", docId );

    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() as Car;

    if (docData.Password == password) {
        console.log("Authentication successful for:", plate)
        const elapsedTime = getTimeTotal(docData)
        
    } else {
        console.log("Authentication failed for:", plate)
    }

  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
