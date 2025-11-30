// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

export { app, analytics, db };