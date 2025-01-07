import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Redirect } from "expo-router";
import Colors from "@/constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Button from "@/components/Button";

export default function Page() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <SignedIn>
        <Redirect href={"/(tabs)"} />
      </SignedIn>
      <SignedOut>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Canvas Connect
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            disabled={false}
            onPress={() => router.push("/(auth)/sign-in")}
            minWidth={wp(40)}
            minHeight={hp(6)}
            fontSize={wp(4.5)}
            bgColor={Colors.tertiary}
          >
            Sign In
          </Button>
          <Button
            disabled={false}
            onPress={() => router.push("/(auth)/sign-up")}
            minWidth={wp(40)}
            minHeight={hp(6)}
            fontSize={wp(4.5)}
            bgColor={Colors.tertiary}
          >
            Sign Up
          </Button>
        </View>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  buttonContainer: {
    paddingBottom: hp(5),
    flex: .5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: hp(5),
  },
  titleContainer: {
    paddingTop: hp(5),
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.primary,
    fontFamily: "Nunito-BlackItalic",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: wp(8),
  },
});
