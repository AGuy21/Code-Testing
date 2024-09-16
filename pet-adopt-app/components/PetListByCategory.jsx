import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Configs/FirebaseConfig";
import PetListItem from "./PetListItem";

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetPetList("Dogs");
  }, []);
  const GetPetList = async (category) => {
    setLoading(true)
    setPetList([]);
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const querySnapshop = await getDocs(q);

    querySnapshop.forEach((doc) => {
      setPetList((petList) => [...petList, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <View>
      <Category category={(value) => GetPetList(value)} />
      <FlatList
        style={{
          marginTop: 10,
        }}
        data={petList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        refreshing={loading}
        onRefresh={()=> GetPetList('Dogs')}
        renderItem={({ item, index }) => <PetListItem pet={item} />}
      />
    </View>
  );
}
