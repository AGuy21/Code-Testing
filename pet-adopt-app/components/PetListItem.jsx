import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { router } from "expo-router";
import PetDetails from "../app/pet-details";
import MarkFav from "./MarkFav";
export default function PetListItem({ pet }) {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/pet-details",
          params: pet,
        })
      }
      style={{
        padding: 10,
        marginRight: 15,
        backgroundColor: Colors.white,
        borderRadius: 10,
      }}
    > 
      <View style={{
        position: 'absolute',
        zIndex: 10,
        right: 10,
        top: 10,
      }}>
        <MarkFav pet={pet} color={'white'}/>
      </View>
      <Image
        source={{ uri: pet?.ImageUrl }}
        style={{
          width: 150,
          height: 135,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />
      <Text
        style={{
          fontFamily: "outfit-med",
          fontSize: 18,
        }}
      >
        {" "}
        {pet.name}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Colors.gray,
            fontFamily: "outfit",
          }}
        >
          {pet?.breed}
        </Text>
        <Text
          style={{
            color: Colors.primary,
            fontFamily: "outfit",
            backgroundColor: Colors.light_primary,
            paddingHorizontal: 10,
            borderRadius: 10,
            fontSize: 11,
          }}
        >
          {pet.age} YRS
        </Text>
      </View>
    </TouchableOpacity>
  );
}
