import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../../components/Header";
import Slider from "../../components/Slider";
import PetListByCategory from "../../components/PetListByCategory";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";

export default function Home() {
  

  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      {/* header */}
      <Header />
      {/* slider */}
      <Slider />
      {/* list of pets by category */}
      <PetListByCategory />

      {/* add new pet option */}
      <Link style={styles.addNewPetContainer} href={'/add-new-pet'}>
        <MaterialIcons name="pets" size={24} color={Colors.primary} />
        <Text
          style={{
            fontFamily: "outfit-med",
            color: Colors.primary,
            fontSize: 20,
          }}
        >
          Add New Pet
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  addNewPetContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.light_primary,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 15,
    borderStyle: "dashed",
    justifyContent: "center",
    textAlign: 'center',
  },
});
