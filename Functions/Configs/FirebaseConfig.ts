// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8dWyagzpcLFrKlka-p_o7kc0kXc9oKd8",
  authDomain: "functions-ce142.firebaseapp.com",
  projectId: "functions-ce142",
  storageBucket: "functions-ce142.firebasestorage.app",
  messagingSenderId: "878881409057",
  appId: "1:878881409057:web:841ab0d223f5ff1ffbbb60",
  measurementId: "G-0773R6SHMQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);