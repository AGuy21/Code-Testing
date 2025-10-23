import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Helper: read and sanitize a Vite env variable
const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env;

function getEnv(key: string): string | undefined {
  const raw = env?.[key];
  if (!raw) return undefined;
  // Trim surrounding quotes, trailing commas and whitespace that sometimes appear in malformed .env files.
  // This removes leading/trailing quotes and commas even when quotes are followed by a comma (e.g. '"VAL",').
  return String(raw).replace(/^[\s"',]+|[\s"',]+$/g, "");
}

// Build firebase config from Vite env vars
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY") ?? "",
  authDomain: getEnv("VITE_FIREBASE_AUTH_DOMAIN") ?? "",
  projectId: getEnv("VITE_FIREBASE_PROJECT_ID") ?? "",
  storageBucket: getEnv("VITE_FIREBASE_STORAGE_BUCKET") ?? "",
  messagingSenderId: getEnv("VITE_FIREBASE_MESSAGING_SENDER_ID") ?? "",
  appId: getEnv("VITE_FIREBASE_APP_ID") ?? "",
  measurementId: getEnv("VITE_FIREBASE_MEASUREMENT_ID") ?? "",
};

// If the storageBucket looks like the newer 'firebasestorage.app' host, transform it to appspot.com
// because client SDK endpoints expect <project-id>.appspot.com for certain operations.
if (firebaseConfig.storageBucket && firebaseConfig.storageBucket.includes("firebasestorage.app")) {
  firebaseConfig.storageBucket = firebaseConfig.storageBucket.replace(".firebasestorage.app", ".appspot.com");
}

export const app = initializeApp(firebaseConfig as unknown as Record<string, string>);
export const db = getFirestore(app);

export default { app, db };
