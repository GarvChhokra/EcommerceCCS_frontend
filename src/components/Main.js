import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Main(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(props.name.length / itemsPerPage);
  const itemsToShow = props.name.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          {itemsToShow
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
                      id: nameB.id,
                      name: nameB.name,
                      brand: nameB.brand,
                      price: nameB.price,
                      category: nameB.category,
                      description: nameB.description,
                      image: `${nameB.name}.jpg`,
                    });
                    console.log(nameB.name);
                    console.error("ID OF NAMB IN MAIN COMPONENT", nameB.id);
                  }}
                  className="my-Link"
                  to={`/${nameB.name}`}
                >
                  <img
                    className="imageProduct"
                    src={`${nameB.name}.jpg`}
                    alt={nameB.category}
                  ></img>
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
                        id: nameB.id,
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
        <div className="pageChange">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
        {/* <div className="card_buttons"></div> */}
        <hr className="partition"></hr>
      </div>
    </>
  );
}
