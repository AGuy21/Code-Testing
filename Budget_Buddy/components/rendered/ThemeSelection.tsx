import { View, Text } from "react-native";
import React from "react";
import { useGetThemeSelectionStyles } from "../../constants/styles";
import { AppContext } from "../../app/_layout";
import ThemeChangeButton from "./ThemeChangingButton";

const ThemeSelection = () => {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetThemeSelectionStyles(Colors);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.themeButtonContainerHeader}>
        <Text style={styles.themeButtonContainerHeaderText}>
          Theme Selecter
        </Text>
      </View>
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
};

export default ThemeSelection;
