import React from "react";
import Subtotal from "./Subtotal";
// import CurrencyFormat from "react-currency-format";

export default function Checkout() {
  return (
    <div className="checkout">
      <div className="checkout_left">
        <h1>Shopping Cart</h1>
      </div>
      <div className="checkout_right">
        <div>
          <Subtotal />
        </div>
      </div>
    </div>
  );
}
