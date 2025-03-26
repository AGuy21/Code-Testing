import { SignOutButton } from "@/components/SignOutButton";
import Colors from "@/constants/Colors";
import { StyleSheet, Text, View, Image} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.pictureContainer}>
        <Image style={styles.picture} source={require('../../assets/images/react-logo.png')} onError={require('../../assets/images/Canvas-Connect-BG-Idea.png')}/>
      </View>
      {/* <SignOutButton /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: 'center',
  },
  pictureContainer: {
    width: wp(60),
    height: wp(60),
    marginTop: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: wp(50),
    height: wp(50),
    borderRadius: 999,
    borderWidth: wp(.4),
    borderColor: Colors.secondary,
  },
});
