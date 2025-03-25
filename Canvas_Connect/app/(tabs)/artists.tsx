import Colors from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

export default function Artists() {
  return (
    <View style={styles.container}>
      <Text>yo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
});
