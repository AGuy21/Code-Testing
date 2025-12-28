import { StyleSheet } from "react-native";
import SettingsModal from "@/components/ui/settings/SettingsModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProfile } from "@/components/hooks/useProfile";
import ProfileHeader from "@/components/ui/profile/ProfileHeader";
import ProfileInfo from "@/components/ui/profile/ProfileInfo";

export default function Profile() {
  const { userData, colors, modalOpen, setModalOpen } = useProfile();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <SettingsModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      
      <ProfileHeader setModalOpen={setModalOpen} />
      
      <ProfileInfo username={userData?.username} email={userData?.email} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
