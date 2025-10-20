import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AuthorizePost from "@/components/functions/AuthorizePost";
import { useUserDataStore } from "@/components/hooks/store";
import * as ImagePicker from "expo-image-picker";

const create = () => {
  //!Navigation and header setup w/ necessary user data
  const navigation = useNavigation();
  const router = useRouter();
  const userData = useUserDataStore((state) => state.data);

  useEffect(() => {
    navigation.setOptions({
      title: "Create Post",
      headerStyle: {
        backgroundColor: Colors.background,
      },
      headerTintColor: Colors.text,
      headerTitleStyle: {
        fontFamily: "Nunito-Bold",
      },
    });
  }, [navigation]);
  //!Image states
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
      setPicture(_image.assets[0].uri);
    }
  };
  //!Post overall states
  const [title, setTitle] = React.useState("");
  const [titleErrorMessage, setTitleErrorMessage] = React.useState("");

  const [description, setDescription] = React.useState("");
  const [descriptionErrorMessage, setDescriptionErrorMessage] =
    React.useState("");

  const [picture, setPicture] = React.useState("");
  const [pictureErrorMessage, setPictureErrorMessage] = React.useState("");

  const [otherErrorMessage, setOtherErrorMessage] = React.useState("");
  /**
   * Handles the submission of the post by authorizing it and catching any validation errors.
   */
  function submitPost() {
    if (!userData?.email) {
      return; //TODO: handle user data not found error
    }
    try {
      AuthorizePost({ title, picture, description });
    } catch (error: any) {
      if (
        !error.message.includes("Title") &&
        !error.message.includes("Picture") &&
        !error.message.includes("Description")
      ) {
        setOtherErrorMessage(error.message);
      }
      if (error.message.includes("Title")) {
        setTitleErrorMessage(error.message);
      } else {
        setTitleErrorMessage("");
      }

      if (error.message.includes("Picture")) {
        setPictureErrorMessage(error.message);
      } else {
        setPictureErrorMessage("");
      }

      if (error.message.includes("Description")) {
        setDescriptionErrorMessage(error.message);
      } else {
        setDescriptionErrorMessage("");
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={[
            styles.titleInput,
            { marginBottom: titleErrorMessage ? hp(0) : hp(4) },
          ]}
          value={title}
          placeholder="Enter title"
          onChangeText={(title) => setTitle(title)}
          placeholderTextColor={Colors.text2}
        />
        {titleErrorMessage && (
          <View style={styles.errorMessageView}>
            <Text style={styles.errorMessageText}>{titleErrorMessage}</Text>
          </View>
        )}
      </View>

      <View style={[styles.main, { gap: pictureErrorMessage ? hp(0) : hp(2.5) }]}>
        {picture ? (
          <Image
            style={styles.pictureInput}
            source={{ uri: picture }}
            resizeMode="cover"
          />
        ) : (
          <Pressable
            onPress={addImage}
            style={[
              styles.pictureInput,
              {

                alignItems: "center",
                justifyContent: "center",
                gap: hp(2),
              },
            ]}
          >
            <Text style={styles.text}>Tap to add a picture</Text>
            <MaterialIcons name="photo" size={wp(10)} color={Colors.text2} />
          </Pressable>
        )}

        {pictureErrorMessage && (
          <View style={styles.errorMessageView}>
            <Text style={styles.errorMessageText}>{pictureErrorMessage}</Text>
          </View>
        )}

        <TextInput
          style={styles.descriptionInput}
          multiline={true}
          placeholder="Enter description"
          placeholderTextColor={Colors.text2}
          value={description}
          onChangeText={(description) => setDescription(description)}
        />
        {descriptionErrorMessage && (
          <View style={styles.errorMessageView}>
            <Text style={styles.errorMessageText}>
              {descriptionErrorMessage}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View>
          {otherErrorMessage && (
            <View style={styles.errorMessageView}>
              <Text style={styles.otherErrorMessageText}>
                {otherErrorMessage}
              </Text>
            </View>
          )}
        </View>

        <Pressable style={styles.createButton} onPress={submitPost}>
          <MaterialIcons name="add" size={wp(10)} color={Colors.text2} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  text: {
    fontFamily: "Nunito",
    color: Colors.text,
    textAlign: "center",
    fontSize: wp(4),
  },
  header: {
    flex: 0.1,
    width: wp(100),
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: wp(10),
    borderTopColor: Colors.tertiary,
    borderTopWidth: wp(0.2),
    paddingTop: hp(2),
  },
  main: {
    flex: 0.8,
    width: wp(100),
    alignItems: "center",
    gap: hp(2.5),
  },
  footer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    width: wp(100),
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    paddingBottom: hp(2),
  },
  titleInput: {
    width: wp(60),
    borderBottomWidth: wp(0.5),
    borderColor: Colors.secondary,
    color: Colors.text,
    paddingRight: wp(2),
    fontFamily: "Nunito",
    fontSize: wp(4),
  },
  pictureInput: {
    width: wp(80),
    height: wp(80),
    color: Colors.text,
    fontFamily: "Nunito",
    borderWidth: wp(0.25),
    borderColor: Colors.primaryLight,
  },
  descriptionInput: {
    width: wp(80),
    height: hp(20),
    borderWidth: wp(0.25),
    borderColor: Colors.secondary,
    color: Colors.text,
    fontFamily: "Nunito",
    borderRadius: hp(2),
    textAlignVertical: "top",
    padding: wp(2),
  },
  errorMessageView: {
    width: wp(75),
    justifyContent: "flex-start",
    marginBottom: hp(1),
  },
  errorMessageText: {
    textAlign: "left",
    color: Colors.error,
  },
  otherErrorMessageText: {
    textAlign: "center",
    color: Colors.error,
  },
  createButton: {
    marginRight: wp(5),
    backgroundColor: Colors.secondary,
    borderRadius: hp(100),
    alignSelf: "flex-end",
    width: wp(15),
    height: wp(15),
    alignItems: "center",
    justifyContent: "center",
  },
});
export default create;
