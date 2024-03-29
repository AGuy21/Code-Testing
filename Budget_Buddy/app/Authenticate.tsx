import {
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import Login from "../components/ui/Login";
import Split from "../components/ui/Split";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { AppContext } from "./_layout";
import { useGetAuthenticateStyles } from "../constants/styles";

/**
 * Renders the authentication screen.
 *
 * @returns JSX.Element representing the authentication screen.
 */
export default function Authenticate() {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetAuthenticateStyles(Colors);

  return (
    <ImageBackground
      source={require("../assets/images/Login_BG.jpg")}
      style={styles.image}
    >
      <LinearGradient
        colors={[Colors?.background, Colors?.transparent]}
        style={styles.container}
        start={{ x: 0, y: 0.15 }}
      >
        <Text style={styles.mainText}>Login!</Text>

        <Login />
        <Split />

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => router.navigate("SignUpScreen")}
        >
          <Text style={styles.signUpButtonText}>Sign Up!</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
}
