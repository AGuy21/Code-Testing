// Firebase initialization for the Functions app.
// Uses the Firebase JS SDK (modular API). Note:
// - firebase/analytics is intentionally NOT used — it depends on browser
//   APIs and crashes in React Native.
// - Firestore is initialized with long-polling auto-detection because the
//   default WebChannel transport is unreliable inside React Native.

import { initializeApp } from "firebase/app";
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