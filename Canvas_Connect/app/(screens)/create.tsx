import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { checkForCameraRollPermission } from "@/components/functions/CheckCameraRollPermissions";
import { useCreatePost } from "@/components/hooks/useCreatePost";
import CreatePostForm from "@/components/ui/create/CreatePostForm";

const create = () => {
  //!Navigation and header setup w/ necessary user data
  const navigation = useNavigation();
  const { colors } = useThemeStore();

  useEffect(() => {
    navigation.setOptions({
      title: "Create Post",
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTintColor: colors.text,
      headerTitleStyle: {
        fontFamily: "Nunito-Bold",
      },
    });
  }, [navigation, colors]);

  useEffect(() => {
    checkForCameraRollPermission();
  }, []);

  const {
    title,
    setTitle,
    description,
    setDescription,
    picture,
    addImage,
    isSubmitting,
    submitPost,
    errors
  } = useCreatePost();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CreatePostForm 
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          picture={picture}
          addImage={addImage}
          isSubmitting={isSubmitting}
          submitPost={submitPost}
          errors={errors}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(2),
  },
});
export default create;
