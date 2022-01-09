
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader"; //automatic download front [npm i webfontloader]
import './App.css';
import Contact from "./component/contact/ContactPage";
import Home from "./component/Home/Home";
import Footer from "./component/layout/Footer/Footer";
import Header from "./component/layout/Header/Header.js";
import ProductDetails from "./component/Product/ProductDetails";

function App() {

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return <Router>
    <Header />
    <Route exact path="/" component={Home} />
    <Route exact path="/product/:id" component={ProductDetails} />
    <Route exact path="/contact" component={Contact} />
    
    <Footer />
  </Router>;  
  
};

export default App;
