import { useEffect, useState } from "react";
import SaveUserData from "../functions/SaveUserData";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useUserDataStore } from "./store";

export default function useChangeProfilePicture () {
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

  return { addImage, image}
};

