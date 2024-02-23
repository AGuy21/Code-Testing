
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../constants/Colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import Loader from './Loader';

/**
 * Props for the DataContainer component.
 */
interface DataContainerProps {
    show: string;
    incomeData: any[];
    expenseData: any[];
    loading: boolean;
}

/**
 * Renders a container component that displays income or expense data based on the selected show prop.
 * 
 * @component
 * @param {object} props - The component props.
 * @param {string} props.show - The selected show prop, which determines whether to display income or expense data.
 * @param {array} props.incomeData - The array of income data to be displayed.
 * @param {array} props.expenseData - The array of expense data to be displayed.
 * @param {boolean} props.loading - A boolean value indicating whether the data is currently loading.
 * @returns {JSX.Element} The rendered DataContainer component.
 */

const DataContainer: React.FC<DataContainerProps> = ({ show, incomeData, expenseData, loading }) => {

  return (
    <View style={styles.container}>
        { show === 'Income' &&
            <ScrollView style={styles.dataContainer} showsVerticalScrollIndicator={false}>
                { loading &&
                    <View style={styles.loadingDataContainer}>
                        <Loader />
                    </View>
                }
                {/* Income Data  */}
                <FlatList
                    scrollEnabled={false}
                    data={incomeData} 
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item}) => (
                    <View style={styles.expenseTextRow}>
                        {/*The first 3 items of the array will be color identified for progress bar*/ }
                        <Entypo name="dot-single" size={wp(8)} color={ 
                            item.name === incomeData[0].name ? 'red' 
                            : 
                            item.name === incomeData[1].name ? 'orange'
                            :
                            item.name === incomeData[2].name ? 'yellow'
                            : 
                            'gray'
                        }/>
                        <Text style={styles.dataText}>
                            {item.name}  
                        </Text>
                        <Text style={styles.dataText}>
                            {item.frequency}   
                        </Text>
                        <Text style={styles.dataText}>
                            ${item.amount}   
                        </Text>
                    </View>
                    )}
                />
            </ScrollView>
        }
        { show === 'Expenses' &&
            <ScrollView style={styles.dataContainer} showsVerticalScrollIndicator={false}>
                { loading &&
                    <View style={styles.loadingDataContainer}>
                        <Loader />
                    </View>
                }
                {/* Expense Data  */}
                <FlatList 
                    scrollEnabled={false}
                    data={expenseData} 
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item}) => (
                    <View style={styles.expenseTextRow}>
                        {/*The first 3 items of the array will be color identified for progress bar*/ }
                        <Entypo name="dot-single" size={wp(8)} color={ 
                                item.name === expenseData[0].name ? 'red' 
                                : 
                                item.name === expenseData[1].name ? 'orange'
                                :
                                item.name === expenseData[2].name ? 'yellow'
                                : 
                                'gray'
                            }/>
                        <Text style={styles.dataText}>
                            {item.name}  
                        </Text>
                        <Text style={styles.dataText}>
                            {item.frequency}   
                        </Text>
                        <Text style={styles.dataText}>
                            ${item.amount}   
                        </Text>
                    </View>
                    )}
                />
            </ScrollView>
        }
        { show === 'All' && 
            <ScrollView style={styles.dataContainer} showsVerticalScrollIndicator={false}>  
                { loading &&
                    <View style={styles.loadingDataContainer}>
                        <Loader />
                    </View>
                }
                {/* Income Data  */}
                <FlatList
                    scrollEnabled={false}
                    data={incomeData} 
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item}) => (
                    <View style={styles.expenseTextRow}>
                        <Entypo name="dot-single" size={wp(8)} color='lime'/>
                        <Text style={styles.dataText}>
                            {item.name}  
                        </Text>
                        <Text style={styles.dataText}>
                            {item.frequency}   
                        </Text>
                        <Text style={styles.dataText}>
                            ${item.amount}   
                        </Text>
                    </View>
                    )}
                />
                {/* Expense Data  */}
                <FlatList 
                    scrollEnabled={false}
                    data={expenseData} 
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item}) => (
                    <View style={styles.expenseTextRow}>
                        <Entypo name="dot-single" size={wp(8)} color='yellow' />
                        <Text style={styles.dataText}>
                            {item.name}  
                        </Text>
                        <Text style={styles.dataText}>
                            {item.frequency}   
                        </Text>
                        <Text style={styles.dataText}>
                            ${item.amount}   
                        </Text>
                    </View>
                    )}
                />
            </ScrollView> 
        }
    </View> 
  )
}

export default DataContainer

const styles = StyleSheet.create({
    container: { // container used to be relative to the parent component
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(50),
        width: wp(75),
        paddingBottom: hp(2.5),
    },
    dataContainer: {
      backgroundColor: Colors.gray,
      width: wp(75),
      height: hp(50),
      borderColor: Colors.primary,
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
      color: Colors.white,
      fontSize: wp(3),
      fontFamily: 'Lato-Bold'
    }

})