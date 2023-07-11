const express = require("express");
const router = express.Router()
const {createUser, loginUser, logoutUser, userDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUsers}=require("../controller/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
router.route("/registration").post(createUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/me/update").put(isAuthenticatedUser, updatePassword)
router.route("/me").get(isAuthenticatedUser,userDetails)
router.route("/me/update/info").put(isAuthenticatedUser,updateProfile)
router.route("/admin/user").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers )
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
router.route("/admin/user/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
//router.route("/admin/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUsers)
module.exports = router;