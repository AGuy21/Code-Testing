import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useUserDataStore } from "@/components/hooks/store";
import AuthorizePost from "@/components/functions/AuthorizePost";
import { getNextPostId } from "@/components/functions/GetNextPostId";
import { savePost } from "@/components/functions/SavePost";
import { updateUserPosts } from "@/components/functions/UpdateUserPosts";
import { usePostErrorHandler } from "@/components/hooks/usePostErrorHandler";

export const useCreatePost = () => {
  const router = useRouter();
  const userData = useUserDataStore((state) => state.data);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { errors, setErrorFromMessage, clearErrors } = usePostErrorHandler();

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.5,
      base64: true,
    });
    if (!_image.canceled && _image.assets[0].base64) {
      setPicture(`data:image/jpeg;base64,${_image.assets[0].base64}`);
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
          commentsCount: 0,
          createdAt: new Date(),
          creatorUsername: userData.username,
          creatorProfilePic: userData.profilePicture,
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

  return {
    title,
    setTitle,
    description,
    setDescription,
    picture,
    addImage,
    isSubmitting,
    submitPost,
    errors
  };
};
