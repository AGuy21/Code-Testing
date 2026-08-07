import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.text}>
        Use this tab for app preferences, account options, and navigation settings.
      </Text>
      <Link href="/" style={styles.link}>
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
