import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'

const Home = () => {
  /*
    This component will render the home screen and get + map all data
    we do both here to not cause slow preformance issues if we use contexts
    and run it from the layout tab and we cant use hooks for 
    DOM hook issues it will take the data from the sub collections
    map it and then render it.
  */  
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
    setLoading(true)
    getDataAndConvert();
    setLoading(false)
  },[])

  return (
    <View>
      <Text>Home</Text>

      { loading ? (
        <View>
          <Text>
            Loading...
          </Text>
        </View>
      ) : (
        <View>
          <Text> Data </Text>

          <FlatList 
            data={incomeData} 
            keyExtractor={(item) => item.name}
            renderItem={({ item}) => (
              <View>
                <Text>
                  {item.name}  

                  {item.frequency}   

                  {item.amount}   
                </Text>
              </View>
            )}
          />

        </View>
      )}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    
})