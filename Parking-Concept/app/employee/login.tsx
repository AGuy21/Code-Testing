import { StyleSheet, View, Text } from "react-native";
import { Link } from "expo-router";

export default function login() {
  return (
    <View style={styles.container}>
      <Text>login</Text>

      <Link href="/employee/dashboard" style={styles.link}>
        Go to Employee Dashboard
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
