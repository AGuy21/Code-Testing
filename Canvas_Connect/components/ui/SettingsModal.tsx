import { View, Text, Modal, StyleSheet, Button, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Colors from "@/constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AntDesign from '@expo/vector-icons/AntDesign';

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
        <View style={styles.header}>
            <Text style={styles.headerText}>
                Settings
            </Text>
            <TouchableOpacity onPress={changeModalOpen}>
                <AntDesign name="close" size={wp(7.5)} color={Colors.tertiary}/>
            </TouchableOpacity>
        </View>
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
  },
  headerText: {
    width: wp(45),
    paddingLeft: wp(5),
    fontFamily: '',
    color: Colors.text,
    fontSize: wp(7.5),
    borderBottomWidth: wp(.5),
    borderColor: Colors.text
  }
});
