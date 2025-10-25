import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { checkForCameraRollPermission } from "@/components/functions/CheckCameraRollPermissions";
import { usePostErrorHandler } from "@/components/hooks/usePostErrorHandler";
import { getNextPostId } from "@/components/functions/GetNextPostId";
import { savePost } from "@/components/functions/SavePost";
import { updateUserPosts } from "@/components/functions/UpdateUserPosts";

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

  useEffect(() => {
    checkForCameraRollPermission();
  }, []);

  //!Post states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //!Error handling
  const { errors, setErrorFromMessage, clearErrors } = usePostErrorHandler();

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!_image.canceled) {
      setPicture(_image.assets[0].uri);
    }
  };

  const submitPost = async () => {
    if (!userData?.email) {
      Alert.alert("Error", "User data not found. Please sign in again.");
      return;
    }

    clearErrors();
    setIsSubmitting(true);

    try {
      // Validate post data
      AuthorizePost({ title, picture, description });

      // Get next post ID
      const postId = await getNextPostId();

      // Save post to posts collection
      await savePost({
        postId,
        postData: {
          title: title.trim(),
          description: description.trim(),
          image: picture,
          creatorEmail: userData.email,
          likes: 0,
        },
      });

      // Update user's posts array
      await updateUserPosts({
        userEmail: userData.email,
        postId,
      });

      Alert.alert("Success", "Post created successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      setErrorFromMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={[
            styles.titleInput,
            { marginBottom: errors.title ? hp(0) : hp(4) },
          ]}
          value={title}
          placeholder="Enter title"
          onChangeText={setTitle}
          placeholderTextColor={Colors.text2}
          editable={!isSubmitting}
        />
        {errors.title && (
          <View style={styles.errorMessageView}>
            <Text style={styles.errorMessageText}>{errors.title}</Text>
          </View>
        )}
      </View>

      <View style={[styles.main, { gap: errors.picture ? hp(0) : hp(2.5) }]}>
        {picture ? (
          <Image
            style={styles.pictureInput}
            source={{ uri: picture }}
            resizeMode="cover"
          />
        ) : (
          <Pressable
            onPress={addImage}
            disabled={isSubmitting}
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

        {errors.picture && (
          <View style={styles.errorMessageView}>
            <Text style={styles.errorMessageText}>{errors.picture}</Text>
          </View>
        )}

        <TextInput
          style={styles.descriptionInput}
          multiline={true}
          placeholder="Enter description"
          placeholderTextColor={Colors.text2}
          value={description}
          onChangeText={setDescription}
          editable={!isSubmitting}
        />
        {errors.description && (
          <View style={styles.errorMessageView}>
            <Text style={styles.errorMessageText}>{errors.description}</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View>
          {errors.other && (
            <View style={styles.errorMessageView}>
              <Text style={styles.otherErrorMessageText}>{errors.other}</Text>
            </View>
          )}
        </View>

        <Pressable
          style={[styles.createButton, isSubmitting && { opacity: 0.5 }]}
          onPress={submitPost}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color={Colors.text2} />
          ) : (
            <MaterialIcons name="add" size={wp(10)} color={Colors.text2} />
          )}
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
