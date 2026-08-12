import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useColorTheme } from '../../hooks/useColorTheme';
import { Fonts } from '../../constants/Fonts';

export default function Profile() {
  const backgroundColor = useColorTheme('background');
  const textColor = useColorTheme('text');
  const linkColor = useColorTheme('link');
  const primary = useColorTheme('primary');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: primary }]}>Profile</Text>
      <Text style={[styles.text, { color: textColor }]}>Manage your profile here</Text>
      <Link href="/" style={[styles.link, { color: linkColor }]}>
        Go Home
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
