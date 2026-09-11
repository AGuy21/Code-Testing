import { db } from "../../Configs/FirebaseConfig";
import { getDocs, doc, getDoc, collection } from "firebase/firestore";
import { LotDataType, Car } from "../../constants/types/LotDataTypes";
import { useEffect, useState, useCallback } from "react";
import { LotDummyData } from "../../constants/data/LotDummyData";

export default function useLotData(lotId: string) {
  const [lotData, setLotData] = useState<LotDataType>(LotDummyData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLotData = useCallback(async () => {
    if (!lotId) return;

    setLoading(true);
    setError(null);

    try {
      const lotRef = doc(db, "Lots", lotId);
      const lotSnap = await getDoc(lotRef);

      if (lotSnap.exists()) {
        const mainData = lotSnap.data() as Omit<LotDataType, "Cars">;

        const collectionSnap = await getDocs(
          collection(db, "Lots", lotId, "Cars")
        );

        let count = 0;
        const fetchedCars: Car[] = [];
        collectionSnap.forEach((doc) => {
          count += 1;
          fetchedCars.push(doc.data() as Car);
        });

        setLotData({
          ...mainData,
          TakenSpots: count,
          Cars: fetchedCars,
        } as LotDataType);
      } else {
        console.warn(`No document found for path: Lots/${lotId}`);
        setError(`Lot "${lotId}" does not exist.`);
      }
    } catch (err) {
      console.error("Error fetching lot data:", err);
      setError("Failed to load lot data.");
    } finally {
      setLoading(false);
    }
  }, [lotId]);

  useEffect(() => {
    fetchLotData();
  }, [fetchLotData]);

  return { lotData, loading, error, refetch: fetchLotData };
}