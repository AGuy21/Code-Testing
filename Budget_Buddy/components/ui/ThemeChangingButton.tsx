import React from "react";
import { Pressable, Text } from "react-native";
import { AppContext } from "../../app/_layout";
import colorLib from "../../constants/colorLib";
import { useGetThemeChangingButtonsStyles } from "../../constants/styles";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

interface ThemeChangeButtonProps {
  type: "Basic" | "Oceanic" | "Sunrise" | "Modern" | "Island" | "NightSky";
}

/**
 * A button component for changing the theme.
 * @param {string} type - The type of theme to change to can only be one of the following: 
 *  - "Basic", 
 *  - "Oceanic", 
 *  - "Sunrise", 
 *  - "Modern", 
 *  - "Island", 
 *  - "NightSky".
 */
export default function ThemeChangeButton({ type }: ThemeChangeButtonProps) {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;
  const styles = useGetThemeChangingButtonsStyles(Colors);

  const setColors = colorContext?.setColors;
  const user = useUser();
  const docRef = doc(FIREBASE_DB, "User Data", user.user?.emailAddresses[0].emailAddress!);

  /**
   * Handles the change of theme.
   * 
   * @param {string} change - The theme change to apply.
   * @returns {Promise<void>} - A promise that resolves when the theme change is applied.
   */
  const handleThemeChange = async (change: string): Promise<void> => {
    setColors(colorLib[change]);
    await updateDoc(docRef, { Theme: change });
  }

  return (
    <Pressable
      onPress={() => handleThemeChange(type)}
      style={[
        styles?.themeBtn,
        type === "Basic"
          ? {
              backgroundColor: colorLib.Basic.background,
              borderColor: colorLib.Basic.primary,
            }
          : type === "Oceanic"
          ? {
              backgroundColor: colorLib.Oceanic.background,
              borderColor: colorLib.Oceanic.primary,
            }
          : type === "Sunrise"
          ? {
              backgroundColor: colorLib.Sunrise.background,
              borderColor: colorLib.Sunrise.primary,
            }
          : type === "Modern"
          ? {
              backgroundColor: colorLib.Modern.background,
              borderColor: colorLib.Modern.primary,
            }
          : type === "Island"
          ? {
              backgroundColor: colorLib.Island.background,
              borderColor: colorLib.Island.primary,
            }
          : {
              backgroundColor: colorLib.NightSky.background,
              borderColor: colorLib.NightSky.primary,
            },
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          type === "Basic"
            ? {
                color: colorLib.Basic.text,
              }
            : type === "Oceanic"
            ? {
                color: colorLib.Oceanic.text,
              }
            : type === "Sunrise"
            ? {
                color: colorLib.Sunrise.text,
              }
            : type === "Modern"
            ? {
                color: colorLib.Modern.text,
              }
            : type === "Island"
            ? {
                color: colorLib.Island.text,
              }
            : {
                color: colorLib.NightSky.text,
              },
        ]}
      >
        Change to {type} theme
      </Text>
    </Pressable>
  );
}
