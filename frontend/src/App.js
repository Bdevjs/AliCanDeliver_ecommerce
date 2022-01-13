
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader"; //automatic download front [npm i webfontloader]
import { loadUser } from "./actions/userAction";
import './App.css';
import Contact from "./component/contact/ContactPage";
import Home from "./component/Home/Home";
import Footer from "./component/layout/Footer/Footer";
import Header from "./component/layout/Header/Header.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile.js";
import store from "./store";

function App() {

  const {isAuthenticated, user} = useSelector((state) => state.user);
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return <Router>
    <Header />

    {isAuthenticated && <UserOptions user = {user} />}
    <Route exact path="/" component={Home} />
    <Route exact path="/product/:id" component={ProductDetails} />
    <Route exact path="/products" component={Products} />
    <Route  path="/products/:keyword" component={Products} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/contact" component={Contact} />
    <Route exact path="/account" component={Profile} />
    <Route exact path="/login" component={LoginSignUp} />
    
    <Footer />
  </Router>;  
  
};

export default App;
