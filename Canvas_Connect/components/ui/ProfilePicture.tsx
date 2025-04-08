import React, { useState, useEffect } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Colors from "@/constants/Colors";
import { useUserDataStore } from "../hooks/store";
import SaveUserData from "../functions/SaveUserData";
import { router } from "expo-router";

export default function ProfilePicture() {
  const userData = useUserDataStore((state) => state.data);
  const [image, setImage] = useState(userData?.profilePicture);

  useEffect(() => {
    checkForCameraRollPermission();
  }, []);

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Please grant camera roll permissions inside your system's settings"
      );
    } else {
      console.log("Media Permissions are granted");
    }
  };

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!_image.canceled) {
      setImage(_image.assets[0].uri);
      if (userData?.email != null) {
        SaveUserData({
          userEmail: userData.email,
          data: _image.assets[0].uri,
          variable: "profilePicture",
        });
      } else {
        alert(
          "cant save data due to issue with your email, please sign back in or restart!"
        );
        router.replace("/(auth)/sign-in");
      }
    }
  };

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
