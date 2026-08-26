import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function index() {
  return (
    <View style={styles.container}>
      <Text>The Front page for parking app</Text>
      <StatusBar style="auto" />
      <Link href="/park/lot-123" style={{ marginTop: 20, color: 'blue' }}>
        Go to Parking Lot
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
