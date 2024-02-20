
import { StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Colors from '../../constants/Colors';
import { SelectList } from 'react-native-dropdown-select-list';

import { Entypo} from '@expo/vector-icons';

/**
 * Props for the ExpenseType component.
 */
interface ExpenseTypeProps {
    /**
     * Function to send data to the parent component.
     * @param val - The value to be sent to the parent component.
     */
    sendDataToParent: (val: string) => void;
    
    /**
     * Data received from the parent component.
     */
    typeDataToChild: string;
}

const ExpenseType: React.FC<ExpenseTypeProps> = ({ sendDataToParent, typeDataToChild}) => {

    const [selected, setSelected] = useState<string>('')

    const [ selectionMade, setSelectionMade] = useState<boolean>(false)
    /**
     * Represents the data for the dropdown in the ExpenseType component.
     */
    const data = [
        { key: '1', value: 'Expense' },
        { key: '2', value: 'Income' },
        { key: '3', value: 'Budget' },
    ];

    /**
     * Handles the selection of an expense type.
     * Sets the selectionMade state to true when a selection is made
     * and sends the selected data to the parent component.
     */
    const handleSelection = () => {
        setSelectionMade(true);
        sendDataToParent(selected);
    }
    
    useEffect(() => {
        setSelected(typeDataToChild) // when the typeDataToChild changes it will set the selectionMade to false
        if (typeDataToChild === '') { // when the typeDataToChild is empty it will set the selectionMade to false
            setSelectionMade(false) 
        }
    }, [typeDataToChild])

    return (
        <>
            { selectionMade ? ( // when selection is made it shows the same thing just the input text is now full opacity
                <SelectList 
                    setSelected={(val:string) => setSelected(val)} 
                    onSelect={() => handleSelection()}
                    data={data} 

                    save="value"
                    search={false}
                    placeholder='Select Expense Type'
                    
                    fontFamily='Lato-Reg'
                    
                    inputStyles={styles.input2}
                    dropdownTextStyles={styles.text}
                    dropdownItemStyles={styles.dropdownItem}
                    dropdownStyles={styles.dropdown}
                    boxStyles={styles.box}

                    arrowicon={<Entypo name="chevron-down" size={wp(4)} color={Colors.white} />}
                />
            ) : (
                <SelectList 
                    setSelected={(val:string) => setSelected(val)} 
                    onSelect={() => handleSelection()}
                    data={data} 

                    save="value"
                    search={false}
                    placeholder='Select Expense Type'
                    
                    fontFamily='Lato-Reg'

                    inputStyles={styles.input}
                    dropdownTextStyles={styles.text}
                    dropdownItemStyles={styles.dropdownItem}
                    dropdownStyles={styles.dropdown}
                    boxStyles={styles.box}

                    arrowicon={<Entypo name="chevron-down" size={wp(4)} color={Colors.white} />}
                />
            )}
        </>
    )
}

export default ExpenseType

const styles = StyleSheet.create({
    input: { // search input style
        color: Colors.white60,
        fontFamily: 'Lato-Reg',
    },
    input2: { // search input style 2
        color: Colors.white,
        fontFamily: 'Lato-Reg',
    },
    box: { // main dropdown click box style
        backgroundColor: Colors.gray,
        width: wp(80),
        height: hp(5),
        borderRadius: hp(3),
        alignItems: 'center',
    },
    dropdown: { // items that dropdown style
        backgroundColor: Colors.gray,
        width: wp(80),
        height: hp(14),
        borderRadius: hp(1),
        justifyContent: 'space-evenly'
    },
    dropdownItem: { // items that dropdown style
        backgroundColor: Colors.gray,
        justifyContent: 'center',
    },
    text: {
        color: Colors.white,
        fontFamily: 'Lato-Reg',
    }
})