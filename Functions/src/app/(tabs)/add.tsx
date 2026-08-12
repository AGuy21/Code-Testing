import { View, Text, StyleSheet } from 'react-native';
import { useColorTheme } from '../../hooks/useColorTheme';
import { Fonts } from '../../constants/Fonts';

export default function Add() {
    const backgroundColor = useColorTheme('background');
    const textColor = useColorTheme('text');
    const primary = useColorTheme('primary');
    
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.title, { color: primary }]}>Add</Text>
      <Text style={[styles.text, { color: textColor }]}>
        Add an event post here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    fontFamily: Fonts.Bold,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: Fonts.Medium,

  },
  link: {
    fontSize: 16,
  },
});
