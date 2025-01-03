// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiTqJgYpCIAbLF9cCN7JCTuEM1mO6WBoA",
  authDomain: "canvas-connect-4a7bf.firebaseapp.com",
  projectId: "canvas-connect-4a7bf",
  storageBucket: "canvas-connect-4a7bf.firebasestorage.app",
  messagingSenderId: "385196222349",
  appId: "1:385196222349:web:73e02c3f26eb10b96dbfc4",
  measurementId: "G-Q415WKKWET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);