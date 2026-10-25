import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { db } from "../../Configs/FirebaseConfig";
import { getDocs, collection } from "firebase/firestore";

const useDocData = () => {
  const [loading, setLoading] = useState(true);
  const [lots, setLots] = useState<any[]>([]);

  useEffect(() => {
    fetchDocuments();
  }, []);
  
  const fetchDocuments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Lots"));

      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLots(list);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  return { lots, loading };
};

export default useDocData;
