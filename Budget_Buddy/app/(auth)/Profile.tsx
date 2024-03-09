import { View, Text } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import ThemeChangeButton from "../../components/rendered/ThemeChangingButton";
import { AppContext } from "../_layout";
import { useGetProfileStyles } from "../../constants/styles";

export default function Profile() {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetProfileStyles(Colors);
  const user = useUser();

  return (
    <View style={styles.container}>
      <Text style={{ color: Colors?.primary }}>
        {" "}
          {user.user?.emailAddresses[0].emailAddress}
        {" "}
      </Text>

      <View style={styles.themeButtonContainer}>
        <View style={styles.themeBtnCollumn}>
          <ThemeChangeButton type="Basic" />
          <ThemeChangeButton type="Oceanic" />
          <ThemeChangeButton type="Sunrise" />
        </View>
        <View style={styles.themeBtnCollumn}>
          <ThemeChangeButton type="Modern" />
          <ThemeChangeButton type="Island" />
          <ThemeChangeButton type="NightSky" />
        </View>
      </View>
    </View>
  );
}
