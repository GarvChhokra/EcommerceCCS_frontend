import { nanoid } from "nanoid";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import axios from "axios";
import Header from "./Header";
import Cookies from "js-cookie";
const md5 = require("md5");
// const bcrypt = require("bcrypt");

export default function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalCode] = useState("");
  console.log("Login Component loacl Storage ", localStorage.getItem("cart"));
  const localCartItem = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Local Cart Item after parsing ", localCartItem);

  const registerFnc = (e) => {
    Cookies.remove("sessionId");

    e.preventDefault();
    // const salt = bcrypt.genSalt(10);
    // const hashedPassword = bcrypt.hash(password, salt);
    const hashedPassword = md5(password);
    // bcrypt.hash(password, saltRounds, function (err, hash) {
    //   // Store hash in your password DB.
    // });
    const userData = {
      name,
      email,
      password: hashedPassword,
      address,
      city,
      province,
      postalcode,
    };
    axios
      .post("https://ccs-server.azurewebsites.net/userRegistration", userData)
      .then((response) => {
        if (response.data == "Data inserted successfully") {
          console.log(response.data);
          const sessionId = email;
          Cookies.set("sessionId", sessionId, { expires: 1 }); // Expires in 1 day
          console.log("Cookies", Cookies.get("sessionId"));
          localCartItem.forEach((item) => {
            const reqData = {
              email: email,
              productId: item.id,
              quantity: 1,
            };
            console.log(item.id);
            console.log(email);
            axios
              .post(
                "https://ccs-server.azurewebsites.net/addProductsCart",
                reqData
              )
              .then((response) => {
                if (response.data == "Product data entered on the cart") {
                  console.log("Product added to cart:", item.name);
                }
              })
              .catch((error) => {
                // handle error
                console.log(error);
                alert("Error entering in");
              });
          });
        }
        window.location.reload();
        const code = nanoid();
        console.log("couponCode");
        console.log(code);
        if (
          window.location.href !=
          "https://ccs-server.azurewebsites.net/checkoutPayment"
        ) {
          history.push({
            pathname: "/",
            state: { email: email },
          });
          // coupons data insert
          const couponData = {
            coupon: code,
            email: email,
            isExpired: 0,
          };
          axios
            .post("https://ccs-server.azurewebsites.net/addcoupons", couponData)
            .then((response) => {
              if (response.data === "Coupon Data Inserted Successfully") {
                console.log("Data entered");
                alert("Congratulations! you got a $10 ");
              }
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error registering user");
      });
    // try {
    //   const response = axios.post("https://ccs-server.azurewebsites.net/userRegistration", {
    //     name,
    //     email,
    //     password: hashedPassword,
    //     // password,
    //     address,
    //     city,
    //     province,
    //     postalcode,
    //   });
    //   console.log(response.data);
    //   const sessionId = email;
    //   Cookies.set("sessionId", sessionId, { expires: 1 }); // Expires in 1 day
    //   console.log("Cookies", Cookies.get("sessionId"));
    //   if (window.location.href != "http://localhost:3000/checkoutPayment") {
    //     history.push({
    //       pathname: "/",
    //       state: { email: email },
    //     });
    //     const buffer = crypto.randomBytes(10); // 10 bytes = 80 bits
    //     const value = buffer.toString("base64").substring(0, 15); // Base64 encoding, first 15 characters
    //     const code = `COUPON-${value.toUpperCase()}`;
    //     console.alert(code);
    //     // coupons data insert
    //     // const couponData = {
    //     //   coupon: code,
    //     //   email: email,
    //     //   isExpired: 0,
    //     // };
    //     // axios.get("http://localhost:3000/addcoupons", couponData);

    //     localCartItem.forEach((item) => {
    //       const reqData = {
    //         email: email,
    //         productId: item.id,
    //         quantity: 1,
    //       };
    //       console.log(item.id);
    //       console.log(email);
    //       axios
    //         .post("https://ccs-server.azurewebsites.net/addProductsCart", reqData)
    //         .then((response) => {
    //           if (response.data == "Product data entered on the cart") {
    //             console.log("Product added to cart:", item.name);
    //           }
    //         })
    //         .catch((error) => {
    //           // handle error
    //           console.log(error);
    //           alert("Error entering in");
    //         });
    //     });
    //   }
    //   window.location.reload();
    // } catch (error) {
    //   console.error(error);
    //   alert("Error registering user");
    // }

    // firebase
    // auth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((auth) => {
    //     if (auth) {
    //       history.push("/");
    //     }
    //   })
    //   .catch((error) => alert(error.message));
    localStorage.clear();
  };

  // inside your Register component

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
      <p>
        <label>Name</label>
      </p>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <p>
        <label>Address</label>
      </p>
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></input>
      <p>
        <label>City</label>
      </p>
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      ></input>
      <p>
        <label>Province</label>
      </p>
      <input
        type="text"
        placeholder="Province"
        value={province}
        onChange={(e) => setProvince(e.target.value)}
      ></input>
      <p>
        <label>Postal Code</label>
      </p>
      <input
        type="text"
        placeholder="Postal Code"
        value={postalcode}
        onChange={(e) => setPostalCode(e.target.value)}
      ></input>

      <div className="registerBtn">
        <button type="submit" onClick={registerFnc}>
          Register
        </button>
      </div>
    </div>
  );
}
