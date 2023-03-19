import React, { useState } from "react";
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

  return (
    <>
      <Router>
        <Header onButtonClick={handleButtonClick} />
        <main>
          <Switch>
            <Route path="/checkout">
              <Checkout />
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
              {!activeButton && <Main />}
              {activeButton === "laptop" && <Laptop />}
              {activeButton === "accessories" && <Accessories />}
              {activeButton === "cartridge" && <Printer_Cartridge />}
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
