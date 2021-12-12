//product schema import
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");



//create a database which name is  product-----Only Admin can do it
//Create product --- Admin

exports.createProduct = catchAsyncErrors(
    async (req,res,next) =>{
        const product = await Product.create(req.body);
        res.status(201).json({
            success:true,
            product
        })
    }
);


//Make a function for Get all product form database
//Get all product


exports.getAllProducts = catchAsyncErrors(async(req,res) => 
{

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query).filter().pagination(resultPerPage).search();
    let products = await apiFeature.query;
        
    res.status(200).json({
        success:true,
        products
    })
});


//Get Product Details

exports.getProductDetails = catchAsyncErrors(async(req, res, next) => 
{
    const product = await Product.findById(req.params.id)
    if(!product)
    {
       return next(new ErrorHander("Product not found", 404));
    }
    res.status(200).json({
        success:true,
        product,
        productCount,
    })
});



//Update Product ---- Only Admin can update it.

exports.updateProduct = catchAsyncErrors(async (req, res, next) =>
{
    let product = await Product.findById(req.params.id); // Id wise information gether into product variable   
    if(!product)
    {  //If product are not there i mean empty

        return next(new ErrorHander("Product not found", 404));
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
});

//Delete product

exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product)
    {
        return next(new ErrorHander("Product not found", 404));
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"product delete successfully"
    })
});