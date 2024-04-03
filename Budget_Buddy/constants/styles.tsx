import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { ColorTypes } from "../constants/types";
/**
 * Styles for all componenets that change the theme of the app.
 * uses the AppContext to get the current theme colors.
 * so it can dynamically update styles all over the app in one place.
 * @returns A stylesheet object.
 */

export const useGetThemeChangingButtonsStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    themeBtn: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: hp(2),
      borderWidth: wp(0.225),
      borderRadius: wp(4),
      height: hp(5),
      width: wp(40),
    },
    buttonText: {
      fontFamily: "Lato-Reg",
      fontSize: wp(3),
    },
  });

export const useGetSplitStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    split: {
      flexDirection: "row",
      gap: wp(1),
      alignItems: "center",
      justifyContent: "center",
      marginBottom: hp(4),
    },
    splitText: {
      color: Colors?.primary,
      fontSize: wp(3.3),
      fontFamily: "Lato-Light",
    },
    splitLine: {
      width: wp(20),
      height: hp(0.1),
      backgroundColor: Colors?.primary,
    },
  });

export const useGetPaymentFrequencyStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    button: {
      width: wp(25),
      height: hp(5),
      borderRadius: hp(100),
      backgroundColor: Colors?.gray,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: wp(0.25),
      borderColor: Colors?.inactive,
    },
    activeButton: {
      width: wp(25),
      height: hp(5),
      borderRadius: hp(100),
      backgroundColor: Colors?.active,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: wp(0.25),
      borderColor: Colors?.primary,
    },
    activeButtonText: {
      color: Colors?.primary,
      fontFamily: "Lato-Reg",
      fontSize: wp(3),
    },
    buttonRowContainer: {
      width: wp(90),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    buttonText: {
      color: Colors?.inactive,
      fontFamily: "Lato-Reg",
      fontSize: wp(3),
    },
  });

/**
 * Returns the styles for the money progress bar component.
 * @param Colors - The color types for the component.
 * @returns The stylesheet object containing the styles for the money progress bar component.
 */
export const useGetMoneyProgressBarStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      height: hp(10),
      width: wp(95),
      backgroundColor: Colors?.gray,
      alignItems: "flex-start",
      justifyContent: "space-evenly",
      borderRadius: wp(5),
      paddingHorizontal: wp(5),
      borderWidth: wp(0.25),
      borderColor: Colors?.primary,
    },
    progressBarContainer: {
      flexDirection: "row",
      height: hp(2.5),
    },
    incomeIndicator: {
      display: "flex",
      backgroundColor: Colors?.income,
      borderRadius: wp(5),
      alignItems: "center",
      justifyContent: "center",
    },
    expenseIndicator: {
      display: "flex",
      backgroundColor: Colors?.expense,
      borderRadius: wp(5),
      alignItems: "center",
      justifyContent: "center",
    },
    expenseTextContainer: {
      width: wp(85),
      flexDirection: "row",
      paddingHorizontal: wp(5),
      marginTop: hp(1),
    },
    expenseText: {
      color: Colors?.expense,
      fontSize: wp(3),
      fontFamily: "Lato-Bold",
    },
    incomeText: {
      color: Colors?.income,
      fontSize: wp(3),
      fontFamily: "Lato-Bold",
    },
    moneyBarTextContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: wp(85),
    },
    moneyBarText: {
      color: Colors?.text,
      fontSize: wp(2.5),
      fontFamily: "Lato-Reg",
    },
  });

export const useGetLoginStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors?.background,
      paddingTop: hp(5),
      alignItems: "center",
      justifyContent: "center",
    },
    mainText: {
      color: Colors?.primary,
      fontSize: wp(6),
      fontFamily: "Lato-Bold",
    },
    input: {
      color: Colors?.primary,
      fontSize: wp(5),
      fontFamily: "Lato-Reg",
      width: wp(80),
      height: hp(5),
      borderWidth: wp(0.5),
      borderColor: Colors?.primary,
      borderRadius: 10,
      paddingLeft: wp(5),
      marginTop: hp(5),
    },
    signInButton: {
      width: wp(60),
      height: hp(5),
      borderWidth: wp(0.5),
      borderColor: Colors?.background,
      backgroundColor: Colors?.primary,
      opacity: 0.86,
      borderRadius: wp(100),
      alignItems: "center",
      justifyContent: "center",
      marginLeft: wp(10),
      marginVertical: hp(5),
    },
    signInButtonText: {
      fontFamily: "Lato-Bold",
      fontSize: wp(4),
      color: Colors?.background,
    },
  });

export const useGetLoaderStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    text: {
      fontSize: wp(3.5),
      color: Colors?.text,
      fontFamily: "Lato-Bold",
    },
  });
