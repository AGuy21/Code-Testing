import PreviousPosts from "@/components/ui/home/PreviousPosts";
import CreatePostButton from "@/components/ui/home/CreatePostButton";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"

export default function Home() {
  const { colors } = useThemeStore();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.previousPostsContainer}>
        <PreviousPosts />
      </View>
      <View style={styles.footer}>
        <CreatePostButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp(2.5),
  },

  previousPostsContainer: {
    paddingLeft: wp(2.5),
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
