
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

/**
 * Styles for all componenets that change the theme of the app.
 * uses the AppContext to get the current theme colors.
 * so it can dynamically update styles all over the app in one place.
 * @returns A stylesheet object.
 */

type ColorTypes = {
    primary: string,
    background: string,
    income: string,
    expense: string,
    first: string,
    second: string,
    third: string,
    other: string,
    gray: string,
    gray60: string,
    white: string,
    white60: string,
    transparent: string,
  
  }

export const useGetThemeChangingButtonsStyles = (Colors: ColorTypes) => StyleSheet.create({
    themeBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp(2),
        backgroundColor: Colors?.background,
        borderRadius: wp(4),
        padding: wp(5),
      },
})


export const useGetSplitStyles = (Colors: ColorTypes) => StyleSheet.create({
    split: {
        flexDirection: 'row',
        gap: wp(1),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp(4)
    },
    splitText: {
        color: Colors?.primary,
        fontSize: wp(3.3),
        fontFamily: 'Lato-Light',
    },
    splitLine: {
        width: wp(20),
        height: hp(.1),
        backgroundColor: Colors?.primary,
    },
})

export const useGetPaymentFrequencyStyles = (Colors: ColorTypes) => StyleSheet.create({
    button: {
        width: wp(25),
        height: hp(5),
        borderRadius: hp(100),
        backgroundColor: Colors?.gray,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: wp(.25),
        borderColor: Colors?.white60,
    },
    activeButton: {
        width: wp(25),
        height: hp(5),
        borderRadius: hp(100),
        backgroundColor: Colors?.white60,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: wp(.25),
        borderColor: Colors?.primary,
    },
        activeButtonText: {
        color: Colors?.primary,
        fontFamily: 'Lato-Reg',
        fontSize: wp(3),
    },
        buttonRowContainer: {
        width: wp(90),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-evenly',
    },
        buttonText: {
        color: Colors?.white60,
        fontFamily: 'Lato-Reg',
        fontSize: wp(3),
    }
})

