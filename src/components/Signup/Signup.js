import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../../config/auth";
import { useNavigate, useLocation } from "react-router-dom";
import "firebase/firestore";
import "firebase/auth";
function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
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

  return (
    <div className="App">
      <header className="App-header">
        <h4> Email</h4>
        <input
          className="text-input"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "15px" }} // Add margin-bottom for spacing
        ></input>
        <h4> Password </h4>
        <input
          className="text-input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "15px" }} // Add margin-bottom for spacing
        ></input>
        <h4> Confirm Password</h4>
        <input
          className="text-input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword2(e.target.value)}
          style={{ marginBottom: "30px" }} // Add margin-bottom for spacing
        ></input>

        <div classname="buttons">
          <button
            className="button-50"
            onClick={
              password === password2
                ? onSubmit
                : console.log("password not same")
            }
          >
            Signup
          </button>
        </div>
      </header>
    </div>
  );
}

export default Signup;
