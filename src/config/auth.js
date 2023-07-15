// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk-lnB3ucQ_zRenCMbCJHyjsFbsYD_SYY",
  authDomain: "gymlog-1c8d9.firebaseapp.com",
  projectId: "gymlog-1c8d9",
  storageBucket: "gymlog-1c8d9.appspot.com",
  messagingSenderId: "273770221009",
  appId: "1:273770221009:web:49370d87d44b0d31a224f0",
  measurementId: "G-KR0SRQQC60",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
