import { useAuth } from "@clerk/expo";
import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";
import { useEffect } from "react";
import { app } from "../../Configs/FirebaseConfig";

const TOKEN_URL =
  process.env.EXPO_PUBLIC_FIREBASE_TOKEN_URL ??
  "https://us-central1-functions-ce142.cloudfunctions.net/firebaseToken";

/**
 * Keeps Firebase Auth in step with Clerk: when a Clerk session exists it is
 * exchanged (via the `firebaseToken` Cloud Function) for a Firebase custom
 * token, so `request.auth.uid` equals the Clerk user id in Firestore rules.
 * Best-effort: if the function isn't deployed the app keeps working with the
 * permissive rules in Configs/firestore.rules.
 */
export function FirebaseAuthBridge() {
  const { isLoaded, isSignedIn, userId, getToken } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    const firebaseAuth = getAuth(app);
    if (!isSignedIn || !userId) {
      if (firebaseAuth.currentUser) void signOut(firebaseAuth);
      return;
    }
    if (firebaseAuth.currentUser?.uid === userId) return;

    let cancelled = false;
    (async () => {
      try {
        const jwt = await getToken();
        if (!jwt) return;
        const response = await fetch(TOKEN_URL, {
          method: "POST",
          headers: { Authorization: `Bearer ${jwt}` },
        });
        if (!response.ok) throw new Error(`token exchange ${response.status}`);
        const { token } = (await response.json()) as { token: string };
        if (!cancelled) await signInWithCustomToken(firebaseAuth, token);
      } catch (error) {
        console.warn("Firebase sign-in skipped:", error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, userId, getToken]);

  return null;
}
