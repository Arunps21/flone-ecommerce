const express = require("express")
const userRoutes = express.Router()
const { userRegister, userLogin, addToCart, cartView, cartDelete, userView, viewAllUser, deleteUser, updateQuantity } = require("../controllers/userController")
const {isUser} = require("../middlewares/isUser")
const {isAdmin} = require("../middlewares/isAdmin")

userRoutes.route("/register").post(userRegister)
userRoutes.route("/login").post(userLogin)
userRoutes.route("/profile").post(isUser,userView)
userRoutes.route("/addtocart").post(isUser,addToCart)
userRoutes.route("/viewcart").get(isUser,cartView)
userRoutes.route("/deletecartitems").post(isUser,cartDelete)
userRoutes.route("/viewuser").get(viewAllUser)
userRoutes.route("/deleteUser/:id").post(isAdmin,deleteUser)
userRoutes.route("/updatecartquantity").post(isUser,updateQuantity)

module.exports = userRoutes