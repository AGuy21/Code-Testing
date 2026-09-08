import { router } from "expo-router";
import { Car } from "../../constants/types/LotDataTypes";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

const db = getFirestore();

export default async function removeCar(
  lot: string,
  plate: string,
  password: string,
) {
  try {
    const collectionRef = collection(db, "Lots", lot, "Cars", );
    // const docRef
    const docData: Car = {
      Plate: plate,
      Password: password,
      Start: serverTimestamp(),
    };

    // const docSnap = await getDoc(collectionRef, docData);
    router.replace("/")
    // console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
