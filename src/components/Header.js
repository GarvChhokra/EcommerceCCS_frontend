import React, { useState, useEffect } from "react";
import Laptop from "./Laptop";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header(props) {
  const [logouttext, setLogouttext] = useState("");
  const emailCookie = Cookies.get("sessionId");
  useEffect(() => {
    if (emailCookie != undefined || emailCookie != null) {
      setLogouttext(
        <i className="fa fa-user" onClick={props.onHandleLogout}>
          {" "}
          Logout {emailCookie}
        </i>
      );
    } else {
      console.log("Cookie not there");
      setLogouttext(
        <Link to="/login">
          <i className="fa fa-user"> My Account {emailCookie}</i>
        </Link>
      );
    }
  }, [emailCookie]);

  const location = useLocation();
  const email = location.state && location.state.email;
  const [searchQuery, setSearchQuery] = useState("");
  const total = props.cart.length;
  let totalPrice = 0;
  for (let i = 0; i < total; i++) {
    let price = parseFloat(
      props.cart[i].quantity *
        props.cart[i].price.replace("$", "").replace(",", "")
    );
    totalPrice += price;
  }
  // const [currency, setCurrency] = useState(Cookies.get("currency") || "$");
  const handleCurrencyChange = (e) => {
    console.warn(e.target.value);
    console.log(Cookies.get("currency"));
    // setCurrency(e.target.value);
    if (
      e.target.value == Cookies.get("currency") ||
      Cookies.get("currency") == undefined
    ) {
    } else {
      window.location.reload();
    }
    Cookies.set("currency", e.target.value);
  };
  return (
    <>
      <div className="header_component">
        <div className="navBar_top">
          <select
            defaultValue={Cookies.get("currency") == "$" ? "$" : "Rs."}
            onClick={(e) => {
              handleCurrencyChange(e);
            }}
          >
            <option value="Rs.">Rs. Currency</option>
            <option value="$" selected>
              $ Currency
            </option>
          </select>
          <ul className="navbar_top_options">
            <li>
              <a href="tel:9412052744">
                <i className="fa fa-phone"></i> <span>9412052744</span>
              </a>
            </li>
            {/* <Link to="/login"> */}
            <li>
              <a id="logIO" className="logIO" href="">
                {logouttext}
              </a>
            </li>
            {/* </Link> */}
            <Link to="/wishlist">
              <li>
                <a href="">
                  <i className="fa fa-heart">
                    {" "}
                    <span>WishList</span>
                  </i>
                </a>
              </li>
            </Link>
            <Link to="/checkout">
              <li>
                <a href="">
                  <i className="fa fa-shopping-cart">
                    <span>Shopping Cart</span>
                  </i>
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
                {/* <h1> */}
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
                <span>Cart</span>
                <i className="fa fa-shopping-cart"></i> {total} item(s) &nbsp;
                {Cookies.get("currency") === "$"
                  ? "$" + totalPrice.toFixed(2)
                  : "Rs." + (totalPrice * 60).toFixed(2)}
                {/* {props.totalPrice} */}
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
