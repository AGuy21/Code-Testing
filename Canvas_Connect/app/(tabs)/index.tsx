import PreviousPosts from "@/components/ui/PreviousPosts";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  const { colors } = useThemeStore();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.previousPostsContainer}>
        <Text style={[styles.titleText, { color: colors.text, borderBottomColor: colors.tertiary }]}>Previous Posts</Text>
        
        <PreviousPosts />

      </View>
      <View style={styles.footer}>
        <Pressable style={[styles.newPostButton, { backgroundColor: colors.secondary }]} onPress={() => router.push("/create")} >
          <MaterialIcons name="draw" size={wp(10)} color={colors.text2} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp(2.5),
  },

  titleText: {
    fontFamily: "Nunito-BlackItalic",
    fontSize: hp(3),
    width: "90%",
    borderBottomWidth: hp(0.25),
  },
  previousPostsContainer: {
    paddingLeft: wp(2.5),
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  newPostButton: {
    marginRight: wp(5),
    borderRadius: hp(100),
    alignSelf:"flex-end",
    width: wp(15),
    height: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
  }
});
