import { db } from "../../Configs/FirebaseConfig";
import { getDocs, doc, getDoc, collection } from "firebase/firestore";
import { LotDataType, Car } from "../../constants/types/LotDataTypes";
import { useEffect, useState } from "react";
import { LotDummyData } from "../../constants/data/LotDummyData";

export default function useLotData(lotId: string) {
  const [lotData, setLotData] = useState<LotDataType>(LotDummyData);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchLotData() {
      try {
        const lotRef = doc(db, "Lots", lotId);
        const lotSnap = await getDoc(lotRef);
        console.log("Lot Snap: " + lotSnap);
        if (lotSnap.exists()) {
          const mainData = lotSnap.data() as Omit<LotDataType, "Cars">;

          const collectionSnap = await getDocs(
            collection(db, "Lots", lotId, "Cars"),
          );

          const fetchedCars: Car[] = [];
          collectionSnap.forEach((doc) => {
            fetchedCars.push(doc.data() as Car);
          });

          setLotData({
            ...mainData,
            Cars: fetchedCars,
          } as LotDataType);
        } else {
          console.log("No such document!");
          return null;
        }
      } catch (error) {
        console.error("Error fetching lot data:", error);
        return null;
      } finally {
        setLoading(false);
      }
    }

    if (lotId) {
      fetchLotData();
    }
  }, [lotId]);

  return { lotData, loading };
}
