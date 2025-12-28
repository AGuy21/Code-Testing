import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useThemeStore } from "@/components/hooks/useThemeStore";

type CreatePostFormProps = {
  title: string;
  setTitle: (text: string) => void;
  description: string;
  setDescription: (text: string) => void;
  picture: string;
  addImage: () => void;
  isSubmitting: boolean;
  submitPost: () => void;
  errors: any;
};

export default function CreatePostForm({
  title,
  setTitle,
  description,
  setDescription,
  picture,
  addImage,
  isSubmitting,
  submitPost,
  errors,
}: CreatePostFormProps) {
  const { colors } = useThemeStore();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { borderTopColor: colors.tertiary }]}>
        <TextInput
          style={[
            styles.titleInput,
            {
              marginBottom: errors.title ? hp(0) : hp(4),
              borderColor: colors.secondary,
              color: colors.text,
            },
          ]}
          value={title}
          placeholder="Enter title"
          onChangeText={setTitle}
          placeholderTextColor={colors.text2}
          editable={!isSubmitting}
        />
        {errors.title && (
          <View style={styles.errorMessageView}>
            <Text style={[styles.errorMessageText, { color: colors.error }]}>
              {errors.title}
            </Text>
          </View>
        )}
      </View>

      <View style={[styles.main, { gap: errors.picture ? hp(0) : hp(2.5) }]}>
        {picture ? (
          <Image
            style={[
              styles.pictureInput,
              { borderColor: colors.primaryLight },
            ]}
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
                borderColor: colors.primaryLight,
              },
            ]}
          >
            <Text style={[styles.text, { color: colors.text }]}>
              Tap to add a picture
            </Text>
            <Text style={[styles.text, { color: colors.text2, fontSize: wp(3) }]}>
              (Allowed: JPEG, PNG)
            </Text>
            <MaterialIcons name="photo" size={wp(10)} color={colors.text2} />
          </Pressable>
        )}

        {errors.picture && (
          <View style={styles.errorMessageView}>
            <Text style={[styles.errorMessageText, { color: colors.error }]}>
              {errors.picture}
            </Text>
          </View>
        )}

        <TextInput
          style={[
            styles.descriptionInput,
            { borderColor: colors.secondary, color: colors.text },
          ]}
          multiline={true}
          placeholder="Enter description"
          placeholderTextColor={colors.text2}
          value={description}
          onChangeText={setDescription}
          editable={!isSubmitting}
        />
        {errors.description && (
          <View style={styles.errorMessageView}>
            <Text style={[styles.errorMessageText, { color: colors.error }]}>
              {errors.description}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View>
          {errors.other && (
            <View style={styles.errorMessageView}>
              <Text
                style={[
                  styles.otherErrorMessageText,
                  { color: colors.error },
                ]}
              >
                {errors.other}
              </Text>
            </View>
          )}
        </View>

        <Pressable
          style={[
            styles.createButton,
            { backgroundColor: colors.secondary },
            isSubmitting && { opacity: 0.5 },
          ]}
          onPress={submitPost}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color={colors.text2} />
          ) : (
            <MaterialIcons name="add" size={wp(10)} color={colors.text2} />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    alignItems: "center",
  },
  text: {
    fontFamily: "Nunito",
    textAlign: "center",
    fontSize: wp(4),
  },
  header: {
    width: wp(100),
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: wp(10),
    borderTopWidth: wp(0.2),
    paddingTop: hp(2),
    marginBottom: hp(2),
  },
  main: {
    width: wp(100),
    alignItems: "center",
    gap: hp(2.5),
    marginBottom: hp(2),
  },
  footer: {
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
    paddingRight: wp(2),
    fontFamily: "Nunito",
    fontSize: wp(4),
  },
  pictureInput: {
    width: wp(80),
    height: wp(80),
    fontFamily: "Nunito",
    borderWidth: wp(0.25),
  },
  descriptionInput: {
    width: wp(80),
    height: hp(20),
    borderWidth: wp(0.25),
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
  },
  otherErrorMessageText: {
    textAlign: "center",
  },
  createButton: {
    marginRight: wp(5),
    borderRadius: hp(100),
    alignSelf: "flex-end",
    width: wp(15),
    height: wp(15),
    alignItems: "center",
    justifyContent: "center",
  },
});
