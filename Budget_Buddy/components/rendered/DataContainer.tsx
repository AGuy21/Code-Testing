import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';

const DataContainer = ({ show, incomeData, expenseData }) => {
    /*
    
    */
  return (
    <>
    { show === 'Income' &&
    <ScrollView style={styles.dataContainer} showsVerticalScrollIndicator={false}>
      {/* Income Data  */}
      <FlatList
        scrollEnabled={false}
        data={incomeData} 
        keyExtractor={(item) => item.name}
        renderItem={({ item}) => (
          <View style={styles.expenseTextRow}>
            <Entypo name="dot-single" size={wp(8)} color='lime' />
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
  { show === 'Expense' &&
    <ScrollView style={styles.dataContainer} showsVerticalScrollIndicator={false}>
      {/* Expense Data  */}
      <FlatList 
        scrollEnabled={false}
        data={expenseData} 
        keyExtractor={(item) => item.name}
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
  { show === 'All' &&
    <ScrollView style={styles.dataContainer} showsVerticalScrollIndicator={false}>
      {/* Income Data  */}
      <FlatList
        scrollEnabled={false}
        data={incomeData} 
        keyExtractor={(item) => item.name}
        renderItem={({ item}) => (
          <View style={styles.expenseTextRow}>
            <Entypo name="dot-single" size={wp(8)} color='lime' />
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
        keyExtractor={(item) => item.name}
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
  </>
  )
}

export default DataContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,  
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    subContainer: {
      backgroundColor: Colors.background,
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: hp(75),
      width: wp(85),
    },
    dataContainer: {
      backgroundColor: Colors.gray,
      width: wp(95),
      height: hp(20),
      borderRadius: wp(10),
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      marginBottom: hp(2),
      paddingLeft: wp(4),
      position: 'absolute',
      borderColor: Colors.primary,
      borderWidth: wp(.25),
      borderBottomWidth: 0,
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