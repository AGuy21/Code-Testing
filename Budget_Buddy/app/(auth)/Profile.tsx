import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import ThemeChangeButton from '../../components/rendered/ThemeChangingButton';
import { AppContext } from '../_layout';
import { useGetProfileStyles } from '../../constants/styles';

export default function Profile() {
  const colorContext = React.useContext(AppContext);
  const Colors = colorContext?.Colors;

  const styles = useGetProfileStyles(Colors);

  const user = useUser();
  
  return (
    <View style={styles.container}>

      <Text style={{ color: Colors?.primary}}> {user.user?.emailAddresses[0].emailAddress} </Text>
      
      <View style={styles.themeButtonContainer}>
        <ThemeChangeButton type='light' />
        <ThemeChangeButton type='basic' />
      </View>
    </View>
  )
}


