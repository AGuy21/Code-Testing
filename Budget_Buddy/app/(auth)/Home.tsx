import { StyleSheet, View } from 'react-native'
import React, {  useState } from 'react'
import Colors from '../../constants/Colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DataContainer from '../../components/rendered/DataContainer'
import ButtonRow from '../../components/rendered/ButtonRow'
import MoneyProgressBar from '../../components/rendered/MoneyProgressBar'
import useFetchUsableData from '../../components/hooks/useFetchUsableData'

/**
 * Renders the Home component.
 * 
 * @returns JSX.Element
 */
const Home = () => {
  const [show, setShow] = useState<string>('All')

  /**
   * Handles the change of the show state.
   * @param {string} show - The new value for the show state.
   */
  
  const handleShowChange = (show: string) => {
    setShow(show)
  }

  const {
    incomeData,
    expenseData,
    loading,
    totalExpense,
    totalIncome,
  } = useFetchUsableData()

  
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ButtonRow sendDataToParent={handleShowChange} />
        <MoneyProgressBar 
          expenseTotal={totalExpense || 1} 
          incomeTotal={totalIncome || 1}  
          show={show}
          incomeData={incomeData}
          expenseData={expenseData}
        />
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