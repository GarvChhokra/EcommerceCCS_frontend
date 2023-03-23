import React, { useState, useEffect } from "react";

export default function Accessories(props) {
  return (
    <>
      <div className="main">
        <div className="banner_img">
          <img className="mySlides" src="main.jpg"></img>
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
            .map((nameB) => (
              <div className="card">
                <img src={`${nameB.name}.jpg`} alt={nameB.category}></img>
                <h4>{nameB.name}</h4>
                <p>{nameB.description}</p>
                <p>{nameB.price}</p>
                <div className="abx">
                  <button>
                    <i className="fa fa-shopping-cart"> Add to cart</i>
                  </button>
                  <button>
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
