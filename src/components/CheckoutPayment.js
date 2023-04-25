import { nanoid } from "nanoid";
import React, { useState } from "react";
import Login from "./Login";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Subtotal from "./Subtotal";
import TotalPayment from "./TotalPayment";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function CheckoutPayment() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [btn, setBtn] = useState("false");
  const [isHidden, setIsHidden] = useState(true);
  const validateForm = () => {
    let isValid = true;
    const nameRegex = /^[A-Za-z\s]+$/;
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!nameRegex.test(name)) {
      alert("Please enter a valid name");
      isValid = false;
    }
    if (address.length < 5) {
      alert("Please enter a valid address");
      isValid = false;
    }
    if (city.length < 3) {
      alert("Please enter a valid city");
      isValid = false;
    }
    if (province.length < 2) {
      alert("Please enter a valid province");
      isValid = false;
    }
    if (!postalCodeRegex.test(postalcode)) {
      alert("Please enter a valid postal code");
      isValid = false;
    }
    return isValid;
  };
  const addressData = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const fullAddress = address + ", " + city;
      console.log(fullAddress);
      Cookies.set("addressOrder", fullAddress);
      if (Cookies.get("sessionId")) {
        setEmail(Cookies.get("sessionId"));
      } else {
        // const random = nanoid(5) + "@gmail.com";
        // console.log(random);
        // setEmail(random);
        // // Cookies.set("sessionId", email);
        // const pas = nanoid(10);
        // axios
        //   .post("https://ccs-server.azurewebsites.net/userRegistration", {
        //     email: email,
        //     password: pas,
        //   })
        //   .then((response) => {
        //     if (response.data == "Data inserted successfully") {
        //       console.log(response.data);
        //     }
        // });
      }
      const addData = {
        email: Cookies.get("sessionId"),
        name: name,
        address: address,
        city: city,
        province: province,
        postalcode: postalcode,
      };
      console.log("EMail of the address page", email);
      axios
        .post("https://ccs-server.azurewebsites.net/addressData", addData)
        .then((response) => {
          if ((response.data = "Address Data entered Successfully")) {
            console.log("address data send successfully");
            history.push("/payment");
          }
        })
        .catch((error) => console.log(error));
    } else {
      return;
    }
  };
  const hidden = (e) => {
    setIsHidden(false);
  };
  const buttonActive = () => {
    setBtn(true);
  };
  return (
    <>
      <div className="paymentPage">
        {Cookies.get("sessionId") || btn === true ? (
          <>
            <div className="register">
              <div style={{ display: isHidden ? "block" : "none" }}>
                <h3>Billing Information</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                  <p>
                    <label>Name</label>
                  </p>
                  <input
                    type="text"
                    value={name}
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Name"
                  ></input>
                  <p>
                    <label>Address</label>
                  </p>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    placeholder="Address"
                    required
                  ></input>
                  <p>
                    <label>City</label>
                  </p>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    placeholder="City"
                    required
                  ></input>
                  <p>
                    <label>Province</label>
                  </p>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                    }}
                    placeholder="Province"
                    required
                  ></input>
                  <p>
                    <label>Postal Code</label>
                  </p>
                  <input
                    type="text"
                    value={postalcode}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                    }}
                    placeholder="Postal Code"
                    required
                  ></input>
                  {/* <Link to="/payment"> */}
                  <button
                    type="submit"
                    onClick={(e) => {
                      addressData(e);
                    }}
                  >
                    Next
                  </button>
                  {/* </Link> */}
                </form>
              </div>
            </div>
          </>
        ) : (
          <>
            {Cookies.get("sessionId") == undefined ? (
              <>
                <div>
                  <strong>*Register as a new account and get $10 off</strong>
                </div>
                <small>
                  This promotion will automatically applied at the time of
                  payment
                </small>
                <Login />
                <div className="guestCheckout">
                  <label>
                    <input
                      type="radio"
                      value="guest"
                      onClick={() => {
                        buttonActive();
                      }}
                    />
                    Guest Checkout
                  </label>
                </div>
              </>
            ) : (
              (window.location.href = "/payment")
            )}
          </>
        )}
      </div>
    </>
  );
}
