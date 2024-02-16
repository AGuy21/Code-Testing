import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../constants/Colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AppContext } from '../_layout'
import DataContainer from '../../components/rendered/DataContainer'
import ButtonRow from '../../components/rendered/ButtonRow'

const Home = () => {
  /*
    This component will take all user data
    add it to dictionaries with paired values
    to then be mapped into an array so it can
    be used in a flatlist that is 
    <DataContainer /> with its needed paramaters
    coming from this component
  */  
  const appContext = React.useContext(AppContext); // This is used to refresh the screen

  const refresh = appContext?.refresh
  const setRefresh = appContext?.setRefresh

  const user = useUser();
  const [ show, setShow ] = useState<string>('All') // This is used to show the income or expense data or both

  const [ loading, setLoading ] = useState<boolean>(false)
  const [ incomeData, setIncomeData ] = useState<any[]>([]) // This is used to make all of the user data in an object
  const [ expenseData, setExpenseData ] = useState<any[]>([]) // This is used to make all of the user data in an object


  let tempIncomeData: { [key: string]:  [ string, number] } = {}; // This is used to make all of the user data in an object so it can be used in the leaderboard
  let tempExpenseData: { [key: string]:  [ string, number] } = {}; // This is used to make all of the user data in an object so it can be used in the leaderboard

  
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
    
    // converts all expense data
    const expenseDataArray = Object.entries(tempExpenseData).map(([name, data]) => ({
      name,
      frequency: data[0], 
      amount: data[1],
    })); 

    setExpenseData(expenseDataArray);
  }

  const getDataAndConvert = async () => { // this function gets all data and then converts it via async and awaiting data retrieval
    await getData();
    convertData();
  }

  const handleShowChange = (newState: string) => {
    setShow(newState); // sets shown to new state when changed from buttons
  }

  useEffect(() => {
    setLoading(true)
      if (refresh) {
        getDataAndConvert().then(() => { // gets all data and then converts it
          setLoading(false) // then sets loading to false
        })
        setRefresh(false)
      } else {
        console.log('Didnt reload')
      }
  },[refresh])
  
  return (
    <View style={styles.container}>

      <ButtonRow sendDataToParent={handleShowChange} />
      
      <DataContainer 
        show={show} 
        expenseData={expenseData} 
        incomeData={incomeData} 
        loading={loading}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,  
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subContainer: {
      backgroundColor: Colors.background,
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: hp(75),
      width: wp(85),
    },
})