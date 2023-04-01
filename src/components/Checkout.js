import React from "react";
import Subtotal from "./Subtotal";
// import CurrencyFormat from "react-currency-format";

export default function Checkout(props) {
  const total = props.cart.length;
  let totalPrice = 0;
  for (let i = 0; i < total; i++) {
    let price = parseFloat(
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
            console.log(props.cart.length);
            return (
              <>
                <div key={itm.id} className="cardCheckout">
                  <img src={itm.image}></img>
                  <p>{itm.name}</p>
                  <p>{itm.price}</p>
                  <button
                    onClick={() => {
                      props.removeCartBtn(itm.name);
                      console.log(itm.name);
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
