import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

export default function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerFnc = (e) => {
    e.preventDefault();

    // firebase
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <strong>New Customer</strong>
      <p>
        <label>E-Mail Address</label>
      </p>
      <input
        type="text"
        placeholder="example@xyz.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <p>
        <label>Password</label>
      </p>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <div className="registerBtn">
        <button type="submit" onClick={registerFnc}>
          Register
        </button>
      </div>
    </div>
  );
}
