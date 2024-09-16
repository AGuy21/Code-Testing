import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Shared from "./../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";

export default function MarkFav({ pet, color = "black" }) {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    GetFav();
  }, [user]);

  const GetFav = async () => {
    const result = await Shared.GetFavList(user);
    setFavList(result?.favourites ? result?.favourites : []);
  };

  const AddToFav = async () => {
    const favResult = favList;
    favResult.push(pet?.id);
    await Shared.UpdateFav(favResult, user);
    GetFav();
  };

  const RemoveFromFav = async () => {
    const favResult = favList.filter((item) => item != pet.id);
    await Shared.UpdateFav(favResult, user);
    GetFav();
  };
  return (
    <View>
      {favList?.includes(pet.id) ? (
        <Pressable onPress={RemoveFromFav}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={() => AddToFav()}>
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
}
