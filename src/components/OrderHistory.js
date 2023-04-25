import axios from "axios";
import React from "react";

function OrderHistory(props) {
  console.log(props.orderHistory);
  return (
    <>
      <div className="orderHistory">
        {props.orderHistory.map((itm) => (
          <div className="orderHistoryProducts">
            <img src={`${itm.name}.jpg`}></img>
            <p>{itm.name}</p>
            <p>{itm.price}</p>
            <p>{itm.date}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default OrderHistory;
