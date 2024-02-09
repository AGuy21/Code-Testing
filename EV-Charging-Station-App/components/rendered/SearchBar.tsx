import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar() {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 15,
            paddingHorizontal: 5,
            backgroundColor: Colors.white,
            borderRadius: 6,
        }}>
            <Ionicons name="location-sharp" size={24} color={Colors.gray} style={{ paddingTop: 10}}/>
            <GooglePlacesAutocomplete
            placeholder='Search for EV Charging Stations'
            enablePoweredByContainer={false}
            fetchDetails={true}
            onPress={(data, details) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}
            query={{
                key: 'AIzaSyBBIU8D3_sP0z6k3HS1x_CCwLMxldhsAKM',
                language: 'en',
            }}
            />
        </View>
      );
    };