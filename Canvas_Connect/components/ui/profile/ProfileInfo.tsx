import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ProfilePicture from "@/components/ui/ProfilePicture";
import { useThemeStore } from "@/components/hooks/useThemeStore";

interface ProfileInfoProps {
  username?: string;
  email?: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ username, email }) => {
  const { colors } = useThemeStore();

  return (
    <>
      <View style={styles.pictureContainer}>
        <ProfilePicture />
      </View>

      <Text style={[styles.text, { color: colors.secondary }]}>{username}</Text>
      <Text style={[styles.text2, { color: colors.text }]}>{email}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  pictureContainer: {
    width: wp(60),
    height: wp(60),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Nunito-Bold",
    textAlign: "center",
    fontSize: wp(5),
  },
  text2: {
    fontFamily: "Nunito",
    textAlign: "center",
    fontSize: wp(3),
  },
});

export default ProfileInfo;
