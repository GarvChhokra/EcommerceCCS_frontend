import React from "react";

export default function Main() {
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
        <div className="card">
          <img src="hpvictus.jpg"></img>
          <h4>VICTUS 16.1" Intel Gaming Laptop</h4>
          <p>
            The VICTUS 16.1 inch Gaming Laptop PC has what you need to play. It
            has up to an 11th Generation Intel® Core™ i7 processor.
          </p>
          <p>
            <small>$</small>
            1500
          </p>
          <div className="abx">
            <button>
              <i class="fa fa-shopping-cart"> Add to cart</i>
            </button>
            <button>
              <i class="fa fa-heart"></i>
            </button>
            <button>
              <i class="fa fa-exchange"></i>
            </button>
          </div>
        </div>
        {/* <div className="card_buttons"></div> */}
        <hr className="partition"></hr>
      </div>
    </>
  );
}
