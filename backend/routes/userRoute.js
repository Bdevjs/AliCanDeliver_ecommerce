const express = require ("express"); // Step 3 -> s-4(app.js)
const { registerUser,
        loginUser,
        logout,
        forgetPassword,
        resetPassword,
        getUserDetails,
        updatePassword,
        updateProfile,
        getAllUser,
        getSingleUser,
        updateUserRole,
        deleteUser, } = require("../controllers/userController");
const { isAuthenticatedUser, authorizreRoles  } = require("../middleware/auth");
const router = express.Router();



router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/admin/users").get(isAuthenticatedUser, authorizreRoles("admin"), getAllUser);

router.route("/admin/users/:id")
        .get(isAuthenticatedUser, authorizreRoles("admin"), getSingleUser)
        .put(isAuthenticatedUser, authorizreRoles("admin"),updateUserRole)
        .delete(isAuthenticatedUser, authorizreRoles("admin"),deleteUser);




module.exports = router;

