import React from "react";
import { Link } from "react-router-dom";

export default function Footer(props) {
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
            <Link to="/privacypolicy">
              <li>Privacy Policy</li>
            </Link>
            <Link to="/termsCondition">
              <li>Terms & Condition</li>
            </Link>
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
            <Link to="/orderhistory">
              <li
                onClick={() => {
                  props.data_OrderHistory();
                }}
              >
                Order History
              </li>
            </Link>
            <Link to="/wishlist">
              <li>Wish List</li>
            </Link>
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
