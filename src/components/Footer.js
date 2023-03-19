import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer_columns">
          <div className="column">
            <ul>Information</ul>
            <Link to="/about">
              <li>About us</li>
            </Link>
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
            <li>Terms & Condition</li>
          </div>
          <div className="column">
            <ul>Customer Service</ul>
            <Link to="/contactus">
              <li>Contact us</li>
            </Link>
            <li>Returns</li>
            <li>Site Map</li>
          </div>
          <div className="column">
            <ul>Extras</ul>
            <li>Brands</li>
            <li>Gift Certificates</li>
            <li>Affiliate</li>
            <li>Specials</li>
          </div>
          <div className="column">
            <ul>My Account</ul>
            <Link to="/login">
              <li>My Account</li>
            </Link>
            <li>Order History</li>
            <li>Wish List</li>
            <li>Newsletter</li>
          </div>
        </div>
        <div className="copy_footer">
          <hr></hr>
          <p>Creative Computer Services &copy; 2023</p>
        </div>
      </div>
    </>
  );
}
