import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Main(props) {
  // const [name, setName] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://ccsdata.onrender.com/ccsData")
  //     .then((response) => setName(response.data))
  //     .catch((error) => console.log(error));
  // }, []);
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
          {props.name.map((nameB) => (
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
