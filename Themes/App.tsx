import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import useGetColors from './constants/Colors';


export default function App() {
  const { Colors, changeColors } = useGetColors()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  return (
    <View style={styles.container}>
      <Text style={{ color: Colors.accent }}>
        Open up App.tsx to start working on your app!
      </Text>
      <Button title='light Theme' color={Colors.primary} onPress={() => changeColors('light')}/>
      <Button title='Dark Theme' color={Colors.accent} onPress={() => changeColors('dark')}/>
      <Button title='Basic Theme' color={Colors.accent} onPress={() => changeColors('basic')}/>

      <StatusBar style="auto" />
    </View>
  );
}

