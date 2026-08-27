import { Stack } from "expo-router";
import { stackScreenOptions } from "../constants/theme";

export default function Layout() {
  return (
    <Stack screenOptions={{ ...stackScreenOptions }}>
      <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
      <Stack.Screen name="park/[lotId]" options={{ title: "Parking Lot" }} />
    </Stack>
  );
}
