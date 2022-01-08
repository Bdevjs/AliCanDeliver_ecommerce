
import './App.css';
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import {BrowserRouter as Router, Route} from "react-router-dom";
import WebFont from "webfontloader"; //automatic download front [npm i webfontloader]
import React from "react";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails"

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
    <Route extact path="/" component={Home} />
    <Route exact path="/product/:id" component={ProductDetails} />
    
    <Footer />
  </Router>;  
  
};

export default App;