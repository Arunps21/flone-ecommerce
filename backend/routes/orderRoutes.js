const express = require("express");
const orderRoutes = express.Router();
const {
  cashOnDelivery,
  razorPay,
  adminOrders,
  userOrder,
  getOrder,
  updateStatus,
  verifyRazorPay
} = require("../controllers/orderController");
const { isAdmin } = require("../middlewares/isAdmin");
const { isUser } = require("../middlewares/isUser");

//admin
orderRoutes.route("/list").get(isAdmin, adminOrders);
orderRoutes.route("/status").post(isAdmin, updateStatus);

//payment
orderRoutes.route("/cod").post(isUser, cashOnDelivery);
orderRoutes.route("/razorpay").post(isUser, razorPay);
orderRoutes.route("/verify").post(isUser,verifyRazorPay)

//user
orderRoutes.route("/userorder").post(isUser, userOrder);
orderRoutes.route("/getorder/:id").post(isUser, getOrder);

module.exports = orderRoutes;
