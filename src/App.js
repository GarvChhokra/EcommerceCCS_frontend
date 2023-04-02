import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Laptop from "./components/Laptop";
import Accessories from "./components/Accessories";
import Printer_Cartridge from "./components/Printer_Cartridge";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import About_Us from "./components/About_Us";
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductInfo from "./components/ProductInfo";
import Wishlist from "./components/Wishlist";

function App() {
  // Cart functionality
  const [cart, setCart] = useState([]);
  const handleButtonClick2 = (cartItem) => {
    setCart((prevCart) => [...prevCart, cartItem]);
    // setCart(cartItem);
    console.log(cart);
  };
  const totalCartitems = cart.length;
  console.log("Total Cart Items:", totalCartitems);

  const removeItem = (removeItem) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name == removeItem) {
        var index = i;
        console.log("Item:", removeItem);
        const newCart = [...cart]; // create new copy of cart
        newCart.splice(index, 1); // modify the copy
        setCart(newCart); // set the state to the new copy
        console.log(newCart);
      }
    }
  };
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    console.log("Updated cart:", cart);
  }, [cart]);

  // Wishlist functionality
  const [wishList, setWishList] = useState([]);
  const handleButtonClick3 = (wishListItem) => {
    setWishList((prevWishList) => [...prevWishList, wishListItem]);
    console.log(wishList);
  };
  useEffect(() => {
    console.log("Updated wishlist:", wishList);
  }, [wishList]);

  const removeWishItems = (removeWItem) => {
    for (let i = 0; i < wishList.length; i++) {
      if (wishList[i].name == removeWItem) {
        var idex = i;
        const newWishList = [...wishList];
        newWishList.splice(idex, 1);
        setWishList(newWishList);
      }
    }
  };

  // individual page for product
  const [item, setItem] = useState([]);
  const handleButtonClick1 = (productName) => {
    console.log(productName);
    setItem(productName);
  };

  // Search
  const [searchItem, setSearchItem] = useState([]);

  const searchItemFilter = (sItem) => {
    setSearchItem(sItem.toLowerCase());
    console.log(sItem.toLowerCase());
  };

  const client = [
    "THDC INDIA LTD.",
    "MODERN INSTITUTE OF TECHNOLOGY",
    "NIRMAL ASHRAM HOSPITAL",
    "NIRMAL ASHRAM HOSPITAL",
    "NIRMAL ASHRAM HOSPITAL",
    "RISHIKESH PUBLIC SCHOOL",
    "APCO INFRASTUCTURE PVT LTD.",
    "NAVAYUGA ENGINEERING COMPANY LTD.",
    "NAVAYUGA ENGINEERING COMPANY LTD.",
    "DAYANANDA ASHRAM",
    "SHIVANANDA ASHRAM",
    "SHIVANANDA ASHRAM",
    "SHIVANANDA ASHRAM",
    "GOVT GIRLS INTER COLLEGE",
    "ALL INDIA INSTITUE OF MEDICAL SCIENCES, RISHIKESH",
  ];
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const [name, setName] = useState([]);

  useEffect(() => {
    axios
      .get("https://ccsdata.onrender.com/ccsData")
      .then((response) => setName(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Router>
        <Header
          onButtonClick={handleButtonClick}
          cart={cart}
          searchItemFilter={searchItemFilter}
        />
        <main>
          <Switch>
            <Route path="/checkout">
              <Checkout
                cart={cart}
                totalPrice={totalPrice}
                removeCartBtn={removeItem}
              />
            </Route>
            {/* {name.map((nameB) => (
              <Route key={nameB.name} path={`/${nameB.name}`}>
                <ProductInfo name={name} />
              </Route>
            ))} */}
            <Route path={`/${item.name}`}>
              <ProductInfo item={item} onButtonClick1={handleButtonClick2} />
            </Route>
            <Route path="/wishlist">
              <Wishlist
                wishList={wishList}
                onButtonClick1={handleButtonClick2}
                removeWishItems={removeWishItems}
              />
            </Route>
            <Route path="/about">
              <About_Us client={client} />
            </Route>
            <Route path="/contactus">
              <ContactUs />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              {!activeButton && (
                <Main
                  name={name}
                  onButtonClick={handleButtonClick1}
                  onButtonClick1={handleButtonClick2}
                  onButtonClick2={handleButtonClick3}
                  cart={cart}
                />
              )}
              {activeButton === "main" && (
                <Main
                  name={name}
                  onButtonClick={handleButtonClick1}
                  onButtonClick1={handleButtonClick2}
                  onButtonClick2={handleButtonClick3}
                  searchItem={searchItem}
                  cart={cart}
                />
              )}
              {activeButton === "laptop" && (
                <Laptop
                  name={name}
                  onButtonClick={handleButtonClick1}
                  onButtonClick1={handleButtonClick2}
                  onButtonClick2={handleButtonClick3}
                  searchItem={searchItem}
                  cart={cart}
                />
              )}
              {activeButton === "accessories" && (
                <Accessories
                  name={name}
                  onButtonClick={handleButtonClick1}
                  onButtonClick1={handleButtonClick2}
                  onButtonClick2={handleButtonClick3}
                  searchItem={searchItem}
                  cart={cart}
                />
              )}
              {activeButton === "cartridge" && (
                <Printer_Cartridge
                  name={name}
                  onButtonClick={handleButtonClick1}
                  onButtonClick1={handleButtonClick2}
                  onButtonClick2={handleButtonClick3}
                  cart={cart}
                  searchItem={searchItem}
                />
              )}
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
