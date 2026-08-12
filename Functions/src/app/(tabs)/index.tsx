import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useColorTheme } from '../../hooks/useColorTheme';
import { Fonts } from '../../constants/Fonts';

export default function HomeScreen() {
  const backgroundColor = useColorTheme('background');
  const textColor = useColorTheme('text');
  const linkColor = useColorTheme('link');
  const primary = useColorTheme('primary');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: primary }]}>Events</Text>
      <Text style={[styles.text, { color: textColor }]}>Events listed here</Text>
      <Link href="/settings" style={[styles.link, { color: linkColor }]}>
        Go to Settings
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: Fonts.Bold,
  },
  text: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: Fonts.Medium,
  },
  link: {
    color: '#1e90ff',
    fontSize: 16,
  },
});
