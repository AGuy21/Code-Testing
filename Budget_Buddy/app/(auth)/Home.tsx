import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../constants/Colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import { AppContext } from '../_layout'

const Home = () => {
  /*
    This component will render the home screen and get + map all data
    we do both here to not cause slow preformance issues if we use contexts
    and run it from the layout tab and we cant use hooks for 
    DOM hook issues it will take the data from the sub collections
    map it and then render it.
  */  
  const appContext = React.useContext(AppContext); // This is used to refresh the screen

  const refresh = appContext?.refresh
  const setRefresh = appContext?.setRefresh

  const [ shown, setShown ] = useState('income') // This is used to show the income or expense data or both

  const [ loading, setLoading ] = useState(false)
  const [ incomeData, setIncomeData ] = useState<any>([]) // This is used to make all of the user data in an object
  const [ expenseData, setExpenseData ] = useState<any>([]) // This is used to make all of the user data in an object


  let tempIncomeData: { [key: string]:  [ string, number] } = {}; // This is used to make all of the user data in an object so it can be used in the leaderboard
  let tempExpenseData: { [key: string]:  [ string, number] } = {}; // This is used to make all of the user data in an object so it can be used in the leaderboard

  const user = useUser();
  
  const getData = async () => { 
    // gets all income data and returns it in a array
    const incomeDocRef = collection(FIREBASE_DB, 'User Data',  user.user?.emailAddresses[0]?.emailAddress, 'Income') // document refrence for user data fetching and saving
    const incomeDocSnap = await getDocs(incomeDocRef);
    // for every doc it makes it into its own key and value in the temp income object
    incomeDocSnap.forEach((doc) => {
      tempIncomeData[doc.data()?.Name] = [ doc.data()?.Frequency, doc.data()?.Amount]
    })

    // gets all expense data and returns it in a array
    const expenseDocRef = collection(FIREBASE_DB, 'User Data',  user.user?.emailAddresses[0]?.emailAddress, 'Expense') // document refrence for user data fetching and saving
    const expenseDocSnap = await getDocs(expenseDocRef);
    
    expenseDocSnap.forEach((doc) => {
      tempExpenseData[doc.data()?.Name] = [ doc.data()?.Frequency, doc.data()?.Amount]
    })
  } 

  const convertData = () => {
    // converts all income data
    const incomeDataArray = Object.entries(tempIncomeData).map(([name, data]) => ({
      name,
      frequency: data[0],
      amount: data[1],
    })); // takes in all data and sets it into an array
    setIncomeData(incomeDataArray); // sets const to newly made array
    console.log('-------------------')
    console.log('    Income Data    ')
    console.log('-------------------')
    console.log(incomeData)
    
    // converts all expense data
    const expenseDataArray = Object.entries(tempExpenseData).map(([name, data]) => ({
      name,
      frequency: data[0], 
      amount: data[1],
    })); 
    setExpenseData(expenseDataArray);

    console.log('-------------------')
    console.log('    Expense Data   ')
    console.log('-------------------')
    console.log(expenseData)
  }

  const getDataAndConvert = async () => { // this function gets all data and then converts it via async and awaiting data retrieval
    await getData();
    convertData();
  }

  useEffect(() => {
    if (refresh) {
      setLoading(true)
      getDataAndConvert();
      setLoading(false)
      setRefresh(false)
    } else {
      console.log('Didnt reload')
    }
  },[refresh])

  return (
    <View style={styles.container}>
      { loading ? (
        <View>
          <Text>
            Loading...
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.subContainer}>
            <Text>

            </Text>
          </View>

          <ScrollView style={styles.expenseContainer} showsVerticalScrollIndicator={false}>
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
        </>
      )}
    </View>
  )
}

export default Home

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
    expenseContainer: {
      backgroundColor: Colors.gray,
      width: wp(75),
      height: hp(25),
      borderRadius: wp(10),
      marginBottom: hp(2),
      paddingLeft: wp(4),
      position: 'absolute',
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