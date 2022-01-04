import React, { Fragment } from 'react';
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData";

const product ={
    name: "Black T-shirt",
    price: "$300",
    _id: "medhai",
    images: [{ url: "https://i.ibb.co/DRST11n/1.webp"}],
};

const Home = () => {
    return <Fragment>
        <MetaData title="Techdummise_Homepage"/>
        <div className='banner'>
            <p>Welcome to Halal Grocery</p>
            <h1>FIND AWSOME PRODUCT BELOW</h1>

            <a href="#container">
            <button>
                Scroll <CgMouse/>
            </button>
        </a>
        </div>
        <h2 className='homeHeading'>Feature Products</h2>

        <div className='container' id='container'>
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />

        </div>

        
    </Fragment>
}

export default Home
