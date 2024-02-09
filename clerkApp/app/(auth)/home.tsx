import { View, Text, Button } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Clicker from '../../components/Misc/Clicker';

const Home = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = React.useState(true);
  const [greeting, setGreeting] = React.useState('');
  const [name, setName] = React.useState('');
  const [greetingInfo, setGreetingInfo] = React.useState();


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
      <Clicker />
    </View>
  );
};

export default Home;