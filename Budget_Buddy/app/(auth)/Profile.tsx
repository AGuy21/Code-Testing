import { View, Text } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { AppContext } from "../_layout";
import { useGetProfileStyles } from "../../constants/styles";
import ThemeSelection from "../../components/ui/ThemeSelection";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Profile() {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetProfileStyles(Colors);
  const user = useUser();

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: Colors?.text,
          fontSize: wp(5),
          fontFamily: "Lato-Bold",
          marginBottom: hp(1),
        }}
      >
        Signed in as:
      </Text>
      <Text
        style={{
          color: Colors?.primary,
          fontSize: wp(3),
          fontFamily: "Lato-Bold",
        }}
      >
        {user.user?.emailAddresses[0].emailAddress}!
      </Text>

      <ThemeSelection />
    </View>
  );
}
