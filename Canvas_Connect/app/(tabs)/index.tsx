import PreviousPosts from "@/components/ui/PreviousPosts";
import Colors from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen"

export default function Home() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.previousPostsContainer}>
        <Text style={styles.titleText}>Previous Posts</Text>
        
        <PreviousPosts />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingVertical: hp(2.5),
  },

  titleText: {
    fontFamily: "Nunito-BlackItalic",
    fontSize: hp(3),
    color: Colors.text,
    width: "90%",
    borderBottomColor: Colors.tertiary,
    borderBottomWidth: hp(0.25),
  },
  previousPostsContainer: {
    paddingLeft: wp(2.5),
  },
});
