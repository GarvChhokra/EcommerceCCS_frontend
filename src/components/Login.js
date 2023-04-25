import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import axios from "axios";
import Cookies from "js-cookie";
const md5 = require("md5");

export default function Login(props) {
  console.log("Login Component loacl Storage ", localStorage.getItem("cart"));
  const localCartItem = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Local Cart Item after parsing ", localCartItem);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validateForm = () => {
    let isValid = true;

    // Validate email field
    if (!email) {
      alert("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Invalid email format");
      isValid = false;
    }

    // Validate password field
    if (!password) {
      alert("Password is required");
      isValid = false;
    }

    return isValid;
  };
  const logIn = (e) => {
    if (validateForm()) {
      e.preventDefault();
      const hashedPassword = md5(password);
      let user = {
        email: email,
        password: hashedPassword,
      };
      axios
        .post("http://localhost:3200/userLogin", user)
        .then((response) => {
          if (
            response.status === 200 &&
            response.data === "User Logged in Successfully!"
          ) {
            // assume this function is called when the user successfully logs in
            // localStorage.setItem("authToken", response.data.token);
            // redirect
            // Assume 'sessionId' is the ID for the user's session
            const sessionId = email;
            Cookies.set("sessionId", sessionId, { expires: 1 });
            console.log("Login Cookies", Cookies.get("sessionId"));
            if (
              window.location.href != "http://localhost:3200/checkoutPayment"
            ) {
              history.push({
                pathname: "/",
                state: { email: email },
              });
            } else {
              history.push({
                pathname: "/checkout",
                state: { email: email },
              });
            }
            localCartItem.forEach((item) => {
              const reqData = {
                email: email,
                productId: item.id,
                quantity: 1,
              };
              console.log(item.id);
              console.log(email);
              axios
                .post("http://localhost:3200/addProductsCart", reqData)
                .then((response) => {
                  if (response.data == "Product data entered on the cart") {
                    console.log("Product added to cart:", item.name);
                  }
                })
                .catch((error) => {
                  // handle error
                  console.log(error);
                  alert("Either email or password is not found");
                });
            });

            window.location.href = "/checkout";
          } else {
            // display error message
            console.log(response.data);
            alert("Invalid email or password");
          }
        })
        .catch((error) => {
          // handle error
          console.log(error);
          alert("Either email or password is not correct");
        });
      localStorage.clear();
    } else {
      return;
    }
  };
  // const logIn = (e) => {
  //   e.preventDefault();

  //   // firebase
  //   auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((auth) => {
  //       history.push("/");
  //     })
  //     .catch((error) => alert(error.message));
  // };
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
