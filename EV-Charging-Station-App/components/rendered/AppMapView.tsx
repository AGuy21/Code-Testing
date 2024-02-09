import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewStyle from '../../constants/MapViewStyle.json'
import { UserContext } from '../Context/UserLocationContext';

export default function AppMapView() {

    const userContext = React.useContext(UserContext);

    const location = userContext.location;

    // if we have users location then we can show them the map
  return location?.latitude&& (
    <View>
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle}
        region={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
        }}
      >
        <Marker 
            coordinate={{
                latitude: location?.latitude,
                longitude: location?.longitude,
            }}
        >
            <Image 
                source={require('../../assets/images/car-marker.png')} 
                style={{ width: 60, height: 60}}
            />
        </Marker>
      </MapView>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });