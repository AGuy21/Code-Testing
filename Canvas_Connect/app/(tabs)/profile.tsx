import { useUserDataStore } from "@/components/hooks/store";
import ProfilePicture from "@/components/ui/ProfilePicture";
import Colors from "@/constants/Colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import SettingsModal from "@/components/ui/settings/SettingsModal";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Profile() {
  const userData = useUserDataStore((state) => state.data);

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <View style={styles.container}>
      {/** Opens when modalOpen is equal to true if not stays hidden. */}
      <SettingsModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      {/** Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <Ionicons name="settings" size={wp(7.5)} color={Colors.tertiary} />
        </TouchableOpacity>
      </View>
      {/** Body */}
      <View style={styles.pictureContainer}>
        <ProfilePicture />
      </View>

      <Text style={styles.text}>{userData?.username}</Text>
      <Text style={styles.text2}>{userData?.email}</Text>

      {/* <SignOutButton /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: "center",
  },
  header: {
    height: hp(4),
    width: wp(100),
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: wp(5),
    overflow: "visible",
  },
  pictureContainer: {
    width: wp(60),
    height: wp(60),
    justifyContent: "center",
    alignItems: "center",
  },
  picture: {
    width: wp(50),
    height: wp(50),
    borderRadius: 999,
    borderWidth: wp(0.4),
    borderColor: Colors.secondary,
  },
  text: {
    fontFamily: "Nunito-Bold",
    color: Colors.secondary,
    textAlign: "center",
    fontSize: wp(5),
  },
  text2: {
    fontFamily: "Nunito",
    color: Colors.text,
    textAlign: "center",
    fontSize: wp(3),
  },
});
