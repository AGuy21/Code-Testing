import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import moment from 'moment'

const time = () => {

  return (
    <View>
      <Text>{moment().add(1, 'days').calendar()}</Text>
    </View>
  )
}

export default time

