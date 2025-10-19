import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
