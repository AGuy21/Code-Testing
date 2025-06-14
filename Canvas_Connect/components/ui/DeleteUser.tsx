import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import Colors from "@/constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
import deleteUsersAccount from "../functions/DeleteUsersAccount";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

const DeleteUser = () => {
  const { userId } = useAuth();

  function confirmDeletion() {
    console.log("Asking for user confirmation before deleting account..");
    Alert.alert(
      "Deletion Confirmation",
      "Are you sure you want to delete your account PERMANENTLY?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => AttemptAccountDeletion },
      ]
    );
  }

  async function AttemptAccountDeletion() {
    console.log("Deleteing account...");
    const attempt = await deleteUsersAccount(userId);
    console.log(attempt);
    if (attempt.isCompleted) {
      console.log("Successfully Deleted User Account");
      Alert.alert("Account Successfully Deleted");
      router.replace("/");
    } else {
      if (typeof attempt.error == "object") {
        Alert.alert(
          "Error Occured: " + JSON.stringify(attempt.error.errors[0].message)
        );
        Alert.alert(
          "Error Occured: " + JSON.stringify(attempt.error.errors[0].message)
        );
      } else {
        Alert.alert("Error Occured: " + JSON.stringify(attempt.error));
        console.log("Error Occured: " + JSON.stringify(attempt.error));
      }
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={confirmDeletion}>
      <MaterialIcons
        name="delete-forever"
        size={wp(7.5)}
        color={Colors.error}
      />
      <Text style={styles.text}>Delete Account</Text>
      <AntDesign name="right" size={wp(7.5)} color={Colors.text} />
    </TouchableOpacity>
  );
};

export default DeleteUser;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 0.075,
    gap: wp(2.5),
    paddingHorizontal: wp(5),
    width: wp(100),
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: Colors.text2,
    borderBottomWidth: hp(0.2),
    borderTopColor: Colors.text2,
    borderTopWidth: hp(0.2),
  },
  text: {
    fontFamily: "Nunito-Bold",
    color: Colors.text,
    fontSize: hp(1.75),
    marginRight: wp(30),
  },
});
