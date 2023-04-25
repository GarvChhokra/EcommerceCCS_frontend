import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";

export default function Subtotal(props) {
  const totalPrice = props.totalPrice ? props.totalPrice.toFixed(2) : "0.00";

  return (
    <div className="subtotal">
      <h1>Subtotal</h1>
      <p>
        Number of Items in the cart: {props.total} <br></br>Total:{" "}
        <strong>
          {Cookies.get("currency") === "$"
            ? "$" + props.totalPrice.toFixed(2)
            : "Rs." + (props.totalPrice * 60).toFixed(2)}
        </strong>
      </p>
      <Link to="/checkoutPayment">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
}
