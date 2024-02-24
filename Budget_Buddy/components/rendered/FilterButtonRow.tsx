import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

/**
 * Props for the ButtonRow component.
 */
interface FilterButtonRowProps {
    /**
     * Function to send data to the parent component.
     * @param name - The name to be sent to the parent component.
     */
    sendDataToParent: (name: string) => void;
}

/**
 * ButtonRow component renders a row of filter buttons.
 * @param {Object} props - The component props.
 * @param {Function} props.sendDataToParent - A function to send data to the parent component.
 * @returns {JSX.Element} - The rendered ButtonRow component.
 */
const FilterButtonRow: React.FC<FilterButtonRowProps> = ({ sendDataToParent }) => {

    const [ show, setShow ] = useState<string>('All')
    
    /**
     * Handles the click event of a filter button.
     * @param {string} name - The type of data to show.
     */
    function handleShow(name: string) {
        setShow(name)
        sendDataToParent(name)
    }
    
    /**
     * Renders a filter button.
     * @param {boolean} active - Indicates if the button is active.
     * @param {string} name - The name of the button.
     * @returns {JSX.Element} - The rendered filter button.
     */
    
    const FilterButton = ({ active, name}) => {
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
                <FilterButton active={true} name='All' />
            ) : (
                <FilterButton active={false} name='All' />
            )}
            { show === 'Income' ? (
                <FilterButton active={true} name='Income' />
            ) : (
                <FilterButton active={false} name='Income' />
            )}
            { show === 'Expenses' ? (
                <FilterButton active={true} name='Expenses' />
            ) : (
                <FilterButton active={false} name='Expenses' />
            )}
        </View>
    )
}

export default FilterButtonRow

const styles = StyleSheet.create({
    buttonRow: {
        backgroundColor: Colors.gray,
        width: wp(95),
        height: hp(6),
        borderColor: Colors.primary,
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