import { useUserDataStore } from "@/components/hooks/store";
import ProfilePicture from "@/components/ui/ProfilePicture";
import Colors from "@/constants/Colors";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import SettingsModal from "@/components/ui/SettingsModal";
import { useState } from "react";

export default function Profile() {
  const userData = useUserDataStore((state) => state.data);

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.pictureContainer}>
        <ProfilePicture />
      </View>
      <SettingsModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
      <Button title="open modal" onPress={() => setModalOpen(true)} />
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
  pictureContainer: {
    width: wp(60),
    height: wp(60),
    marginTop: hp(5),
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
