import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

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
          <button className="button-50">Signup</button>
        </div>
      </header>
    </div>
  );
}

export default Signup;
