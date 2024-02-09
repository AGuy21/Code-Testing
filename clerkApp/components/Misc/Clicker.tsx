import { View, Text, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';


export default function Clicker() {
    const [count, setCount] = useState(0)

    return (
        <View>
            <Button title='Increment' onPress={() => setCount(count + 1)} />
            <Button title='Decrement' onPress={() => setCount(count - 1)} />

            <Text> {count} </Text>
        </View>
    )
}