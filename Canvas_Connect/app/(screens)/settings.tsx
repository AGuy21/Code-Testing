import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import DeleteUser from "@/components/ui/DeleteUser";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";

const settings = () => {
  const { setting } = useLocalSearchParams();
  var title = setting as string;

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor: Colors.background,
        borderBottonWidth: hp(.2),
        borderBottomColor: Colors.secondary,
      },
      headerTintColor: Colors.text,
      headerTitleStyle: {
        fontFamily: "Nunito-Bold",
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {setting === 'Account Options' ? (
        <DeleteUser />
      ) : (
        <>
        </>
      )}
    </View>
  );
};

export default settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: hp(2.5),
    }
});
