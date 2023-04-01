import React from "react";

export default function Subtotal(props) {
  return (
    <div className="subtotal">
      <h1>Subtotal</h1>
      <p>
        Number of Items in the cart: {props.total} <br></br>Total:{" "}
        <strong>${props.totalPrice}</strong>
      </p>
      <button>Proceed to Checkout</button>
    </div>
  );
}
