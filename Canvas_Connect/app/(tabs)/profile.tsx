import { useUserDataStore } from "@/components/hooks/store";
import ProfilePicture from "@/components/ui/ProfilePicture";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import SettingsModal from "@/components/ui/settings/SettingsModal";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeStore } from "@/components/hooks/useThemeStore";

export default function Profile() {
  const userData = useUserDataStore((state) => state.data);
  const { colors } = useThemeStore();

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    
  }, [modalOpen]);
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/** Opens when modalOpen is equal to true if not stays hidden. */}
      <SettingsModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      {/** Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalOpen(true)}>

          <MaterialIcons name="settings" size={wp(7.5)} color={colors.tertiary} />
        </TouchableOpacity>
      </View>
      
      {/** Body */}
      <View style={styles.pictureContainer}>
        <ProfilePicture />
      </View>

      <Text style={[styles.text, { color: colors.secondary }]}>{userData?.username}</Text>
      <Text style={[styles.text2, { color: colors.text }]}>{userData?.email}</Text>


      {/* <SignOutButton /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
