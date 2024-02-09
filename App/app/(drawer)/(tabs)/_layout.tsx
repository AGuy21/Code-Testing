
import React from 'react'
import { Tabs  } from 'expo-router'
import { MaterialCommunityIcons, MaterialIcons,  } from '@expo/vector-icons'; 


const _layout = () => {

  
  return (
    <Tabs screenOptions={{ 

      // tab bar options
      tabBarInactiveBackgroundColor: '#32243d',
      tabBarActiveBackgroundColor: '#32243d',
      tabBarActiveTintColor: '#a4add3', 

      // header options
      headerTitleAlign: 'center', 
      headerTintColor: '#a4add3', 
    }}>
      <Tabs.Screen name='index'  
      options={{
        tabBarLabel: 'Clicker', 
        // tab bar icon 
        tabBarIcon: (tabinfo) => { 
          return (
            <MaterialCommunityIcons name="cursor-default-click-outline" size={tabinfo.size} color={tabinfo.color} />
          )
        },
      }} />
        <Tabs.Screen name='Leaderboard'  
        options={{ 
          headerTitle: 'Leaderboard',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#32243d'
          },
          // tab bar icon 
          tabBarIcon: (tabinfo) => { 
            return (
              <MaterialIcons name='leaderboard' size={tabinfo.size} color={tabinfo.color} />
            )
          } 
        }} />
    </Tabs>
  )
}

export default _layout