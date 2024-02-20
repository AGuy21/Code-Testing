import React, {} from 'react';
import {StyleSheet, ActivityIndicator, Text} from 'react-native';
import Colors from '../../constants/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


/**
 * Renders a loader component with an activity indicator and a loading text.
 * @returns JSX.Element
 */
export default function Loader() {

  return (
    <>
      <ActivityIndicator 
        size={'large'}
        color={Colors.primary}
        style={{ alignSelf: 'center'}}
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