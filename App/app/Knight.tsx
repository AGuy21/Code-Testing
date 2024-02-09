import { Text, View, TouchableOpacity, Dimensions, Image, StatusBar } from 'react-native';
import React, {  } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

import globalStyles from '../styles/globalStyles';
import { COLORS } from '../styles/COLORS';

import { UserContext } from './_layout';
import { Stack, router } from 'expo-router';


function KnightScreen() {
    const userContext = React.useContext(UserContext)

    const username = userContext?.username


    return(
        <View style={{ backgroundColor: COLORS.background2}}>
          <StatusBar backgroundColor={COLORS.background2} barStyle='dark-content' />
            <Stack.Screen  options={{
                headerTitle: 'The Crimson Knights',
                headerTitleAlign: 'center',
                headerTintColor: COLORS.knight,
                headerTitleStyle: {
                  color: COLORS.knight,
                  fontSize: wp(5),
                  fontWeight: 'bold',
                },
                headerStyle: {
                  backgroundColor: COLORS.background2,
                }
              }}
            />
            <View style={globalStyles.knightContainer}>
                <Text style={globalStyles.selectionText}> {username} The Knight!</Text>
                <View style={globalStyles.imageContainer}> 
                <View style={globalStyles.margin} />
                <View style={globalStyles.margin} />
                <Image 
                    source={require('../assets/images/Crimson_Knight.png')}
                    style={{ height: deviceHeight/1.6, width: deviceWidth/1.15, opacity: 1.0 }}
                />
                </View>
                <View style={globalStyles.caption}>
                    <View style={globalStyles.captionInt}>
                        <View style= {{ opacity: 1.0, }}>
                            <Text style={globalStyles.text}> 
                                The knight of the crimson order is one of the strongest in his legion. His armor made from blacksteel from the villages he conquered, this steel gives him extraordinary protection. and his Falcion sword gives him his world-renowned strikes.
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
                    <Text style={globalStyles.knightText}>
                            Select 
                    </Text> 
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default KnightScreen;