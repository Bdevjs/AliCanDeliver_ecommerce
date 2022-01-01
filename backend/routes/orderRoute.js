//time {4:17:22}

const express = require("express");
const { 
    newOrder,
    getSingleOrder, 
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,

    } = require("../controllers/orderController");
const router = express.Router();

const { athorizeRoles, isAuthenticatedUser, authorizreRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id")
      .get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
    .route("/admin/orders")
    .get(isAuthenticatedUser, authorizreRoles("admin"), getAllOrders);

router  
    .route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizreRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizreRoles("admin"), deleteOrder);

module.exports = router;