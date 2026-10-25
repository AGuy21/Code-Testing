// Firebase initialization for the Functions app.
// Uses the Firebase JS SDK (modular API). Note:
// - firebase/analytics is intentionally NOT used — it depends on browser
//   APIs and crashes in React Native.
// - Firestore is initialized with long-polling auto-detection because the
//   default WebChannel transport is unreliable inside React Native.

import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8dWyagzpcLFrKlka-p_o7kc0kXc9oKd8",
  authDomain: "functions-ce142.firebaseapp.com",
  projectId: "functions-ce142",
  storageBucket: "functions-ce142.firebasestorage.app",
  messagingSenderId: "878881409057",
  appId: "1:878881409057:web:841ab0d223f5ff1ffbbb60",
  measurementId: "G-0773R6SHMQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore instance, shared app-wide.
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
// Firebase sign-in is re-derived from the Clerk session on every launch
// (FirebaseAuthBridge), so a throwaway store is enough and avoids the
// "no AsyncStorage" warning without adding a native dependency.
const memory = new Map<string, string>();
// The React Native entry exports getReactNativePersistence, but its types are web-only.
const { initializeAuth, getReactNativePersistence } = firebaseAuth as unknown as {
  initializeAuth: (app: unknown, deps: unknown) => unknown;
  getReactNativePersistence: (storage: unknown) => unknown;
};
try {
  initializeAuth(app, {
    persistence: getReactNativePersistence({
      getItem: async (k: string) => memory.get(k) ?? null,
      setItem: async (k: string, v: string) => void memory.set(k, v),
      removeItem: async (k: string) => void memory.delete(k),
    }),
  });
} catch (error) {
  // Fast Refresh re-runs this module; auth is already set up then.
  if ((error as { code?: string }).code !== "auth/already-initialized") throw error;
}

export { app };
