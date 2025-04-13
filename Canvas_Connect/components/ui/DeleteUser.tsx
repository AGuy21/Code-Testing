import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import Colors from "@/constants/Colors";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";
import AntDesign from '@expo/vector-icons/AntDesign';

const DeleteUser = () => {

  async function deleteAccount() {
    try {
      await clerkClient.users.deleteUser(userId)
      return Response.json({ message: 'User deleted' })
    } catch (error) {
      console.log(error)
      return Response.json({ error: 'Error deleting user' })
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => deleteAccount()}>
      <MaterialIcons name="delete-forever" size={wp(7.5)} color={Colors.error} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.text2,
    borderBottomWidth: hp(.2),
    borderTopColor: Colors.text2,
    borderTopWidth: hp(.2),
  },
  text: {
    fontFamily: "Nunito-Bold",
    color: Colors.text,
    fontSize: hp(1.75),
    marginRight: wp(30),
  }
});
