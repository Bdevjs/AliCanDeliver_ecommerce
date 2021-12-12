const express = require ("express");

const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");

const router = express.Router();


//route for get product
router.route("/products").get(getAllProducts);

//route for create product items
router.route("/product/new").post(createProduct);

//route for update items
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = router