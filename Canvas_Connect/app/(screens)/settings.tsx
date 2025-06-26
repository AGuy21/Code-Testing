import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import DeleteUser from "@/components/ui/settings/options/DeleteUser";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import SignOut from "@/components/ui/settings/options/SignOut";
import ChangeUsername from "@/components/ui/settings/options/ChangeUsername";

const settings = () => {
  const { setting } = useLocalSearchParams();
  var title = setting as string;

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: title,
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
    <View style={styles.container}>
      {setting === "Account Options" ? (
        <>
          <View style={styles.topContainer}>
            <ChangeUsername />
          </View>

          <View style={styles.bottomContainer}>
            <SignOut />
            <DeleteUser />
          </View>
        </>
      ) : (
        <></>
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
  },
  topContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: hp(2.5),
  }
});
