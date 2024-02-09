import { View, Text, StatusBar, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

import globalStyles from '../../styles/globalStyles';
import { COLORS } from '../../styles/COLORS';
import { CountContext, TransmutatorContext, UserContext } from '../../app/_layout';
import { SafeAreaView } from 'react-native-safe-area-context';


const Forge = () => {

          // contexts listed here
          const transContext = React.useContext(TransmutatorContext)
          const userContext = React.useContext(UserContext)
          const countContext = React.useContext(CountContext)
          // context states
          const count = countContext?.count
          const choice = userContext?.character
      
          const ds = transContext?.darkSteel
          const atk = transContext?.attack
          const def = transContext?.defense
          const troop = transContext?.troops
          const power = transContext?.power
  
          const manualPrice1 = countContext?.price
          const manualPrice2 = countContext?.price2
          const manualPrice3 = countContext?.price3
          const manualPrice4 = countContext?.price4
          const manualPrice5 = countContext?.price5
  
          const autoPrice1 = countContext?.autoPrice
          const autoPrice2 = countContext?.autoPrice2
          const autoPrice3 = countContext?.autoPrice3
          const autoPrice4 = countContext?.autoPrice4
          const autoPrice5 = countContext?.autoPrice5
  
          // context functions
  
          const manualHandlePurchase1 = countContext?.multiIncrement
          const manualHandlePurchase2 = countContext?.multiIncrement2
          const manualHandlePurchase3 = countContext?.multiIncrement3
          const manualHandlePurchase4 = countContext?.multiIncrement4
          const manualHandlePurchase5 = countContext?.multiIncrement5
  
          const autoHandlePurchase1 = countContext?.autoClickerIncrement
          const autoHandlePurchase2 = countContext?.autoClickerIncrement2
          const autoHandlePurchase3 = countContext?.autoClickerIncrement3
          const autoHandlePurchase4 = countContext?.autoClickerIncrement4
          const autoHandlePurchase5 = countContext?.autoClickerIncrement5
    
  return (
    <View style={{ backgroundColor: COLORS.background2,}}> 
            <StatusBar
                animated={true}
                hidden={true}
            />
            <LinearGradient
                colors={[COLORS.knight, COLORS.background2, COLORS.background2, COLORS.knight]}
                style={globalStyles.smitheryContainer}
            >
                <View style={{                     
                    width: deviceWidth/1.072,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }}>
                    <Image
                        style={{height: deviceHeight/15, width: deviceWidth/5, opacity: 1,}}
                        source={require('../../assets/images/Forge.png')}
                    />
                    <Image
                        style={{height: deviceHeight/15, width: deviceWidth/5, opacity: 1,}}
                        source={require('../../assets/images/Forge.png')}
                    />
                </View>
            


                <View style={globalStyles.smallMargin}/>

                <Text style={globalStyles.dmText}> CPS x DM Pull = Harvester Yeild/s </Text>
                <Text style={globalStyles.dmText}> DarkMatter: {count} </Text>

                <View style={globalStyles.shopRowContainer}>
                    <View style={globalStyles.smitherySubTextBorder}>
                        <Text style={globalStyles.smitherySubText}> Manual</Text>
                    </View>
                    <View style={globalStyles.smitherySubTextBorder}>
                        <Text style={globalStyles.smitherySubText}> Automatic</Text>
                    </View>
                </View>

                <View style={globalStyles.shopRowContainer}>
                <TouchableOpacity style={globalStyles.shopButton} onPress={manualHandlePurchase1}>
                    <View style={globalStyles.priceTextBorder}>
                        <Text style={globalStyles.priceText}> Price: {manualPrice1}</Text>
                    </View>
                    <Text style={globalStyles.shopButtonText}> Increase Dark Matter pull by 1 </Text>
                </TouchableOpacity>

                <TouchableOpacity style={globalStyles.shopButton} onPress={autoHandlePurchase1}>
                    <View style={globalStyles.priceTextBorder}>
                        <Text style={globalStyles.priceText}> Price: {autoPrice1}</Text>
                    </View>
                    <Text style={globalStyles.shopButtonText}> Get A Beta Harvester (0.1cps) </Text>
                </TouchableOpacity>

                </View>
                <View style={globalStyles.shopRowContainer}>

                <TouchableOpacity style={globalStyles.shopButton} onPress={manualHandlePurchase2}>
                    <View style={globalStyles.priceTextBorder}>
                        <Text style={globalStyles.priceText}> Price: {manualPrice2}</Text>
                    </View>
                    <Text style={globalStyles.shopButtonText}> Increase Dark Matter pull by 5 </Text>
                </TouchableOpacity>

                <TouchableOpacity style={globalStyles.shopButton} onPress={autoHandlePurchase2}>
                    <View style={globalStyles.priceTextBorder}>
                        <Text style={globalStyles.priceText}> Price: {autoPrice2}</Text>
                    </View>
                    <Text style={globalStyles.shopButtonText}> Get A Normal Harvester (1cps) </Text>
                </TouchableOpacity>

                </View>
                <View style={globalStyles.shopRowContainer}>

                <TouchableOpacity style={globalStyles.shopButton} onPress={manualHandlePurchase3}>
                    <View style={globalStyles.priceTextBorder}>
                        <Text style={globalStyles.priceText}> Price: {manualPrice3}</Text>
                    </View>
                    <Text style={globalStyles.shopButtonText}> Increase Dark Matter pull by 10 </Text>
                </TouchableOpacity>

                <TouchableOpacity style={globalStyles.shopButton} onPress={autoHandlePurchase3}>
                    <View style={globalStyles.priceTextBorder}>
                        <Text style={globalStyles.priceText}> Price: {autoPrice3}</Text>
                    </View>
                    <Text style={globalStyles.shopButtonText}> Get A Big Harvester (5cps) </Text>
                </TouchableOpacity>

                </View>
                
                <View style={globalStyles.shopRowContainer}>

                <TouchableOpacity style={globalStyles.shopButton} onPress={manualHandlePurchase4}>
                    <View style={globalStyles.priceTextBorder}>
                        <Text style={globalStyles.priceText}> Price: {manualPrice4}</Text>
                    </View>
                    <Text style={globalStyles.shopButtonText}> Increase Dark Matter pull by 100 </Text>
                </TouchableOpacity>

                <TouchableOpacity style={globalStyles.shopButton} onPress={autoHandlePurchase4}>
                    <View style={globalStyles.priceTextBorder}>
                        <Text style={globalStyles.priceText}> Price: {autoPrice4}</Text>
                    </View>
                    <Text style={globalStyles.shopButtonText}> Get A Mega Harvester (10cps) </Text>
                </TouchableOpacity>

                </View>

                <View style={globalStyles.shopRowContainer}>
                
                <TouchableOpacity style={globalStyles.shopButton} onPress={manualHandlePurchase5}>
                    <View style={globalStyles.priceTextBorder}>
                        <Text style={globalStyles.priceText}> Price: {manualPrice5}</Text>
                    </View>
                    <Text style={globalStyles.shopButtonText}> Increase Dark Matter pull by 500 </Text>
                </TouchableOpacity>

                <TouchableOpacity style={globalStyles.shopButton} onPress={autoHandlePurchase5}>
                    <View style={globalStyles.priceTextBorder}>
                        <Text style={globalStyles.priceText}> Price: {autoPrice5}</Text>
                    </View>
                    <Text style={globalStyles.shopButtonText}> Get A Ultra Harvester (50cps) </Text>
                </TouchableOpacity>

                </View>

            </LinearGradient>
        </View>
  )
}

export default Forge