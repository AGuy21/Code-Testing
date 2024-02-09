import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { } from "react"
import {  View, StyleSheet, Text} from 'react-native'
import { CountContext, TransmutatorContext } from "../../app/_layout";

const StatView =  () => {
      // Grabs contexts to be used for states
    const countContext = React.useContext(CountContext)
    const transContext = React.useContext(TransmutatorContext)
    // all states defined by context

    const count = countContext?.count
    const darkSteel = transContext?.darkSteel

    return (
      <View>
        <View style={styles.statContainer}>

          <View style={styles.itemStatView}>
            <View>
              <View style={styles.itemStatTextContainter}>
                <Text style={styles.itemStatText}> DarkMatter </Text>
              </View>


              <Text style={styles.itemStatText}> {count} </Text>
            </View>
            
            <View>
              <View style={styles.itemStatTextContainter}>
                <Text style={styles.itemStatText}> DarkSteel </Text>
              </View>

              <Text style={styles.itemStatText}> {darkSteel} </Text>
            </View>
          </View>

        </View>
      </View>
    )
}

export default StatView;

const styles = StyleSheet.create({
    statContainer: {
        height: hp(20),
        width: wp(50),
        flexDirection: 'row',
        marginTop: hp(20)
    },
    itemStatView: {
        height: hp(15),
        width: wp(100),
        padding: wp(1),
        flexDirection: 'row',
    },
    itemStatTextContainter: {
        height: hp(4),
        width: wp(51),
        borderStyle: 'dashed',
        borderColor: '#472360',
        borderBottomWidth: hp(.5),
        justifyContent: 'flex-end'
    },
    itemStatText: {
        fontSize: hp(2),
        color: '#472360',
        textAlign: 'center'
    }
})