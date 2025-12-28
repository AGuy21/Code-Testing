import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useThemeStore } from "@/components/hooks/useThemeStore";

interface ProfileHeaderProps {
  setModalOpen: (open: boolean) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ setModalOpen }) => {
  const { colors } = useThemeStore();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <MaterialIcons name="settings" size={wp(7.5)} color={colors.tertiary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: hp(4),
    width: wp(100),
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: wp(5),
    overflow: "visible",
  },
});

export default ProfileHeader;
