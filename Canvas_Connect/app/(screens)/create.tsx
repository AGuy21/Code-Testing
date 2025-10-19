import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const create = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      title: "Create Post",
      headerStyle: {
        backgroundColor: Colors.background,
        borderBottonWidth: hp(0.2),
        borderBottomColor: Colors.secondary,
      },
      headerTintColor: Colors.text,
      headerTitleStyle: {
        fontFamily: "Nunito-Bold",
      },
    });
  }, [navigation]);

  const [title, setTitle] = React.useState("");
  const [titleError, setTitleError] = React.useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = React.useState(
    "Unknown Title Error"
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { marginBottom: titleError ? hp(0) : hp(4) }]}
        autoCapitalize="none"
        value={title}
        placeholder="Enter title"
        onChangeText={(title) => setTitle(title)}
        placeholderTextColor={Colors.text2}
      />
      {titleError && (
        <View style={styles.errorMessageView}>
          <Text style={styles.errorMessageText}>{titleErrorMessage}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <Pressable
          style={styles.createButton}
          onPress={() => router.push("/create")}
        >
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
    paddingVertical: hp(10),
  },
  text: {
    fontFamily: "Nunito",
    color: Colors.text,
    textAlign: "center",
    fontSize: wp(4),
  },
  inputFeildsContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: wp(80),
    marginBottom: hp(2),
  },
  footer: {
    alignItems: "flex-end",
    width: wp(80),
    justifyContent: "center",
  },
  input: {
    width: wp(80),
    borderWidth: wp(0.5),
    borderRadius: wp(100),
    borderColor: Colors.primary,
    color: Colors.text,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: wp(2),
  },
  errorMessageView: {
    width: wp(75),
    justifyContent: "flex-start",
    marginBottom: hp(2),
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
