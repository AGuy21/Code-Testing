
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Tabs } from 'expo-router';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from '../FirebaseConfig';



export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user)
      setUser(user);
    });
  }, [])

  return (
    <Stack>
        { user ? ( <Stack.Screen name='(tabs)'  /> ) : ( <Stack.Screen name='Login' />)}
    </Stack>
  )
}