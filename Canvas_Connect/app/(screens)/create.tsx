import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const create = () => {
  const navigation = useNavigation();

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

  
  return (
    <View>
      <Text>create</Text>
    </View>
  );
};

const styles = StyleSheet.create({


});
export default create;

