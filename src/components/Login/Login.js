import "./Login.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { auth, googleProvider } from "../../config/auth";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

function SetupFirebase() {
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
  const analytics = getAnalytics(app);
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/feed");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email);
  console.log(password);

  const onSubmit = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("valid user");
        navigate("/feed");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> GymLog</h1>
        <input
          className="text-input"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="text-input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <div classname="buttons">
          <button className="button-50" onClick={onSubmit}>
            Login
          </button>
        </div>
        <div>
          <button className="button-50" onClick={signInWithGoogle}>
            Login with Google
          </button>
        </div>
        <div>
          <h5> Don't have an account? Click here to signup!</h5>
        </div>
      </header>
    </div>
  );
}

export default Login;