export const useGetFilterButtonRowStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    buttonRow: {
      backgroundColor: Colors?.gray,
      width: wp(100),
      height: hp(6),
      borderColor: Colors?.primary,
      borderWidth: wp(0.25),
      borderRightWidth: 0,
      borderLeftWidth: 0,
      flexDirection: "row",
      gap: wp(5),
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingHorizontal: wp(7),
    },
    button: {
      width: wp(25),
      height: hp(4),
      borderRadius: hp(100),
      backgroundColor: Colors?.gray,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: wp(0.25),
      borderColor: Colors?.inactive,
    },
    activeButton: {
      width: wp(25),
      height: hp(4),
      borderRadius: hp(100),
      backgroundColor: Colors?.inactive,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: wp(0.3),
      borderColor: Colors?.primary,
    },
    buttonText: {
      color: Colors?.text,
      fontFamily: "Lato-Bold",
      fontSize: wp(3.5),
      alignSelf: "center",
      paddingLeft: wp(2),
      paddingRight: wp(2),
    },
  });

export const useGetExpenseTypeStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    input: {
      fontSize: wp(3),
      color: Colors?.inactive,
      fontFamily: "Lato-Reg",
    },
    input2: {
      fontSize: wp(3),
      color: Colors?.active,
      fontFamily: "Lato-Reg",
    },
    box: {
      backgroundColor: Colors?.gray,
      width: wp(80),
      height: hp(5),
      borderRadius: hp(3),
      alignItems: "center",
    },
    dropdown: {
      backgroundColor: Colors?.gray,
      width: wp(80),
      height: hp(14),
      borderRadius: hp(1),
      justifyContent: "space-evenly",
    },
    dropdownItem: {
      backgroundColor: Colors?.gray,
      justifyContent: "center",
    },
    text: {
      color: Colors?.text,
      fontFamily: "Lato-Reg",
    },
  });
export const useGetDataContainerStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      // container used to be relative to the parent component
      alignItems: "center",
      justifyContent: "center",
      height: hp(50),
      width: wp(85),
    },
    dataContainer: {
      backgroundColor: Colors?.gray,
      width: wp(85),
      height: hp(50),
      borderColor: Colors?.primary,
      paddingHorizontal: wp(5),
      paddingBottom: hp(10),
      borderWidth: wp(0.25),
      borderBottomWidth: 0,
    },
    scrollDataContainer: {
      width: wp(85),
      height: hp(100),
    },
    loadingDataContainer: {
      backgroundColor: Colors?.gray,
      width: wp(85),
      height: hp(50),
      borderColor: Colors?.primary,
      borderWidth: wp(0.25),
      borderBottomWidth: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    expenseTextRow: {
      flexDirection: "row",
      gap: wp(3),
      height: hp(5),
      width: wp(85),
      alignItems: "center",
    },
    dataText: {
      color: Colors?.text,
      fontSize: wp(3),
      fontFamily: "Lato-Bold",
    },
  });
export const useGetDataContainerHeaderStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      width: wp(85),
      height: hp(6),
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      overflow: "hidden",
    },
    text: {
      color: Colors?.text,
      fontSize: wp(3),
      fontFamily: "Lato-Bold",
      overflow: "visible",
    },
    itemSegment: {
      backgroundColor: Colors?.gray,
      width: wp(85 / 4),
      height: hp(6),
      borderColor: Colors?.primary,
      borderWidth: wp(0.25),
      alignItems: "center",
      justifyContent: "center",
    },
  });
export const useGetLandingPageStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors?.background,
      alignItems: "center",
      justifyContent: "flex-end",
    },
    title: {
      color: "#ffffff",
      fontSize: wp(10),
      fontFamily: "Lato-Bold",
      fontWeight: "700",
      lineHeight: wp(10),
      textAlign: "center",
    },
    text: {
      color: "#ffffff",
      fontSize: wp(4),
      fontFamily: "Lato-Bold",
      fontWeight: "500",
      lineHeight: wp(8),
      textAlign: "center",
    },
    startedBtn: {
      backgroundColor: Colors?.primary,
      width: wp(60),
      height: hp(6),
      borderRadius: wp(60),
      alignItems: "center",
      justifyContent: "center",
      marginVertical: hp(10),
      marginHorizontal: wp(3),
    },
    btnText: {
      color: Colors?.text,
      fontFamily: "Lato-Bold",
      fontSize: wp(4),
    },
  });

export const useGetAmountSliderStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    input: {
      width: wp(15),
      height: hp(4),
      backgroundColor: Colors?.gray,
      borderRadius: wp(100),
      display: "flex",
      borderWidth: wp(0.25),
      borderColor: Colors?.inactive,
      opacity: 0.7,
      marginTop: hp(1),
      color: Colors?.primary,
      textAlign: "center",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      width: wp(90),
      height: hp(5),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: Colors?.primary,
      fontSize: wp(3.5),
      fontFamily: "Lato-Reg",
    },
  });

