import { Stack } from "expo-router";
import { stackScreenOptions } from "../../constants/theme";

export default function EmployeeLayout() {
  return (
    <Stack screenOptions={{ ...stackScreenOptions }}>
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
    </Stack>
  );
}
