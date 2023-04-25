import React, { useEffect } from "react";
import Subtotal from "./Subtotal";
import Cookies from "js-cookie";
import axios from "axios";
// import CurrencyFormat from "react-currency-format";

export default function Checkout(props) {
  console.log("Shopping Cart Cart Item", props.cart);
  const total = props.cart.length;
  let totalPrice = 0;
  for (let i = 0; i < total; i++) {
    let price = parseFloat(
      props.cart[i].quantity *
        props.cart[i].price.replace("$", "").replace(",", "")
    );
    totalPrice += price;
  }
  if (props.cart.length === 0) {
    return (
      <p className="emptyStatus">
        <i>Total: {total}</i>
        <br></br>
        Please Add Something
      </p>
    );
  } else {
    return (
      <div className="checkout">
        <div className="checkout_left">
          <h1>Shopping Cart</h1>
          {props.cart.map((itm) => {
            console.log("Checkout length:", props.cart.length);
            return (
              <>
                <div key={itm.id} className="cardCheckout">
                  <img src={`${itm.name}.jpg`}></img>
                  <p>{itm.name}</p>
                  <p>
                    {Cookies.get("currency") === "$"
                      ? "$" + itm.price
                      : "Rs." + (itm.price * 60).toFixed(2)}
                  </p>
                  <button
                    className="addMin"
                    style={{ backgroundColor: "lightblue" }}
                    onClick={() => {
                      props.decreaseQty(itm.id);
                    }}
                  >
                    -
                  </button>
                  <p>Qty: {itm.quantity}</p>
                  <button
                    className="addMin"
                    style={{ backgroundColor: "lightblue", marginRight: "5px" }}
                    onClick={() => {
                      props.increaseQty(itm.id);
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      // props.removeCartBtn(itm.name);
                      props.removeCartBtn(itm.id);
                      console.log("Checkout item that clicked:", itm.name);
                      console.log("Checkout item ID that clicked:", itm.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </>
            );
          })}
        </div>
        <div className="checkout_right">
          <div>
            <Subtotal total={total} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    );
  }
}
