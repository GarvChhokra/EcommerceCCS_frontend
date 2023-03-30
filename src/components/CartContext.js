import React, { useState } from "react";
import { createContext } from "react";
export default function CartContext(props) {
  const [cart, setCart] = useState([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {props.children}
    </CartContext.Provider>
  );
}
