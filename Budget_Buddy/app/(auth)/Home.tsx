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
import MoneyProgressBar from '../../components/rendered/MoneyProgressBar'

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

  const [ dependentComponents, setDependentComponents ] = useState<string>('Inactive') // This is used to make all of the user data in an object
  const [ totalExpense, setTotalExpense ] = useState<number>(0) // This is used to get the total amount in income
  const [ totalIncome, setTotalIncome ] = useState<number>(0) // This is used to get the total amount in income

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
    makeTotals(expenseDataArray, incomeDataArray)
  }
  // totals both income and expense data to be sent to the progress bar
  /**
   * Calculates the total expenses and total income based on the given expense and income arrays.
   * Updates the state with the calculated totals and sets the dependent components to active.
   * also multiplies the amounts based on frequency
   * @param expenseArray An array of expense objects.
   * @param incomeArray An array of income objects.
   */
  const makeTotals = (expenseArray: any[], incomeArray: any[]) => {
    let expenseTotal = 0;
    let incomeTotal = 0;
    
    for (let i = 0; i < expenseArray.length; i++) {
      if (expenseArray[i].frequency === 'Weekly') {
        expenseTotal += expenseArray[i].amount * 4
      } else if (expenseArray[i].frequency === 'Bi-Weekly') {
        expenseTotal += expenseArray[i].amount * 2
      } else if (expenseArray[i].frequency === 'Monthly') {
        expenseTotal += expenseArray[i].amount 
      }
    }
    
    for (let i = 0; i < incomeArray.length; i++) {
      if (incomeArray[i].frequency === 'Weekly') {
        incomeTotal += incomeArray[i].amount * 4
      } else if (incomeArray[i].frequency === 'Bi-Weekly') {
        incomeTotal += incomeArray[i].amount * 2
      } else if (incomeArray[i].frequency === 'Monthly') {
        incomeTotal += incomeArray[i].amount 
      }
    }
    
    setTotalExpense(expenseTotal)
    setTotalIncome(incomeTotal)
    setDependentComponents('Active')
  }

  const getAndUseData = async () => { // this function gets all data and then converts it via async and awaiting data retrieval
    await getData();
    convertData();
  }

  const handleShowChange = (newState: string) => {
    setShow(newState); // sets shown to new state when changed from buttons
  }

  useEffect(() => {
    setLoading(true)
      if (refresh) {
        getAndUseData().then(() => { // gets all data and then converts it
          setLoading(false) // then sets loading to false
        })
        setRefresh(false)
      } else {
        console.log('Didnt reload')
      }
  },[refresh])
  
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ButtonRow sendDataToParent={handleShowChange} />
        { dependentComponents === 'Active' &&
          <MoneyProgressBar expenseTotal={totalExpense} incomeTotal={totalIncome} show={show}/>
        } 
      </View>

      <View style={styles.endContainer}>
        <DataContainer 
          show={show} 
          expenseData={expenseData} 
          incomeData={incomeData} 
          loading={loading}
        />
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,  
        backgroundColor: Colors.background,
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
      backgroundColor: Colors.background,
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: hp(75),
      width: wp(85),
    },
})