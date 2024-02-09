
import 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import React from 'react';
import { CountContext, TransmutatorContext, UserContext } from '../_layout';
import 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../styles/COLORS';

function CustomDrawerContent(props: any) {
    const userContext = React.useContext(UserContext)
    const transContext = React.useContext(TransmutatorContext)
    const countContext = React.useContext(CountContext)

    const multi = countContext?.multiplier
    const autoClick = countContext?.autoClickerValue

    const atk = transContext?.attack
    const def = transContext?.defense
    const trp = transContext?.troops
    const pwr = transContext?.power

    const character = userContext?.character
    const user = userContext?.username
    return (
        <View style={{ flex: 1}}>
            <DrawerContentScrollView 
                {...props} 
                scrollEnabled={false}
                contentContainerStyle={{ 
                    backgroundColor: character === 1 ? COLORS.background2 : COLORS.background3,
                    flex: 1
                }}
            >

                <DrawerItemList {...props} />
                {/* <DrawerItem label={'Logout'} onPress={() => router.replace('/')}/> */}
            </DrawerContentScrollView>
            <View style={{
                    padding: hp(.5),
                    backgroundColor: character === 1 ? COLORS.background2 : COLORS.background3,
                }}> 
                <View style={{ 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: wp(5), 
                    height: hp(50), 
                }}>
                    <Text style={{ textAlign: 'center', width: wp(55), fontSize: wp(4), color: character === 1 ? COLORS.knight : COLORS.assassin, fontWeight: 'bold', borderBottomWidth: wp(.5), borderColor: character === 1 ? COLORS.knight : COLORS.assassin,}}>
                        {user}'s Statistics
                    </Text>
                    <Text style={{ fontSize: wp(4), color: character === 1 ? COLORS.knight : COLORS.assassin, }}>
                        DM/Click: {multi}
                    </Text>
                    <Text style={{ fontSize: wp(4), color: character === 1 ? COLORS.knight : COLORS.assassin, }}> 
                        Auto CPS: {autoClick}
                    </Text>
                    <Text style={{ fontSize: wp(4), color: character === 1 ? COLORS.knight : COLORS.assassin, }}>
                        ATK: {atk}
                    </Text>
                    
                    { character === 1 ? (
                        <Text style={{ fontSize: wp(4), color: COLORS.knight}}>
                            DEF: {def}
                        </Text>
                    ) : (
                        <Text style={{ fontSize: wp(4), color: COLORS.assassin }}>
                            RANGE: {def}
                        </Text>
                    )}

                    <Text style={{ fontSize: wp(4), color: character === 1 ? COLORS.knight : COLORS.assassin, }}>
                        TROOPS: {trp}
                    </Text>
                    <Text style={{  paddingBottom: hp(1), textAlign: 'center', width: wp(55), fontSize: wp(4), color: character === 1 ? COLORS.knight : COLORS.assassin, borderBottomWidth: wp(.5), borderColor: character === 1 ? COLORS.knight : COLORS.assassin }}>
                        PWR: {pwr}
                    </Text>
                </View>
            </View>

            <View style={{
                    padding: hp(.5),
                    backgroundColor: character === 1 ? COLORS.background2 : COLORS.background3,
                }}> 
                <Link href={'/Profile'}>
                    <View style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: wp(5), 
                        height: hp(5), 
                    }}>
                        <Ionicons name="person-circle-outline" size={wp(10)} color={ character === 1 ? COLORS.knight : COLORS.assassin} />
                        <Text style={{ textAlign: 'center', color: character === 1 ? COLORS.knight : COLORS.assassin}}> 
                            Open Profile 
                        </Text>
                    </View>
                </Link>
            </View>
        </View>
    )
}

const DrawerLayout = () => {

    const userContext = React.useContext(UserContext)

    const character = userContext?.character

    return (
        <Drawer  
            drawerContent={CustomDrawerContent} 
            screenOptions={{ 
                drawerHideStatusBarOnOpen: true,
                drawerActiveBackgroundColor: character === 1 ? COLORS.knight : COLORS.assassin,
                drawerInactiveBackgroundColor: character === 1 ? COLORS.background2 : COLORS.background3,
                drawerActiveTintColor: character === 1 ? COLORS.background2 : COLORS.background3,
                drawerInactiveTintColor: character === 1 ? COLORS.knight : COLORS.assassin
            }}

        >
            <Drawer.Screen 
                name='(tabs)'
                options={{
                    drawerLabel: 'Home',
                    headerShown: false,
                    drawerIcon: ({ size, color }) => (
                        <Ionicons name='home-outline' size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen 
                name='Profile'
                options={{
                    drawerItemStyle: {height: 0} // to hide profile option from main drawer nav
                }}
            />
            <Drawer.Screen
                name='Upgrade'
                options={{
                    drawerLabel:  character === 1 ? 'The Forge' : 'Shadow Armory',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                    headerTintColor: character === 1 ? COLORS.knight : COLORS.assassin,
                    headerStyle: {
                        backgroundColor: character === 1 ? COLORS.background2 : COLORS.background3,
                    },
                    drawerIcon: ({ size, color }) => (
                        <>
                            { character === 1 ? (
                                <MaterialCommunityIcons name="anvil" size={size} color={color} />
                            ) : (
                                <AntDesign name="isv" size={size} color={color} />
                            )}
                        </>
                    ),
                }}
            />
            <Drawer.Screen 
                name='Transmutator'
                options={{
                    headerShown: true,
                    drawerIcon: ({ size, color }) => (
                        <MaterialIcons name="science" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen 
                name='Map'
                options={{
                    drawerLabel:  character === 1 ? "Crimson's Battle Map" : "Shadow's Battle Map",
                    headerTitle: '',
                    headerTransparent: true,
                    headerRight: () => (
                        <View style={{ width: wp(20), alignItems: 'flex-end', justifyContent: 'center', paddingRight: wp(2.5)}}> 
                          <Link href={'/MapInfo'}>
                            <AntDesign name="infocirlceo" size={wp(6)} color="black" />
                          </Link>
                        </View>
                      ),
                    drawerIcon: ({ size, color }) => (
                        <Entypo name="map" size={size} color={color} />
                    ),
                }}
            />
        </Drawer>
)}

export default DrawerLayout;