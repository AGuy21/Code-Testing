// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq6CkSHKLIQ0ygYpw6DlABsk5_fKbquhc",
  authDomain: "testapp-f4f01.firebaseapp.com",
  projectId: "testapp-f4f01",
  storageBucket: "testapp-f4f01.appspot.com",
  messagingSenderId: "750752699149",
  appId: "1:750752699149:web:fd6c0a856e7fa6dd21d644",
  measurementId: "G-X7DNF1W740"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