export const useGetSignUpScreenStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      height: hp(100),
      width: wp(100),
      resizeMode: "contain",
    },
    mainText: {
      color: Colors?.primary,
      fontSize: wp(6),
      fontFamily: "Lato-Bold",
      textAlign: "center",
    },
    input: {
      color: Colors?.primary,
      fontSize: wp(5),
      fontFamily: "Lato-Reg",
      width: wp(80),
      height: hp(5),
      borderWidth: wp(0.5),
      borderColor: Colors?.primary,
      borderRadius: 10,
      paddingLeft: wp(5),
      marginTop: hp(5),
    },
    signUpButton: {
      width: wp(60),
      height: hp(5),
      borderWidth: wp(0.5),
      borderColor: Colors?.background,
      backgroundColor: Colors?.primary,
      opacity: 0.86,
      borderRadius: wp(100),
      alignItems: "center",
      justifyContent: "center",
      marginLeft: wp(10),
      marginVertical: hp(5),
    },
    signUpButtonText: {
      fontFamily: "Lato-Bold",
      fontSize: wp(4),
      color: Colors?.background,
    },
  });

export const useGetAuthenticateStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      height: hp(100),
      width: wp(100),
      resizeMode: "contain",
    },
    mainText: {
      color: Colors?.primary,
      fontSize: wp(7),
      fontFamily: "Lato-Bold",
      marginBottom: hp(4),
    },
    signUpButton: {
      width: wp(60),
      height: hp(5),
      borderWidth: 1,
      borderColor: Colors?.primary,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
    },
    signUpButtonText: {
      fontFamily: "Lato-Bold",
      fontSize: wp(4),
      color: Colors?.primary,
    },
  });

export const useGetProfileStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors?.background,
    },
  });
export const useGetThemeSelectionStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    themeBtnCollumn: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: hp(30),
      width: wp(48),
      padding: wp(2.5),
    },
    themeButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingHorizontal: wp(2.5),
      height: hp(30),
      width: wp(95),
      backgroundColor: Colors?.gray,
      borderRadius: wp(5),
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderColor: Colors?.primary,
      borderWidth: wp(0.25),
      borderTopWidth: 0,
    },
    mainContainer: {
      height: hp(50),
      marginTop: hp(5),
    },
    themeButtonContainerHeader: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: hp(5),
      width: wp(95),
      backgroundColor: Colors?.gray,
      borderRadius: wp(5),
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderColor: Colors?.primary,
      borderWidth: wp(0.25),
    },
    themeButtonContainerHeaderText: {
      color: Colors?.text,
      fontSize: wp(5),
      fontFamily: "Lato-Bold",
    },
  });
export const useGetCreateExpenseScreenStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors?.background,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    titleText: {
      color: Colors?.primary,
      fontSize: wp(6),
      fontFamily: "Lato-Bold",
      marginBottom: hp(2),
    },
    subTitleText: {
      color: Colors?.primary,
      fontSize: wp(4),
      fontFamily: "Lato-Reg",
      marginBottom: hp(2),
    },
    mainText: {
      marginVertical: hp(2),
      color: Colors?.primary,
      fontSize: wp(4),
      fontFamily: "Lato-Reg",
      textAlign: "left",
    },
    input: {
      color: Colors?.primary,
      fontSize: wp(4),
      fontFamily: "Lato-Reg",
      width: wp(60),
      height: hp(5),
      borderWidth: wp(0.5),
      borderColor: Colors?.primary,
      borderRadius: 10,
      paddingLeft: wp(5),
      marginTop: hp(5),
    },
    button: {
      width: wp(60),
      height: hp(5),
      borderWidth: wp(0.5),
      borderColor: Colors?.background,
      backgroundColor: Colors?.primary,
      opacity: 0.86,
      borderRadius: wp(100),
      alignItems: "center",
      justifyContent: "center",
      marginVertical: hp(5),
    },
    buttonText: {
      fontFamily: "Lato-Bold",
      fontSize: wp(4),
      color: Colors?.background,
    },
  });

export const useGetHomeStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors?.background,
      alignItems: "center",
      justifyContent: "space-between",
    },
    topContainer: {
      alignItems: "center",
      justifyContent: "flex-start",
      gap: hp(10),
      flex: 1,
    },
    endContainer: {
      alignItems: "center",
      justifyContent: "flex-end",
      flex: 1.2,
    },
  });

export const useGetModifyScreenStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors?.background,
      flex: 1,
      alignItems: "center",
    },
    loadingContainer: {
      backgroundColor: Colors?.background,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      color: Colors?.text,
      fontSize: wp(6),
      fontFamily: "Lato-Bold",
      marginVertical: hp(2),
    },
  });

export const useGetModifyPanelStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      width: wp(85),
      height: hp(75),
      alignItems: "center",
      justifyContent: "center",
      paddingTop: hp(10),
    },
    mainContainer: {
      backgroundColor: Colors?.background,
      width: wp(95),
      height: hp(75),
    },
  });
export const useGetModifyButtonStyles = (Colors: ColorTypes) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors?.background,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      width: wp(60),
      height: hp(5),
      borderWidth: wp(0.5),
      borderColor: Colors?.primary,
      backgroundColor: Colors?.inactive,
      opacity: 1,
      borderRadius: wp(100),
      alignItems: "center",
      justifyContent: "center",
      marginVertical: hp(1),
    },
    buttonText: {
      fontFamily: "Lato-Bold",
      fontSize: wp(4),
      color: Colors?.text,
    },
  });
