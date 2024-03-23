import { View, Text, Button } from 'react-native'
import React from 'react'
import { AppContext } from '../../app/_layout'

const ModifySubmitButton = () => {
    const appContext = React.useContext(AppContext)
    const setRefresh = appContext?.setRefresh
    const HandleSubmit = async () => {
        setRefresh(true)
    }
  return (
    <View>
      <Button title='Submit' onPress={() => HandleSubmit()}/>
    </View>
  )
}

export default ModifySubmitButton