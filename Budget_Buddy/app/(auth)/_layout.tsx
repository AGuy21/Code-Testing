import React from 'react';

import { Tabs } from 'expo-router';
import { View } from'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

import { useUser } from '@clerk/clerk-react';


export default function SignedInNavigator() {

  /*
    This is the tabs layout file where
    when the tabs are icons with no text
    and when clicks will show a border under
    the icons to signify that they are active
  */

  const user = useUser();




  return (
      <Tabs screenOptions={{
        tabBarActiveBackgroundColor: Colors.gray,
        tabBarInactiveBackgroundColor: Colors.gray,

        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.white,
        
        tabBarStyle: { // adds red to top of tab bar
          borderTopColor: Colors.primary,
          borderTopWidth: hp(.15),
        }
      }}>

        <Tabs.Screen name="index" options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: hp(1), gap: hp(.2)}}>

              <Ionicons name="add" size={size} color={color} />
              {focused && (
                <View
                  style={{
                    borderRadius: hp(1), // make it rounded
                    borderWidth: hp(.15),
                    borderColor: "red", // red border
                    width: size*1.2,
                  }}
                />
              )}
            </View>
          ),
        }}/>

        <Tabs.Screen name="Home" options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: hp(1), gap: hp(.2)}}>
              <Entypo name="home" size={size} color={color} />
              {focused && (
                <View
                  style={{
                    borderRadius: hp(1), // make it rounded
                    borderWidth: hp(.15),
                    borderColor: "red", // red border
                    width: size*1.2,
                  }}
                />
              )}
            </View>
          ),

        }}/>

        <Tabs.Screen name="Profile" options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: hp(1), gap: hp(.2)}}>
              <Ionicons name="settings-sharp" size={size} color={color} />
              {focused && (
                <View
                  style={{
                    borderRadius: hp(1), // make it rounded
                    borderWidth: hp(.15),
                    borderColor: "red", // red border
                    width: size*1.2,
                  }}
                />
              )}
            </View>
          ),
        }}/>

      </Tabs>
  )
}
