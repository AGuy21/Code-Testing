import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.gray
    }}>
        <Tabs.Screen name='home' options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color, size}) => <Ionicons  name="home" size={size} color={color}/>
        }}/>
        <Tabs.Screen name='favourite' options={{
            title: 'Favourites',
            headerShown: false,
            tabBarIcon: ({color, size}) => <Ionicons  name="heart" size={size} color={color}/>
        }}/>
        <Tabs.Screen name='inbox' options={{
            title: 'Inbox',
            headerShown: false,
            tabBarIcon: ({color, size}) => <Ionicons  name="chatbubble" size={size} color={color}/>
        }}/>
        <Tabs.Screen name='profile' options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({color, size}) => <Ionicons  name="people-circle" size={size} color={color}/>
        }}/>
    </Tabs>
  )
}