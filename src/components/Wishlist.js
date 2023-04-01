import React from "react";

export default function Wishlist(props) {
  return (
    <div className="wishlist">
      <p>
        <i>Total: {props.wishList.length}</i>
      </p>
      {props.wishList.map((wishItm) => {
        return (
          <div className="cardWishList">
            <img src={wishItm.image}></img>
            <p>{wishItm.name}</p>
            <p>{wishItm.price}</p>
            <button
              className="addCartWish"
              onClick={() => {
                props.onButtonClick1({
                  name: wishItm.name,
                  brand: wishItm.brand,
                  price: wishItm.price,
                  category: wishItm.category,
                  description: wishItm.description,
                  image: `${wishItm.name}.jpg`,
                });
              }}
            >
              Add to Cart
            </button>
            <button
              className="removeWishList"
              onClick={() => {
                props.removeWishItems(wishItm.name);
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}
