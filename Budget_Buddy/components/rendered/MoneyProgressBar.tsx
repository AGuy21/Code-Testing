import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface MoneyProgressBarProps {
  expenseTotal: number;
  incomeTotal: number;
}

const MoneyProgressBar: React.FC<MoneyProgressBarProps> = ({ expenseTotal, incomeTotal }) => {

  return (
    <View>
      <View style={[styles.progressBar, { width: `${expenseTotal}%` }]} />
      <View style={[styles.progressBar, { width: `${incomeTotal}%` }]} />
      <Text>MoneyProgressBar</Text>
    </View>
  )
}

export default MoneyProgressBar

const styles = StyleSheet.create({
  progressBar: {
    height: 10,
    backgroundColor: 'green',
    marginBottom: 5,
  },
})