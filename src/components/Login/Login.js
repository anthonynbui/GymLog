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

import { app, auth, googleProvider } from "../../config/auth";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const AuthContext = createContext();

  console.log(email);
  console.log(password);

  const onSubmit = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("valid user");
        console.log(user.email);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  const navigateToSignup = () => {
    navigate("/signup"); // Navigate to "/feed" when clicked
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> GymLog</h1>
        <h4> Email</h4>
        <input
          className="text-input"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <h4> Password </h4>
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
          <h5 onClick={navigateToSignup}>
            {" "}
            Don't have an account? Click here to signup!
          </h5>
        </div>
      </header>
    </div>
  );
}

export default Login;
