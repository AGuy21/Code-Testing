// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDs3eDy-Hdv0w6o_1Yz6hddRgRuJ2QClGg",
  authDomain: "nease-astronomy.firebaseapp.com",
  projectId: "nease-astronomy",
  storageBucket: "nease-astronomy.firebasestorage.app",
  messagingSenderId: "997209531512",
  appId: "1:997209531512:web:9a2b8060214ad19070b98d",
  measurementId: "G-ZEL6MS5C9C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);