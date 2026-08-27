import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../../constants/theme'

const Divider = () => {
  return (
    
    <View style={{marginVertical: theme.spacing.sm}} >
        <View style={{height: 1, backgroundColor: theme.colors.border, marginVertical: theme.spacing.sm}} />
    </View>
  )
}

export default Divider
