import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../app/(tabs)/HomeScreen';
import FavouriteScreen from '../app/(tabs)/FavouriteScreen';
import ProfileScreen from '../app/(tabs)/ProfileScreen';
import Colors from '../constants/Colors';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
    }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => ( 
                <Ionicons name="search" size={size} color={color} />
            )
        }}/>
        <Tab.Screen name="Favourite" component={FavouriteScreen} options={{
            tabBarLabel: 'Favourite',
            tabBarIcon: ({ color, size }) => ( 
                <Ionicons name="heart" size={size} color={color} />
            )
        }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => ( 
                <Ionicons name="person" size={size} color={color} />
            )
        }}/>
    </Tab.Navigator>
  )
}