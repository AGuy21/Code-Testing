import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Link } from "expo-router";
import { useState, useEffect } from "react";

export default function index() {
  const [lotId, setLotId] = useState("");

  useEffect(() => {
    console.log("lotId changed:", lotId);
  }, [lotId]);

  return (
    <View style={styles.container}>
      <Text>Welcome to the Parking App</Text>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        placeholder="Enter Parking Lot ID"
        value={lotId}
        onChangeText={(text) => setLotId(text)}
      />
      <Link href={`/park/${lotId}`} style={styles.link}>
        Go to Parking Lot
      </Link>

      <Link href="/employee/login" style={styles.link}>
        Go to Employee Login
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "80%",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
