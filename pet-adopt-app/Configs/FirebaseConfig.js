// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adopt-7f92e.firebaseapp.com",
  projectId: "pet-adopt-7f92e",
  storageBucket: "pet-adopt-7f92e.appspot.com",
  messagingSenderId: "952316282433",
  appId: "1:952316282433:web:8288f79abeebae5a9e28c0",
  measurementId: "G-ES2SZ588GX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
// const analytics = getAnalytics(app);
