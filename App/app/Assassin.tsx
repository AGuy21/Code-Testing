import { AppRegistry, Text, View, StyleSheet, TouchableOpacity, Dimensions, Image, Button, SafeAreaView, TouchableWithoutFeedback, StatusBar, AccessibilityInfo } from 'react-native';
import React, { Component, useContext, useEffect } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

import globalStyles from '../styles/globalStyles';
import { COLORS } from '../styles/COLORS';
import { UserContext } from './_layout';
import { Stack, router } from 'expo-router';


export default function AssassinScreen( ) {
    const userContext = React.useContext(UserContext)

    const username = userContext?.username


    return(
        <View style={{ backgroundColor: COLORS.background3}}>
          <StatusBar backgroundColor={COLORS.background3} barStyle='dark-content' />
            <Stack.Screen  options={{
                headerTitle: 'The Shadow Assassins',
                headerTitleAlign: 'center',
                headerTintColor: COLORS.assassin,
                headerTitleStyle: {
                  color: COLORS.assassin,
                  fontSize: wp(5),
                  fontWeight: 'bold',
                },
                headerStyle: {
                  backgroundColor: COLORS.background3,
                }
              }}
            />
            <View style={globalStyles.assassinContainer}>
                <Text style={globalStyles.selectionText}> {username} The Assassin!</Text>
                <View style={globalStyles.imageContainer}> 
                <View style={globalStyles.margin} />
                <View style={globalStyles.margin} />
                <Image 
                    source={require('../assets/images/Assassin.png')}
                    style={{ height: deviceHeight/2.1, width: deviceWidth/1.75, opacity: 1.0 }}
                />
                </View>
                <View style={globalStyles.caption}>
                    <View style={globalStyles.captionInt}>
                        <View style= {{ opacity: 1.0, }}>
                            <Text style={globalStyles.text}> 
                                The Shadow Assassin has a lethal poisin-tipped dagger and crossbow combo that can vanquish his enemies in one foul swoop. He is then able to use all his weapons with utmost efficency with his "Cloak of the Shadows"
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={globalStyles.margin} />
                <TouchableOpacity style={{
                    height: deviceHeight/10,
                    width: deviceWidth/3,
                    borderWidth: deviceWidth/50,
                    borderRadius: deviceWidth/20,
                    borderColor: COLORS.background1,
                    backgroundColor: COLORS.background2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: deviceHeight/16,
                }} onPress={() => router.replace('/(drawer)/(tabs)')}>
                    <Text style={globalStyles.assassinText}>
                            Select 
                    </Text> 
                </TouchableOpacity>
            </View>
        </View>
    )
}