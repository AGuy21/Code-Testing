import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
import SettingsOption from "../settings/SettingsOption";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore } from "@/components/hooks/useThemeStore";

type SettingsModalProps = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SettingsModal({
  modalOpen,
  setModalOpen,
}: SettingsModalProps) {
  const { colors } = useThemeStore();
  const changeModalOpen = () => {
    setModalOpen(false);
  };

  return (
    <Modal visible={modalOpen} animationType="slide" transparent={false}>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        {/** Header */}
        <View style={[styles.header, { borderColor: colors.secondary }]}>
          <Text style={[styles.headerText, { color: colors.text }]}>Settings</Text>
          <TouchableOpacity onPress={changeModalOpen}>
            <AntDesign name="close" size={wp(7.5)} color={colors.tertiary} />
          </TouchableOpacity>
        </View>
        {/** Body */}
        <SettingsOption text="Account Options" setModalOpen={setModalOpen} />
        <SettingsOption
          text="Account Customization"
          setModalOpen={setModalOpen}
        />
        <SettingsOption text="Privacy & Safety" setModalOpen={setModalOpen} />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    borderBottomWidth: hp(0.1),
  },
  headerText: {
    fontFamily: "Nunito-Bold",
    fontSize: hp(3),
  },
});