export const useGetMoneyProgressBarStyles = (Colors: ColorTypes) => StyleSheet.create({
    container: {
        height: hp(10),
        width: wp(95),
        backgroundColor: Colors?.gray,
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        borderRadius: wp(5),
        paddingHorizontal: wp(5),
        borderWidth: wp(.25),
        borderColor: Colors?.primary,
    },
    progressBarContainer: {
        flexDirection: 'row',
        height: hp(2.5),
    },
    incomeIndicator: {
        display: 'flex',
        backgroundColor: Colors?.income,
        borderRadius: wp(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    expenseIndicator: {
        display: 'flex',
        backgroundColor: Colors?.expense,
        borderRadius: wp(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    expenseTextContainer: {
        width: wp(85),
        flexDirection: 'row',
        paddingHorizontal: wp(5),
        marginTop: hp(1),
    },
    expenseText: {
        color: Colors?.expense,
        fontSize: wp(3),
        fontFamily: 'Lato-Bold'
    },
    incomeText: {
        color: Colors?.income,
        fontSize: wp(3),
        fontFamily: 'Lato-Bold'
    },
    moneyBarTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: wp(85),
    },
    moneyBarText: {
        color: Colors?.primary,
        fontSize: wp(2.5),
        fontFamily: 'Lato-Reg'
    }
})

export const useGetLoginStyles = (Colors: ColorTypes) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.background,
        paddingTop: hp(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainText: {
        color: Colors?.primary,
        fontSize: wp(6),
        fontFamily: 'Lato-Bold',
    },
    input: {
        color: Colors?.primary,
        fontSize: wp(5),
        fontFamily: 'Lato-Reg',
        width: wp(80),
        height: hp(5),
        borderWidth: wp(.5),
        borderColor: Colors?.primary,
        borderRadius: 10,
        paddingLeft: wp(5),
        marginTop: hp(5),
    },
    signInButton: {
        width: wp(60),
        height: hp(5),
        borderWidth: wp(.5),
        borderColor: Colors?.background,
        backgroundColor: Colors?.primary,
        opacity: 0.86,
        borderRadius: wp(100),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: wp(10),
        marginVertical: hp(5),
    },
    signInButtonText:{
        fontFamily: 'Lato-Bold',
        fontSize: wp(4),
        color: Colors?.background,
    }
})

export const useGetLoaderStyles = (Colors: ColorTypes) => StyleSheet.create({
    text: {
        fontSize: wp(3.5),
        color: Colors?.white,
        fontFamily: 'Lato-Bold'
    },
})
export const useGetFilterButtonRowStyles = (Colors: ColorTypes) => StyleSheet.create({
    buttonRow: {
        backgroundColor: Colors?.gray,
        width: wp(95),
        height: hp(6),
        borderColor: Colors?.primary,
        borderWidth: wp(.25),
        flexDirection: 'row',
        gap: wp(5),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: wp(7),
        borderRadius: wp(5)
    },
    button: {
        width: wp(25),
        height: hp(4),
        borderRadius: hp(100),
        backgroundColor: Colors?.gray,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: wp(.25),
        borderColor: Colors?.white60,
      },
      activeButton: {
        width: wp(25),
        height: hp(4),
        borderRadius: hp(100),
        backgroundColor: Colors?.white60,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: wp(.3),
      },
    buttonText: {
        color: Colors?.white,
        fontFamily: 'Lato-Bold',
        fontSize: wp(3.5),
        alignSelf: 'center',
        paddingLeft: wp(2),
        paddingRight: wp(2),
    }
})

export const useGetExpenseTypeStyles = (Colors: ColorTypes) => StyleSheet.create({
    input: {
        color: Colors?.white60,
        fontFamily: 'Lato-Reg',
    },
    input2: {
        color: Colors?.white,
        fontFamily: 'Lato-Reg',
    },
    box: {
        backgroundColor: Colors?.gray,
        width: wp(80),
        height: hp(5),
        borderRadius: hp(3),
        alignItems: 'center',
    },
    dropdown: {
        backgroundColor: Colors?.gray,
        width: wp(80),
        height: hp(14),
        borderRadius: hp(1),
        justifyContent: 'space-evenly'
    },
    dropdownItem: {
        backgroundColor: Colors?.gray,
        justifyContent: 'center',
    },
    text: {
        color: Colors?.white,
        fontFamily: 'Lato-Reg',
    }
})
export const useGetDataContainerStyles = (Colors: ColorTypes) => StyleSheet.create({
    container: { // container used to be relative to the parent component
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(50),
        width: wp(75),
        paddingBottom: hp(2.5),
    },
    dataContainer: {
        backgroundColor: Colors?.gray,
        width: wp(75),
        height: hp(50),
        borderColor: Colors?.primary,
        borderRadius: wp(10),
        padding: wp(5),  
        borderWidth: wp(.25),
    },
    loadingDataContainer: {
            height: hp(45),
            width: wp(70),
            alignItems: 'center',
            justifyContent: 'center',
    },
    expenseTextRow: {
        flexDirection: 'row',
        gap: wp(3),
        height: hp(5),
        width: wp(75),
        alignItems: 'center',

    },
    dataText: {
        color: Colors?.white,
        fontSize: wp(3),
        fontFamily: 'Lato-Bold'
    }
})

export const useGetLandingPageStyles = (Colors: ColorTypes) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.background,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    title: {
        color: '#ffffff',
        fontSize: wp(10),
        fontFamily: 'Lato-Bold',
        fontWeight: '700',
        lineHeight: wp(10),
        textAlign: 'center',
    },
    text: {
        color: '#ffffff',
        fontSize: wp(4),
        fontFamily: 'Lato-Bold',
        fontWeight: '500',
        lineHeight: wp(8),
        textAlign: 'center',
    },
    startedBtn: {
        backgroundColor: Colors?.primary,
        width: wp(60),
        height: hp(6),
        borderRadius: wp(60),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: hp(10),
        marginHorizontal: wp(3),
    },
    btnText: {
        color: Colors?.white,
        fontFamily: 'Lato-Bold',
        fontSize: wp(4),
    }
})

