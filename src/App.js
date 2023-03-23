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

function App() {
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
        <Header onButtonClick={handleButtonClick} />
        <main>
          <Switch>
            <Route path="/checkout">
              <Checkout />
            </Route>
            {name.map((nameB) => (
              <Route key={nameB.name} path={`/${nameB.name}`}>
                <ProductInfo />
              </Route>
            ))}
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
              {!activeButton && <Main name={name} />}
              {activeButton === "laptop" && <Laptop name={name} />}
              {activeButton === "accessories" && <Accessories name={name} />}
              {activeButton === "cartridge" && (
                <Printer_Cartridge name={name} />
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
