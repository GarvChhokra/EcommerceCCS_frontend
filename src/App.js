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
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import CheckoutPayment from "./components/CheckoutPayment";
import TotalPayment from "./components/TotalPayment";
import Terms_Condition from "./components/Terms_Condition";
import PrivacyPolicy from "./components/PrivacyPolicy";
import OrderHistory from "./components/OrderHistory";

function App() {
  const emailCookie = Cookies.get("sessionId");
  console.log("Email Cookie - ", emailCookie);
  const [orderHistory, setOrderHistory] = useState([]);
  const data_OrderHistory = () => {
    const emailDataOrder = {
      email: emailCookie,
    };
    axios
      .post("http://localhost:3200/fetchorderData", emailDataOrder)
      .then((response) => {
        if (response) {
          console.log(response.data);
          setOrderHistory(response.data);
          console.log("Fetching Order History", orderHistory);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Logout
  const onHandleLogout = () => {
    Cookies.remove("sessionId");
    alert("Logout Successful");
  };
  //

  // Load the data everytime
  useEffect(() => {
    if (
      Cookies.get("sessionId") != undefined ||
      Cookies.get("sessionId") != null
    ) {
      const reqData = {
        emailData: emailCookie,
      };
      axios
        .post("http://localhost:3200/shoppingcartItems", reqData)
        .then((response) => setCart(response.data))
        .catch((error) => {
          console.log(error);
        });
    } else {
      const cartD = JSON.parse(localStorage.getItem("cart"));
      if (cartD) {
        setCart(cartD);
      }
    }
  }, []);

  // Cart functionality
  const [cart, setCart] = useState([]);
  const handleButtonClick2 = (cartItem) => {
    console.log(cartItem);
    // setCart((prevCart) => [...prevCart, cartItem]);
    // setCart(cartItem);
    if (
      Cookies.get("sessionId") != undefined ||
      Cookies.get("sessionId") != null
    ) {
      console.log("Email Cookie - ", emailCookie);
      const requestData = {
        email: emailCookie,
        productId: cartItem.id,
        quantity: cartItem.quantity,
      };
      console.log("Cart Item klsk;kl;", cartItem);
      console.log("Request Data klsk;kl;", requestData);
      const reqData = {
        emailData: emailCookie,
        productId: cartItem.id,
      };
      axios
        .post("http://localhost:3200/shoppingcartItemsId", reqData)
        .then((response) => {
          console.log("fetchiihkj.kjl", response.data);
          const searchId = response.data.find(
            (item) => item.id === cartItem.id
          );
          if (searchId) {
            increaseQty(cartItem.id);
          } else {
            axios
              .post("http://localhost:3200/addProductsCart", requestData)
              .then((response) => {
                if (response.data == "Product data entered on the cart") {
                  // setCart(response.data);
                  const reqData = {
                    emailData: emailCookie,
                  };
                  axios
                    .post("http://localhost:3200/shoppingcartItems", reqData)
                    .then((response) => setCart(response.data))
                    .catch((error) => {
                      console.log(error);
                    });
                } else {
                  // display error message
                  console.log(response.data);
                  alert("Invalid product entered");
                }
              })
              .catch((error) => {
                // handle error
                console.log(error);
                alert("Error entering in");
              });
          }
        });
    } else {
      // alert("Login");
      const ANONYMOUS_USER_ID = uuidv4();
      // const sessionId = ANONYMOUS_USER_ID;
      // Cookies.set("sessionId", sessionId, { expires: 1 });
      // console.log("Anonymous User Cookies", Cookies.get("sessionId"));
      // const { id, ...itemWithoutId } = cartItem; // Destructure "id" and exclude it from "itemWithoutId"
      const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const existingCartItem = existingCartItems.find(
        (item) => item.id === cartItem.id
      );
      if (existingCartItem) {
        // If the item already exists in the cart, update its quantity
        existingCartItem.quantity += 1;
      } else {
        // Otherwise, add a new item to the cart with quantity of 1
        existingCartItems.push({ ...cartItem, quantity: 1 });
      }
      // const cartData = JSON.stringify([...cart, item]);
      // localStorage.setItem("cart", JSON.stringify([...cart, cartItem]));
      // setCart((prevCart) => [...prevCart, cartItem]);
      localStorage.setItem("cart", JSON.stringify(existingCartItems));
      setCart(existingCartItems);
    }
    console.log("Cart inside the function if somone add on cart: ", cart);
  };
  // show cart data using database

  const totalCartitems = cart.length;
  console.log("Total Cart Items:", totalCartitems);

  const decreaseQty = (dec_QtyId) => {
    if (
      Cookies.get("sessionId") != undefined ||
      Cookies.get("sessionId") != null
    ) {
      const data = {
        product_id: dec_QtyId,
      };
      axios
        .post("http://localhost:3200/fetchProductShoppingCart", data)
        .then((response) => {
          console.log(response.data[0].quantity);
          if (response.data[0].quantity > 1) {
            setCart((prevCart) => {
              const updatedCart = prevCart.map((item) => {
                if (item.product_id === dec_QtyId) {
                  return {
                    ...item,
                    quantity: item.quantity - 1,
                  };
                }
                return item;
              });
              return updatedCart;
            });
            const updatedData = {
              product_id: dec_QtyId,
              quantity: response.data[0].quantity - 1,
            };
            axios
              .post(
                "http://localhost:3200/updateProductShoppingCart",
                updatedData
              )
              .then((response) => {
                if (response == "Shhopping Cart Quantity updated") {
                  console.log("Data updated");
                  const reqData = {
                    emailData: emailCookie,
                  };
                  axios
                    .post("http://localhost:3200/shoppingcartItems", reqData)
                    .then((response) => setCart(response.data))
                    .catch((error) => {
                      console.log(error);
                    });
                }
              })
              .catch((error) => console.log(error));
          } else {
          }
        });
    } else {
      const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const existingCartItem = existingCartItems.find(
        (item) => item.id === dec_QtyId
      );
      if (existingCartItem.quantity > 1) {
        existingCartItem.quantity -= 1;
      } else {
      }
      localStorage.setItem("cart", JSON.stringify(existingCartItems));
      setCart(existingCartItems);
    }
  };
  const increaseQty = (incr_QtyId) => {
    if (
      Cookies.get("sessionId") != undefined ||
      Cookies.get("sessionId") != null
    ) {
      const data = {
        product_id: incr_QtyId,
      };
      axios
        .post("http://localhost:3200/fetchProductShoppingCart", data)
        .then((response) => {
          console.log(response.data[0].quantity);
          if (response.data[0].quantity < 10) {
            const updatedData = {
              product_id: incr_QtyId,
              quantity: response.data[0].quantity + 1,
            };
            setCart((prevCart) => {
              const updatedCart = prevCart.map((item) => {
                if (item.product_id === incr_QtyId) {
                  return {
                    ...item,
                    quantity: item.quantity + 1,
                  };
                }
                return item;
              });
              return updatedCart;
            });

            axios
              .post(
                "http://localhost:3200/updateProductShoppingCart",
                updatedData
              )
              .then((response) => {
                if (response == "Shopping Cart Quantity updated") {
                  console.log("Data updated");

                  const reqData = {
                    emailData: emailCookie,
                  };
                  axios
                    .post("http://localhost:3200/shoppingcartItems", reqData)
                    .then((response) => setCart(response.data))
                    .catch((error) => {
                      console.log(error);
                    });
                }
              })
              .catch((error) => console.log(error));
          } else {
          }
        });
    } else {
      const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const existingCartItem = existingCartItems.find(
        (item) => item.id === incr_QtyId
      );
      if (existingCartItem.quantity < 10) {
        existingCartItem.quantity += 1;
      } else {
      }
      localStorage.setItem("cart", JSON.stringify(existingCartItems));
      setCart(existingCartItems);
    }
  };

  // remove product from shopping cart in the database
  const removeItem = (removeItemId) => {
    if (
      Cookies.get("sessionId") != undefined ||
      Cookies.get("sessionId") != null
    ) {
      const requestData = {
        id: removeItemId,
      };
      axios
        .post("http://localhost:3200/removeItems_cart", requestData)
        .then((response) => {
          if (response.data == "Product removed from the cart") {
            const reqData = {
              emailData: emailCookie,
            };
            axios
              .post("http://localhost:3200/shoppingcartItems", reqData)
              .then((response) => setCart(response.data))
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log("Cannot delete product");
          }
        });
      const reqData = {
        emailData: emailCookie,
      };
    } else {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == removeItemId) {
          var index = i;
          console.log("Item:", removeItem);
          const newCart = [...cart]; // create new copy of cart
          newCart.splice(index, 1); // modify the copy
          localStorage.setItem("cart", JSON.stringify(newCart));
          setCart(newCart); // set the state to the new copy
          console.log(newCart);
        }
      }
    }
  };

  // const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    console.log("Updated cart:", cart);
  }, [cart]);

  useEffect(() => {
    console.log("Updated cart:", cart);
  }, [localStorage.getItem("cart")]);

  // Wishlist functionality
  const [wishList, setWishList] = useState([]);
  const handleButtonClick3 = (wishListItem) => {
    console.log(wishListItem);
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
    console.warn("Product Name", productName);

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
  console.log(name);
  useEffect(() => {
    axios
      .post("http://localhost:3200/fetchProducts")
      // .get("https://ccsdata.onrender.com/ccsData")
      .then((response) => setName(response.data))
      .catch((error) => console.log(error));
  }, []);

  const clickRefresh = () => {
    console.warn("Click");
    const reqData = {
      emailData: emailCookie,
    };
    axios
      .post("http://localhost:3200/shoppingcartItems", reqData)
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Router>
        <Header
          onButtonClick={handleButtonClick}
          cart={cart}
          searchItemFilter={searchItemFilter}
          onHandleLogout={onHandleLogout}
        />
        <main>
          <Switch>
            <Route path="/checkout">
              <Checkout
                cart={cart}
                // totalPrice={totalPrice}
                removeCartBtn={removeItem}
                decreaseQty={decreaseQty}
                increaseQty={increaseQty}
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
            <Route path="/checkoutPayment">
              <CheckoutPayment />
            </Route>
            <Route path="/privacypolicy">
              <PrivacyPolicy />
            </Route>
            <Route path="/payment">
              <TotalPayment cart={cart} />
            </Route>
            <Route path="/about">
              <About_Us client={client} />
            </Route>
            <Route path="/contactus">
              <ContactUs />
            </Route>
            <Route path="/termsCondition">
              <Terms_Condition />
            </Route>
            <Route path="/login">
              <Login cart={cart} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/orderhistory">
              <OrderHistory orderHistory={orderHistory} />
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
        <Footer data_OrderHistory={data_OrderHistory} />
      </Router>
    </>
  );
}

export default App;
