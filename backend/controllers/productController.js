//product schema import
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");



//create a database which name is  product-----Only Admin can do it
//Create product --- Admin

exports.createProduct = catchAsyncErrors(
    async (req,res,next) =>{
        req.body.user = req.user.id; //automatic ke product add korse , tar id show korbe
        const product = await Product.create(req.body);
        res.status(201).json({
            success:true,
            product
        })
    }
);


//Make a function for Get all product form database
//Get all product


exports.getAllProducts = catchAsyncErrors(async(req,res,next) => 
{
    
    const resultPerPage = 4;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .filter()
    .pagination(resultPerPage)
    .search();
  

    
  
    products = await apiFeature.query;
        
    res.status(200).json({
        success:true,
        products,
        productsCount,
        resultPerPage,
        
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



//Create new review or update the review (time : 03:47:56)

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const {rating, comment, productId } = req.body;

    const review = {
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });

    }else{

        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.ratings = 
        product.reviews.forEach((rev) => {
            avg += rev.rating;

        }) 
        product.ratings = avg
        / product.reviews.length;

await product.save({ validateBeforeSave: false });
res.status(200).json({
    success : true,
})

});

// Get All Reviews of a product (time : 04:00:56)
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });
  
  // Delete Review
  exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });