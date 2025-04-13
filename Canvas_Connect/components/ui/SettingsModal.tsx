import { View, Text, Modal, StyleSheet, Button, TouchableOpacity, Pressable } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Colors from "@/constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AntDesign from '@expo/vector-icons/AntDesign';
import SettingsOption from "./SettingsOption";
import { ExternalPathString, RelativePathString, router } from "expo-router";

type SettingsModalProps = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SettingsModal({
  modalOpen,
  setModalOpen,
}: SettingsModalProps) {

  const changeModalOpen = () => {
    setModalOpen(false);
  }

  return (
    <Modal visible={modalOpen} animationType="slide"  transparent={true}>
      <View style={styles.container}>
        {/** Header */}
        <View style={styles.header}>
            <Text style={styles.headerText}>
                Settings
            </Text>
            <TouchableOpacity onPress={changeModalOpen}>
                <AntDesign name="close" size={wp(7.5)} color={Colors.tertiary}/>
            </TouchableOpacity>
        </View>
        {/** Body */}
        <SettingsOption text="Account Options" onPress={() => router.push('/artists')} setModalOpen={setModalOpen}/>
        <SettingsOption text="Account Customization" onPress={() => router.push('/art')} setModalOpen={setModalOpen}/>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  header: {
    flex: .05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: wp(5),
    paddingTop: hp(.05),
    borderBottomWidth: wp(.5),
    borderColor: Colors.secondary
  },
  headerText: {
    width: wp(45),
    paddingLeft: wp(5),
    fontFamily: '',
    color: Colors.text,
    fontSize: wp(7.5),
    opacity: .8,
  },
});
