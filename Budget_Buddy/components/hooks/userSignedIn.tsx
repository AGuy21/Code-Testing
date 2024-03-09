import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

/**
 * Custom hook to check if the user is signed in.
 * If the user is signed in, it redirects to the authentication page.
 * If the user is not signed in, it logs a message to the console.
 */
export const useSignedInCheck = () => {
  const { isSignedIn } = useAuth();
  return useEffect(() => {
    if (isSignedIn) {
      router.replace("(auth)");
    } else {
      console.log("User not signed in!");
    }
  });
};
