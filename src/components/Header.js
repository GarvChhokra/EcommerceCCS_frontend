import React from "react";
import Laptop from "./Laptop";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <>
      <div className="header_component">
        <div className="navBar_top">
          <button>
            <b>Rs.</b> Currency<i className="fa fa-caret-down"></i>
          </button>
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
            <li>
              <a href="">
                <i className="fa fa-heart"> WishList</i>
              </a>
            </li>
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
            <h1>
              <a href="/" className="company_name">
                Creative Computer Services
              </a>
            </h1>
            <div className="search_nav">
              <input type="search" placeholder="Search"></input>
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
            <button className="cart_btn">
              Cart<i className="fa fa-shopping-cart"></i>
            </button>
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
