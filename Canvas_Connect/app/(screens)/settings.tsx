import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

// Options
import DeleteUser from "@/components/ui/settings/options/DeleteUser";
import SignOut from "@/components/ui/settings/options/SignOut";
import ChangeUsername from "@/components/ui/settings/options/ChangeUsername";
import ChangeProfilePicture from "@/components/ui/settings/options/ChangeProfilePicture";
import MessagePrivacy from "@/components/ui/settings/options/MessagePrivacy";
import ProfileVisibility from "@/components/ui/settings/options/ProfileVisibility";
import BlockedUsers from "@/components/ui/settings/options/BlockedUsers";

const settings = () => {
  const { setting } = useLocalSearchParams();
  var title = setting as string;

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor: Colors.background,
        borderBottomWidth: hp(0.2),
        borderBottomColor: Colors.secondary,
      },
      headerTintColor: Colors.text,
      headerTitleStyle: {
        fontFamily: "Nunito-Bold",
      },
    });
  }, [navigation]);

  const renderContent = () => {
    switch (setting) {
      case "Account Options":
        return (
          <>
            <View style={styles.section}>
              <ChangeUsername />
              <ChangeProfilePicture />
            </View>

            <View style={styles.footer}>
              <SignOut />
              <DeleteUser />
            </View>
          </>
        );
      case "Privacy & Safety":
        return (
          <View style={styles.section}>
            <ProfileVisibility />
            <MessagePrivacy />
            <BlockedUsers />
          </View>
        );
      default:
        return <View />;
    }
  };

  return <View style={styles.container}>{renderContent()}</View>;
};

export default settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: hp(2.5),
  },
  section: {
    flex: 1,
    alignItems: "flex-start",
  },
  footer: {
    justifyContent: "flex-end",
    paddingBottom: hp(5),
  },
});
