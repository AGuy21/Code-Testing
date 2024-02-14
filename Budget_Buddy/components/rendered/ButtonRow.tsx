import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ButtonRow = ({ sendDataToParent}) => {
    /*  
        This component renders the button row on top
        of the data container so the user can change what
        they want to show in the data container as the 
        show state will be sent to the parent to be used
        by the data container
    */
    const [ show, setShow ] = useState<string>('All')
    
    function handleShow(name: string) { // this function takes in the type of data to show and shows it and sends it to parent
        setShow(name) // it shows it so it can change the button style when active
        sendDataToParent(name)
    }
    // this function takes in the name to pass to handle show and to render 
    // but it also takes in if it is active which happens when the if statement before use is true
    const Button = ({ active, name}) => {
        if (active) {
            return (
                <TouchableOpacity style={styles.activeButton} >
                    <Text style={styles.buttonText}>
                        {name}
                    </Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.button} onPress={() => handleShow(name)} >
                    <Text style={styles.buttonText}>
                        {name}
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={styles.buttonRow}>
            { show === 'All' ? (
                <Button active={true} name='All' />
            ) : (
                <Button active={false} name='All' />
            )}
            { show === 'Income' ? (
                <Button active={true} name='Income' />
            ) : (
                <Button active={false} name='Income' />
            )}
            { show === 'Expenses' ? (
                <Button active={true} name='Expenses' />
            ) : (
                <Button active={false} name='Expenses' />
            )}
        </View>
    )
}

export default ButtonRow

const styles = StyleSheet.create({
    buttonRow: {
        backgroundColor: Colors.gray,
        width: wp(95),
        height: hp(6),
        marginBottom: hp(20),
        borderColor: Colors.primary,
        borderWidth: wp(.25),
        borderTopRightRadius: wp(10),
        borderTopLeftRadius: wp(10),
        flexDirection: 'row',
        gap: wp(5),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: wp(7),
    },
    button: {
        width: wp(25),
        height: hp(4),
        borderRadius: hp(100),
        backgroundColor: Colors.gray,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: wp(.25),
        borderColor: Colors.white60,
      },
      activeButton: {
        width: wp(25),
        height: hp(4),
        borderRadius: hp(100),
        backgroundColor: Colors.white60,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: wp(.3),
        borderColor: Colors.primary,
      },
    buttonText: {
        color: Colors.white,
        fontFamily: 'Lato-Bold',
        fontSize: wp(3.5),
        alignSelf: 'center',
        paddingLeft: wp(2),
        paddingRight: wp(2),
    }
})