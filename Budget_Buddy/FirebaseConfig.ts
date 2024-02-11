// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfyM37pLVD9RGGc8L11ucYl3atAT1DRVw",
  authDomain: "budgetbuddy-4af80.firebaseapp.com",
  projectId: "budgetbuddy-4af80",
  storageBucket: "budgetbuddy-4af80.appspot.com",
  messagingSenderId: "872730684356",
  appId: "1:872730684356:web:3a3a22fd7bb8fff48a9291",
  measurementId: "G-0PL3Q5W6LS"
};

// Initialize Firebase
// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);