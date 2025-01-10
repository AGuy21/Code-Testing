import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

interface AuthHeaderProps {
  title: string;
}
const AuthHeader: React.FC<AuthHeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()}>
        <Ionicons name="arrow-back-sharp" size={wp(7)} color={Colors.primary} />
      </Pressable>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: wp(100),
    height: hp(10),
    paddingTop: hp(5),
    paddingHorizontal: wp(2),
    paddingRight: wp(45),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  headerText: {
    color: Colors.primary,
    fontFamily: "Nunito-Bold",
    fontSize: wp(5),
    borderBottomColor: Colors.primary,
    borderBottomWidth: wp(0.4),
    width: wp(25),
    textAlign: "center",
    marginLeft: wp(28),
  },
});

export default AuthHeader;
