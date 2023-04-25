import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";

export default function TotalPayment(props) {
  const [distanceCost, setDistanceCost] = useState(0);
  const [discount, setDiscount] = useState("");
  const taxPerc = 13;
  const total = props.cart.length;
  let totalPrice = 0;
  for (let i = 0; i < total; i++) {
    let price = parseFloat(
      props.cart[i].quantity *
        props.cart[i].price.replace("$", "").replace(",", "")
    );
    totalPrice += price;
  }
  const tax = (totalPrice * taxPerc) / 100;
  const emailPay = Cookies.get("sessionId");
  const emailData = {
    email: emailPay,
  };
  axios
    .post("https://ccs-server.azurewebsites.net/fetchCouponCode", emailData)
    .then((response) => {
      console.log(response.data[0].couponDiscount);
      if (response.data[0].isExpired == 0 && totalPrice > 60) {
        setDiscount(10);
        // axios.get("https://ccs-server.azurewebsites.net/updateCouponCode", emailData);
      } else {
        setDiscount(0);
      }
    })
    .catch((error) => console.log(error));
  console.log("discount", discount);
  const addressUser = Cookies.get("addressOrder");
  console.log("Address Cookies", addressUser);
  const headOffice = "941 Progress, Toronto ON M1G3T8";
  axios
    .get(`http://localhost:5000/distance/${headOffice}/${addressUser}`)
    .then((response) => {
      console.log(response.data.distance_km);
      setDistanceCost(response.data.distance_km * 0.5);
    })
    .catch((error) => {
      console.error(error);
    });

  const orderProducts = () => {
    axios
      .post("https://ccs-server.azurewebsites.net/orderDataInsert", emailData)
      .then((response) => {
        if (response.data === "Data enetered successfully in the order table") {
          console.log("Data entered into the order table");
        }
      })
      .catch((error) => console.log(error));
    axios
      .post(
        "https://ccs-server.azurewebsites.net/deleteShoppingCart",
        emailData
      )
      .then((response) => {
        if (response.data == "Shopping Cart Empty") {
          console.log(response);
        }
      })
      .catch((error) => console.log(error));
    axios
      .post("https://ccs-server.azurewebsites.net/updateCouponCode", emailData)
      .then((response) => {
        if (response.data == "Updated Coupon Status") {
          console.log(response);
        }
      })
      .catch((error) => console.log(error));
    alert("Order Placed");
    window.location.reload();
  };
  return (
    <>
      <div className="totalPrice">
        <h3>Total Price</h3>
        <p>
          Subtotal -{" "}
          {Cookies.get("currency") === "$"
            ? "$" + totalPrice.toFixed(2)
            : "Rs." + (totalPrice * 60).toFixed(2)}
        </p>
        <p>
          Tax -{" "}
          {Cookies.get("currency") === "$"
            ? "$" + tax.toFixed(2)
            : "Rs." + (tax * 60).toFixed(2)}
        </p>
        {Cookies.get("sessionId") ? (
          <>
            <p>
              {discount === 0 ? (
                <>
                  {" "}
                  <strong>
                    <small>
                      To apply discount add items more than $60 or Rs.600
                      <br></br>Discount
                    </small>
                  </strong>{" "}
                </>
              ) : (
                <>
                  <strong>
                    <small>New User Discount -</small>
                  </strong>{" "}
                </>
              )}

              {Cookies.get("currency") === "$"
                ? "$" + discount
                : "Rs." + (discount * 60).toFixed(2)}
            </p>
          </>
        ) : (
          <>
            <small>
              *Register to get{" "}
              {Cookies.get("currency") === "$" ? "$10" : "Rs.600"} off
            </small>
          </>
        )}
        <p>
          Delivery Fees -{" "}
          {Cookies.get("currency") === "$"
            ? "$" + distanceCost.toFixed(2)
            : "Rs." + (distanceCost * 60).toFixed(2)}{" "}
        </p>
        <hr style={{ width: "180px" }}></hr>
        <p>
          Total -{" "}
          {Cookies.get("currency") === "$"
            ? "$" + (tax + totalPrice + distanceCost - discount).toFixed(2)
            : "Rs." +
              ((tax + totalPrice + distanceCost - discount) * 60).toFixed(2)}
        </p>

        <button
          onClick={() => {
            orderProducts();
          }}
        >
          Order
        </button>
      </div>
    </>
  );
}
