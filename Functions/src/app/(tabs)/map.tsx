import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useColorTheme } from '../../hooks/useColorTheme';

export default function Map() {
  const backgroundColor = useColorTheme('background');
  const textColor = useColorTheme('text');
  const linkColor = useColorTheme('link');
  const primary = useColorTheme('primary');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: primary }]}>Map</Text>
      <Text style={[styles.text, { color: textColor }]}>
        Map of all events
      </Text>
      <Link href="/" style={[styles.link, { color: linkColor }]}>
        Back to Home
      </Link>
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
    fontWeight: '700',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 16,
  },
  link: {
    color: '#1e90ff',
    fontSize: 16,
  },
});
