// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgIAyB8qatSLaZQkvTWqbB-nlCfk8fU6Y",
  authDomain: "todo-3f0c8.firebaseapp.com",
  projectId: "todo-3f0c8",
  storageBucket: "todo-3f0c8.appspot.com",
  messagingSenderId: "848291027398",
  appId: "1:848291027398:web:54ebeb76ef3f3d7b297ac7"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP)