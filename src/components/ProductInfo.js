import React from "react";

export default function ProductInfo(props) {
  // var details = `/${props.name}`;
  return (
    <>
      <div className="productInfo">
        <div className="productInfo_left">
          <img src={props.item.image}></img>
          <h4>Description</h4>
          <p>{props.item.description}</p>
        </div>
        <div className="productInfo_right">
          <h2>{props.item.name}</h2>
          <p>
            <strong>Brand:</strong> {props.item.brand}
          </p>
          <p>
            <strong>Price:</strong> {props.item.price}
          </p>
          <p>
            <label>Qty:</label>
            <br></br>
            <input type="text" defaultValue={1}></input>
          </p>
          <button>Add to Cart</button>
        </div>
      </div>
    </>
  );
}
