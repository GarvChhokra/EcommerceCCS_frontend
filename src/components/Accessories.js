import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Accessories(props) {
  return (
    <>
      <div className="main">
        <div className="banner_img">
          <img className="mySlides" src="accessories.jpg"></img>
          {/* <img className="mySlides" src="accessories.jpg"></img>
          <img className="mySlides" src="banner.jpg"></img>
          <img className="mySlides" src="printer_cartridge.jpg"></img> */}
        </div>
        <h3>Featured</h3>
        {/* <ul>
          {name.map((nameB) => (
            <li key={nameB.price}>{nameB.price}</li>
          ))}
        </ul> */}
        <div className="card_jsn">
          {props.name
            .filter((item) => item.category === "Laptop Accessory")
            .filter((search) => {
              if (search.name.toLowerCase().match(props.searchItem)) {
                return search;
              } else if (props.searchItem == "") {
                return search;
              }
            })
            .map((nameB) => (
              <div className="card">
                <Link
                  onClick={() => {
                    props.onButtonClick({
                      name: nameB.name,
                      brand: nameB.brand,
                      price: nameB.price,
                      category: nameB.category,
                      description: nameB.description,
                      image: `${nameB.name}.jpg`,
                    });
                    console.log(nameB.name);
                  }}
                  className="my-Link"
                  to={`/${nameB.name}`}
                >
                  <img src={`${nameB.name}.jpg`} alt={nameB.category}></img>
                  <h4>{nameB.name}</h4>
                </Link>
                <p className="description">{nameB.description}</p>
                <p>
                  {Cookies.get("currency") === "$"
                    ? "$" + nameB.price
                    : "Rs." + (nameB.price * 60).toFixed(2)}
                </p>
                <div className="abx">
                  <button
                    onClick={() => {
                      props.onButtonClick1({
                        name: nameB.name,
                        brand: nameB.brand,
                        price: nameB.price,
                        category: nameB.category,
                        description: nameB.description,
                        image: `${nameB.name}.jpg`,
                      });
                    }}
                  >
                    <i className="fa fa-shopping-cart"> Add to cart</i>
                  </button>
                  <button
                    onClick={() => {
                      props.onButtonClick2({
                        name: nameB.name,
                        brand: nameB.brand,
                        price: nameB.price,
                        category: nameB.category,
                        description: nameB.description,
                        image: `${nameB.name}.jpg`,
                      });
                    }}
                  >
                    <i className="fa fa-heart"></i>
                  </button>
                  <button>
                    <i className="fa fa-exchange"></i>
                  </button>
                </div>
              </div>
            ))}
        </div>
        {/* <div className="card_buttons"></div> */}
        <hr className="partition"></hr>
      </div>
    </>
  );
}
