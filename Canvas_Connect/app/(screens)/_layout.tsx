import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack options={{}}>
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
