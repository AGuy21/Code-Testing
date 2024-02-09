// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqfOpjf51W1xtWGfBFEnhUWR9GlYPTWHE",
  authDomain: "test-d839a.firebaseapp.com",
  projectId: "test-d839a",
  storageBucket: "test-d839a.appspot.com",
  messagingSenderId: "1069981412320",
  appId: "1:1069981412320:web:3ff42a8be5041cb9089985",
  measurementId: "G-WG9VHHB1T4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);