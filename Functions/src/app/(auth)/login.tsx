import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { useRouter } from 'expo-router';
import { useColorTheme } from '../../hooks/useColorTheme';


export default function LoginScreen() {
  const router = useRouter();

  const backgroundColor = useColorTheme('background');
  const textColor = useColorTheme('text');
  const primary = useColorTheme('primary');
  const linkColor = useColorTheme('link');
  return (
    <View style={[styles.container, { backgroundColor }]}>


      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}>
        <Image
          source={require('../../../assets/BallonLogo.png')}
          style={{ width: 60, height: 80 }}
        />
        <Text style={[styles.title, { color: primary }]}>Welcome</Text>
      </View>
      
      <Text style={[styles.subtitle, { color: textColor }]}>Tap the button to sign in and open tabs.</Text>
      <Pressable style={styles.button} onPress={() => router.replace('(tabs)')}>
        <Text style={[styles.buttonText, { color: linkColor }]}>Sign In</Text>
      </Pressable>
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
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
