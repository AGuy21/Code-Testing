// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYXm6xeJuEUYfykzxDLQjYjSxklLP_ZSw",
  authDomain: "neaseelectrathon-7e4aa.firebaseapp.com",
  projectId: "neaseelectrathon-7e4aa",
  storageBucket: "neaseelectrathon-7e4aa.firebasestorage.app",
  messagingSenderId: "931190644344",
  appId: "1:931190644344:web:4266e0c3038407bbe7578d",
  measurementId: "G-TY1ZZPCP65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);