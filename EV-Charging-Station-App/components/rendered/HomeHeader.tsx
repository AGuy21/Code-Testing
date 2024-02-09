import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export default function HomeHeader() {
    const { user } = useUser();

  return (
    <View>
        <View style={styles.container}>
            <Image 
                source={{uri: user?.imageUrl}}
                style={{width: 45, height: 45, borderRadius: 99,}}
            />

            <Image 
                source={require('../../assets/images/logo.png')}
                style={{width: 200, height: 100,}}
            />

            <FontAwesome name="filter" size={24} color="black" />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        display: 'flex',
    }
});