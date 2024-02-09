// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa4hfADjK8u06gUKkhWa_qNPnlP8mSiCo",
  authDomain: "test-a57e3.firebaseapp.com",
  projectId: "test-a57e3",
  storageBucket: "test-a57e3.appspot.com",
  messagingSenderId: "283153206809",
  appId: "1:283153206809:web:8a119f5dd5e85a81782488",
  measurementId: "G-JNZ1SWQ6CG"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);