import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useThemeStore } from "@/components/hooks/useThemeStore";

// Options
import DeleteUser from "@/components/ui/settings/options/DeleteUser";
import SignOut from "@/components/ui/settings/options/SignOut";
import ChangeUsername from "@/components/ui/settings/options/ChangeUsername";
import ChangeProfilePicture from "@/components/ui/settings/options/ChangeProfilePicture";
import MessagePrivacy from "@/components/ui/settings/options/MessagePrivacy";
import ProfileVisibility from "@/components/ui/settings/options/ProfileVisibility";
import BlockedUsers from "@/components/ui/settings/options/BlockedUsers";
import EditBio from "@/components/ui/settings/options/EditBio";
import ThemeSelector from "@/components/ui/settings/options/ThemeSelector";

const settings = () => {
  const { setting } = useLocalSearchParams();
  const { colors } = useThemeStore(); // Use dynamic colors
  var title = setting as string;

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor: colors.background,
        borderBottomWidth: hp(0.2),
        borderBottomColor: colors.secondary,
      },
      headerTintColor: colors.text,
      headerTitleStyle: {
        fontFamily: "Nunito-Bold",
      },
    });
  }, [navigation, colors]); // Re-run when colors change

  const renderContent = () => {
    switch (setting) {
      case "Account Options":
        return (
          <>
            <View style={styles.section}>

            </View>

            <View style={styles.footer}>
              <SignOut />
              <DeleteUser />
            </View>
          </>
        );
      case "Account Customization":
        return (
          <View style={styles.section}>
            <ChangeUsername />
            <ChangeProfilePicture />
            <EditBio />
            <ThemeSelector />
          </View>
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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {renderContent()}
    </View>
  );
};

export default settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
