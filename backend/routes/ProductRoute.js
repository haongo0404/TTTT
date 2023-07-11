const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, getSingleProductReviews, deleteReview } = require("../controller/ProductController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const { loginUser } = require("../controller/UserController");
const router =express.Router()

router.route("/products").get(getAllProducts)
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
router.route("/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
router.route("/product/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
router.route("/product/:id").get(getSingleProduct)
router.route("/product/review").post(isAuthenticatedUser,createProductReview)
router.route("/review").get(getSingleProductReviews)
router.route("/review").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteReview)
module.exports= router