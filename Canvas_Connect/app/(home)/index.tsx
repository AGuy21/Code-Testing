import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import {  router } from "expo-router";
import {  View, StyleSheet, Image } from "react-native";
import { Redirect } from "expo-router";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Button from "@/components/ui/Button";

export default function Page() {
  const { colors } = useThemeStore();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SignedIn>
        <Redirect href={"/(tabs)"} />
      </SignedIn>
      <SignedOut>
        <Image
          source={require("../../assets/images/Background3.png")}
          style={styles.title}
        />
        <View style={styles.buttonContainer}>
          <Button
            disabled={false}
            onPress={() => router.push("/(auth)/sign-in")}
            minWidth={wp(40)}
            minHeight={hp(6)}
            fontSize={wp(4.5)}
            bgColor={colors.tertiary}
          >
            Sign In
          </Button>
          <Button
            disabled={false}
            onPress={() => router.push("/(auth)/sign-up")}
            minWidth={wp(40)}
            minHeight={hp(6)}
            fontSize={wp(4.5)}
            bgColor={colors.tertiary}
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
    height: hp(200),
    width: wp(100),
  },
  buttonContainer: {
    paddingTop: hp(5),
    paddingBottom: hp(5),
    alignItems: "center",
    justifyContent: "flex-start",
    gap: wp(3),
    flexDirection: "row",
  },
  title: {
    justifyContent: "center",
    width: wp(95),
    height: hp(50),
  },
});
