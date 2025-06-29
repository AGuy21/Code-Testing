import React, { useState, useEffect } from "react";
import { Image, View, TouchableOpacity, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Colors from "@/constants/Colors";
import useChangeProfilePicture from "../hooks/useChangeProfilePicture";


export default function ProfilePicture() {
  const { image, addImage } = useChangeProfilePicture();

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.picture} />}
      <View style={styles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
          <Feather name="edit-3" size={wp(6)} color={Colors.primaryDark} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: wp(60),
    height: wp(60),
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtnContainer: {
    position: "absolute",
    left: "32%",
    top: "85%",
    width: "100%",
    height: "15%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  picture: {
    width: wp(50),
    height: wp(50),
    borderRadius: 999,
    borderWidth: wp(0.4),
    borderColor: Colors.secondary,
  },
});