export const useGetAmountSliderStyles = (Colors: ColorTypes) => StyleSheet.create({
    input: {
        width: wp(15),
        height: hp(4),
        backgroundColor: Colors?.gray,
        borderRadius: wp(100),
        display: 'flex',
        borderWidth: wp(.25),
        borderColor: Colors?.white60,
        opacity: .7,
        marginTop: hp(1),
        color: Colors?.primary,
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: wp(90),
        height: hp(5),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    text: {
        color: Colors?.primary,
        fontSize: wp(3.5),
        fontFamily: 'Lato-Reg',
    }
})

export const useGetSignUpScreenStyles = (Colors: ColorTypes) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: hp(100),
        width: wp(100),
        resizeMode: 'contain',
    },
    mainText: {
        color: Colors?.primary,
        fontSize: wp(6),
        fontFamily: 'Lato-Bold',
        textAlign: 'center',
    },
    input: {
        color: Colors?.primary,
        fontSize: wp(5),
        fontFamily: 'Lato-Reg',
        width: wp(80),
        height: hp(5),
        borderWidth: wp(.5),
        borderColor: Colors?.primary,
        borderRadius: 10,
        paddingLeft: wp(5),
        marginTop: hp(5),
    },
    signUpButton: {
        width: wp(60),
        height: hp(5),
        borderWidth: wp(.5),
        borderColor: Colors?.background,
        backgroundColor: Colors?.primary,
        opacity: 0.86,
        borderRadius: wp(100),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: wp(10),
        marginVertical: hp(5),
    },
    signUpButtonText:{
        fontFamily: 'Lato-Bold',
        fontSize: wp(4),
        color: Colors?.background,
    }
})

export const useGetAuthenticateStyles = (Colors: ColorTypes) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: hp(100),
        width: wp(100),
        resizeMode: 'contain',
    },
    mainText: {
        color: Colors?.primary,
        fontSize: wp(7),
        fontFamily: 'Lato-Bold',
        marginBottom: hp(4)
    },
    signUpButton: {
        width: wp(60),
        height: hp(5),
        borderWidth: 1,
        borderColor: Colors?.primary,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpButtonText:{
        fontFamily: 'Lato-Bold',
        fontSize: wp(4),
        color: Colors?.primary,
    }
})

export const useGetProfileStyles = (Colors: ColorTypes) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors?.background,
    },
    themeButtonContainer: {
        flexDirection: 'row',
        gap: wp(5),
        marginTop: hp(5),
    }
})
export const useGetCreateExpenseScreenStyles = (Colors: ColorTypes) => StyleSheet.create({
    container: {
        backgroundColor: Colors?.background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: Colors?.primary,
        fontSize: wp(6),
        fontFamily: 'Lato-Bold',
        marginBottom: hp(2),
    },
    subTitleText: {
        color: Colors?.primary,
        fontSize: wp(4),
        fontFamily: 'Lato-Reg',
        marginBottom: hp(2),
    },
    mainText: {
        marginVertical: hp(2),
        color: Colors?.primary,
        fontSize: wp(4),
        fontFamily: 'Lato-Reg',
        textAlign: 'left'
    },
    input: {
        color: Colors?.primary,
        fontSize: wp(4),
        fontFamily: 'Lato-Reg',
        width: wp(60),
        height: hp(5),
        borderWidth: wp(.5),
        borderColor: Colors?.primary,
        borderRadius: 10,
        paddingLeft: wp(5),
        marginTop: hp(5),
    },
    button: {
        width: wp(60),
        height: hp(5),
        borderWidth: wp(.5),
        borderColor: Colors?.background,
        backgroundColor: Colors?.primary,
        opacity: 0.86,
        borderRadius: wp(100),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: hp(5),
    },
    buttonText:{
        fontFamily: 'Lato-Bold',
        fontSize: wp(4),
        color: Colors?.background,
    }
})

export const useGetHomeStyles = (Colors: ColorTypes) => StyleSheet.create({
    container: {
        flex: 1,  
        backgroundColor: Colors?.background,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    topContainer: {
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flex: 1,
    },
    endContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      position: 'relative',
      flex: 1.2,
    },
    subContainer: {
      backgroundColor: Colors?.background,
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: hp(75),
      width: wp(85),
    },
})

