// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQmXmJ0cBMicJI2bTRn9frfTzjOGfzFSI",
  authDomain: "chat-test-63c62.firebaseapp.com",
  projectId: "chat-test-63c62",
  storageBucket: "chat-test-63c62.appspot.com",
  messagingSenderId: "247662879668",
  appId: "1:247662879668:web:9270a86395214823c808e1",
  measurementId: "G-L8PRQHYEWG"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
