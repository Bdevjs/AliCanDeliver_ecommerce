const express = require ("express");

const { 
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct, 
    getProductDetails,
    createProductReview,
    getProductReviews,
    deleteReview,
    } = require("../controllers/productController");
const { isAuthenticatedUser, authorizreRoles} = require("../middleware/auth");

const router = express.Router();


//route for get product
router.route("/products").get(getAllProducts);

//route for create product items
router.route("/admin/product/new").post(isAuthenticatedUser, authorizreRoles("admin"), createProduct);

//route for update items
router
    .route("/admin/product/:id")
    
    .put(isAuthenticatedUser, authorizreRoles("admin"),updateProduct)
    .delete(isAuthenticatedUser, authorizreRoles("admin"),deleteProduct);

router
    .route("/product/:id").get(getProductDetails); // time: 03:37:30

router
    .route("/review").put( isAuthenticatedUser, createProductReview);// time: 03:57:00
    
router
    .route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);
module.exports = router