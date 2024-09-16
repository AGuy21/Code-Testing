import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Shared from "./../../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Configs/FirebaseConfig";
import PetListItem from "./../../components/PetListItem";
export default function Favourite() {
  const { user } = useUser();
  
  const [favPetList, setFavPetList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    user && GetFavPetIds();
  }, [user]);

  //Fav Ids
  const GetFavPetIds = async () => {
    setLoading(true);
    const result = await Shared.GetFavList(user);
    setLoading(false)
    GetFavPetList(result?.favourites);
  };

  // Fetch Related Pet List
  const GetFavPetList = async (favPetIds) => {
    setLoading(true);
    setFavPetList([]);
    const q = query(collection(db, "Pets"), where("id", "in", favPetIds));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setFavPetList((prev) => [...prev, doc.data()]);
    });

    setLoading(false);
  };
  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-med",
          fontSize: 30,
        }}
      >
        Favourites
      </Text>
      <FlatList
        onRefresh={GetFavPetIds}
        refreshing={loading}
        data={favPetList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem pet={item} />
          </View>
        )}
      />
    </View>
  );
}
