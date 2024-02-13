import React, {} from 'react';
import {StyleSheet, ActivityIndicator, Text} from 'react-native';
import Colors from '../../constants/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function Loader() {
  /*
    This component is a basic loading indicator
    to be used if an item is loading
  */
  return (
    <>
      <ActivityIndicator 
        size={'large'}
        color={Colors.primary}
      />
      <Text style={styles.text}>
        Loading Data...
      </Text>
    </>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: wp(3.5),
    color: Colors.white,
    fontFamily: 'Lato-Bold'
  },
});