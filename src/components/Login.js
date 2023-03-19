import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logIn = (e) => {
    e.preventDefault();

    // firebase
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_left">
        <h2>New Customer</h2>
        <small>Register Account</small>
        <p>
          By creating an account you will be able to shop faster, be up to date
          on an order's status, and keep track of the orders you have previously
          made.
        </p>
        <Link to="register">
          <button>Continue</button>
        </Link>
      </div>
      <div className="login_right">
        <h2>Returning Customer</h2>
        <small>I am a returning customer</small>
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
        <br></br>
        <div>
          <small>Forgotten password</small>
        </div>
        <button type="submit" onClick={logIn}>
          Login
        </button>
      </div>
    </div>
  );
}
