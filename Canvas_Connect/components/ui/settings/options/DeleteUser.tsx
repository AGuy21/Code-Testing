import { Alert, StyleSheet, BackHandler, TouchableOpacity, Text } from "react-native";
import Colors from "@/constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import deleteUsersAccount from "../../../functions/DeleteUsersAccount";
import { useAuth } from "@clerk/clerk-expo";
import AntDesign from "@expo/vector-icons/AntDesign";
import {MaterialIcons} from "@expo/vector-icons"
import React from "react";
import SettingsButton from "../SettingsButton";

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
        { text: "OK", onPress: () => AttemptAccountDeletion() },
      ]
    );
  }

  async function AttemptAccountDeletion() {
    console.log("Deleteing account...");
    const attempt = await deleteUsersAccount(userId);
    console.log(attempt);
    if (attempt.isCompleted) {
      console.log("Successfully Deleted User Account");
      Alert.alert(
        "Account Successfully Deleted",
        "You will now be closed out of the app",
        [
          {
            text: "Ok",
            onPress: () => BackHandler.exitApp(),
          }
        ]
      );
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
    <SettingsButton onPress={confirmDeletion} icon={"delete-forever"} text="Delete Account"/>
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
