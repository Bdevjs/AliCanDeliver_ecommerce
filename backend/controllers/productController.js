//product schema import
const Product = require("../models/productModel");


//create a database which name is  product-----Only Admin can do it

exports.createProduct = async (req,res,next) =>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}


//Make a function for Get all product form database

exports.getAllProducts = async(req,res) => {
    const products= await Product.find();

    res.status(200).json({
        success:true,
        products
    })
}

//Update Product ---- Only Admin can update it.

exports.updateProduct = async (req, res, next) =>{

    let product = await Product.findById(req.params.id); // Id wise information gether into product variable
    
    if(!product)
    {  //If product are not there i mean empty

        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{ //here Product represent product schema
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
}

//Delete product

exports.deleteProduct = async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product)
    {
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"product delete successfully"
    })
}