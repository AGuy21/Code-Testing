import { useClerk } from "@clerk/clerk-react";
import { router } from "expo-router";
import { Button } from "react-native";
export const SignOutButton = () => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(home)");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return <Button title="Sign out" onPress={handleSignOut} />;
};
