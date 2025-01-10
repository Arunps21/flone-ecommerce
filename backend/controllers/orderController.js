const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const razorpay = require("razorpay");

var razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const cashOnDelivery = async (req, res) => {
  try {
    const { userId, productId, cartAmount, address, paymentMethod } = req.body;

    let user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(200).json({ success: false, msg: "User not found" });
    }

    await orderModel.create({
      userId,
      products: productId.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
        size: product.size,
      })),
      amount: cartAmount,
      address,
      paymentMethod,
      status: "Pending",
      payment: false,
    });

    await userModel.findByIdAndUpdate(userId, { cart: [] });
    res.status(200).json({ success: true, msg: "Order Placed" });
  } catch (err) {
    console.log(err);
  }
};

const razorPay = async (req, res) => {
  try {
    const { userId, productId, cartAmount, address, paymentMethod } = req.body;
    let user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(200).json({ success: false, msg: "User not found" });
    }

    let order = await orderModel.create({
      userId,
      products: productId.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
        size: product.size,
      })),
      amount: cartAmount,
      address,
      paymentMethod,
      status: "Pending",
      payment: false,
    });

    const options = {
      amount: cartAmount * 100,
      currency: "INR",
      receipt: order._id.toString(),
    };

    await razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.log(err);
        res.status(200).json({ success: false, msg: err.message });
      } else {
        res.status(201).json({ success: true, order });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

const verifyRazorPay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;

    console.log(req.body);

    const fetchOrderDetails = await razorpayInstance.orders.fetch(
      razorpay_order_id
    );
    console.log(fetchOrderDetails);

    if (fetchOrderDetails.status === "paid") {
      await orderModel.findByIdAndUpdate(fetchOrderDetails.receipt, {
        payment: true,
      });
      await userModel.findByIdAndUpdate(userId, { cart: [] });
      res.status(200).json({ success: true, msg: "Order Placed" });
    } else {
      res.status(200).json({ success: false, msg: "Payment Failed" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const adminOrders = async (req, res) => {
  try {
    let orders = await orderModel.find().populate("products.productId").exec();
    if (orders.length > 0) {
      res.status(200).json({ success: true, orders });
    } else {
      res.status(200).json({ success: false, msg: "No orders found" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const userOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    let user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(200).json({ success: false, msg: "User not found" });
    }

    let orders = await orderModel
      .find({ userId })
      .populate("products.productId")
      .exec();

    if (orders.length > 0) {
      res.status(200).json({ success: true, orders });
    } else {
      res.status(200).json({ success: false, msg: "No orders found" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const getOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    let user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(200).json({ success: false, msg: "User not found" });
    }
    let order = await orderModel
      .findOne({ _id: id })
      .populate("products.productId")
      .exec();
    if (order) {
      return res.status(200).json({ success: true, order });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, msg: "Failed to fetch order" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, msg: "Status updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, msg: "Failed to update status" });
  }
};

module.exports = {
  cashOnDelivery,
  razorPay,
  adminOrders,
  userOrder,
  getOrder,
  updateStatus,
  verifyRazorPay,
};
