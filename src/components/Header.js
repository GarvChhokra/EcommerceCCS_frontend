import React, { useState } from "react";
import Laptop from "./Laptop";
import { Link } from "react-router-dom";

export default function Header(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const total = props.cart.length;
  let totalPrice = 0;
  for (let i = 0; i < total; i++) {
    let price = parseFloat(
      props.cart[i].price.replace("$", "").replace(",", "")
    );
    totalPrice += price;
  }
  return (
    <>
      <div className="header_component">
        <div className="navBar_top">
          <select defaultValue="$">
            <option value="Rs.">Rs. Currency</option>
            <option value="$" selected>
              $ Currency
            </option>
          </select>
          <ul className="navbar_top_options">
            <li>
              <a href="tel:9412052744">
                <i className="fa fa-phone"></i> 9412052744
              </a>
            </li>
            <Link to="/login">
              <li>
                <a href="">
                  <i className="fa fa-user"> My Account</i>
                </a>
              </li>
            </Link>
            <Link to="/wishlist">
              <li>
                <a href="">
                  <i className="fa fa-heart"> WishList</i>
                </a>
              </li>
            </Link>
            <Link to="/checkout">
              <li>
                <a href="">
                  <i className="fa fa-shopping-cart"> Shopping Cart</i>
                </a>
              </li>
            </Link>
            {/* <li>
              <a href="/checkout">
                <i class="fa fa-credit-card"> Checkout </i>
              </a>
            </li> */}
          </ul>
        </div>
        <div className="header">
          <div className="navBar">
            <Link to="/">
              <h1 onClick={() => props.onButtonClick("main")}>
                <a href="" className="company_name">
                  Creative Computer Services
                </a>
              </h1>
            </Link>
            <div className="search_nav">
              <input
                type="search"
                placeholder="Search"
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                }}
              ></input>
              <button
                type="submit"
                onClick={() => {
                  {
                    props.searchItemFilter(searchQuery);
                  }
                }}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
            <Link to="/checkout">
              <button className="cart_btn">
                Cart
                <i className="fa fa-shopping-cart"></i> {total} item(s) &nbsp; $
                {totalPrice}
                {props.totalPrice}
              </button>
            </Link>
          </div>
          <div className="options_sticky">
            <ul className="navbar_options">
              <li onClick={() => props.onButtonClick("laptop")}>
                Laptop & Notebooks
              </li>
              <li onClick={() => props.onButtonClick("accessories")}>
                Accessories
              </li>
              <li onClick={() => props.onButtonClick("cartridge")}>
                Printer Cartridge
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
