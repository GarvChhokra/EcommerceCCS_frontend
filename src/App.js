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

function App() {
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
              {activeButton === "laptop" && <h5></h5>}
              {activeButton === "accessories" && <h5></h5>}
              {activeButton === "cartridge" && <h5></h5>}
              <Checkout />
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
