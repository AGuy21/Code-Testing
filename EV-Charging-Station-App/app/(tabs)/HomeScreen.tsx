import { View, StyleSheet } from 'react-native'
import React from 'react'
import AppMapView from '../../components/rendered/AppMapView'
import HomeHeader from '../../components/rendered/HomeHeader'
import SearchBar from '../../components/rendered/SearchBar'

export default function HomeScreen() {
  return (
    <View>
        <View style={styles.headerContainer}>
            <HomeHeader />
            <SearchBar />
        </View>
      <AppMapView />
    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        zIndex: 10,
        padding: 10,
        width: '100%',
        paddingHorizontal: 20,
    }
});