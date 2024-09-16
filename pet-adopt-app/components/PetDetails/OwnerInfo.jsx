import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import Colors from "../../constants/Colors";

export default function OwnerInfo({ pet }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
        }}
      >
        <Image
          source={{ uri: pet?.userImage }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 99,
          }}
        />
        <View style={{}}>
          <Text
            style={{
              fontFamily: "outfit-med",
              fontSize: 17,
            }}
          >
            {pet?.userName}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              color: Colors.gray,
            }}
          >
            Pet Owner
          </Text>
        </View>
      </View>
      <Ionicons name="send-sharp" size={24} color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    justifyContent: "space-between",
    borderColor: Colors.primary,
  },
});
