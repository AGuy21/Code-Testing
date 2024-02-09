import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tabs, { Tabs } from 'expo-router/tabs'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen 
            name='list' 
            options={{ headerTitle: 'List' }} 
        />
        <Tabs.Screen 
            name='Details' 
            options={{ headerTitle: 'Details' }} 
        />
    </Tabs>
  )
}

export default _layout
