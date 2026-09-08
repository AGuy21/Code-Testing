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
  password: string,
) {
  try {
    const docId = getDocId(lot, plate, password);
    const docRef = doc(db, "Lots", lot, "Cars", docId);

    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() as Car;

    if (docData.Password == password) {
      console.log("Authentication successful for:", plate);
      const elapsedTime = await getTimeTotal(docData);
      const timeString = elapsedTime?.toString();
      console.log("Deleting Doc...");
      deleteDoc(docRef);
      Alert.alert("Billed for total time: ", timeString) + " Minutes";
      router.replace("/");
    } else {
      console.log("Authentication failed for:", plate);
      Alert.alert("Authentication Failed");
    }
  } catch (error) {
    console.error("Error removing document: ", error);
    Alert.alert("Error, Plate Not Found")
  }
}
