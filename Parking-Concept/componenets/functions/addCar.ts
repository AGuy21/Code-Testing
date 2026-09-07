import { router } from "expo-router";
import { Car } from "../../constants/types/LotDataTypes";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const db = getFirestore();

export default async function addCar(
  lot: string,
  plate: string,
  password: string,
) {
  try {
    // Reference the specific collection
    const collectionRef = collection(db, "Lots", lot, "Cars");

    // Define your document data
    const docData: Car = {
      Plate: plate,
      Password: password,
      Start: serverTimestamp(),
    };

    // Add the document
    const docRef = await addDoc(collectionRef, docData);
    router.replace("/")
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
