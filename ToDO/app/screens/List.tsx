import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
const List = () => {

  return (
    <View>
      <Text>List</Text>
      <Link href='./Details.tsx'> Details Page </Link>
    </View>
  );
};

export default List