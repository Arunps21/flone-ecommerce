const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const salt = 10;
const { tokenCreation } = require("../utils/generateToken");

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(200)
        .json({ success: false, msg: "User already exist" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(200)
        .json({ success: false, msg: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res
        .status(200)
        .json({ success: false, msg: "Please enter a strong password" });
    }
    const hash = await bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        return console.log(err.message);
      }
      let createdUser = await userModel.create({
        name,
        email,
        password: hash,
      });
      const token = tokenCreation(createdUser._id);
      res.status(200).json({ success: true, msg: "User registed", token });
    });
  } catch (err) {
    console.log(err.message);
    res.status(200).json({ success: false, msg: "Failed to register" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).json({ success: false, msg: "User not exists" });
    }
    let result = await bcrypt.compare(password, user.password);
    if (!result) {
      res.status(200).json({ success: false, msg: "Incorrect passowrd" });
    } else {
      const token = tokenCreation(user._id);
      res.status(200).json({ success: true, msg: "Login success", token });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, msg: "Failed to login" });
  }
};

const userView = async (req, res) => {
  try {
    const userId = req.body?.userId;
    const user = await userModel.findOne({ _id: userId });
    if (user) {
      res.status(200).json({ success: true, user });
    }
  } catch (err) {
    console.log(err.message);
    res.status(200).json({ success: false, msg: "Failed to fetch user data" });
  }
};

const viewAllUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.log(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (user) {
      res.status(200).json({ success: true, msg: "User deleted successfully" });
    } else {
      res.status(404).json({ success: false, msg: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, size, userId } = req.body;
    if (!size || size === "") {
      return res
        .status(200)
        .json({ success: false, msg: "Select size to add item to cart" });
    }
    let user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(200).json({ success: false, msg: "User not found" });
    }
    let product = await productModel.findOne({ _id: productId });
    if (!product) {
      return res.status(200).json({ success: false, msg: "Product not found" });
    }

    const existingCartItem = user.cart.find(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      user.cart.push({ productId, size, quantity: 1 });
    }
    await user.save();

    res.status(200).json({ success: true, msg: "Product added to cart" });
  } catch (err) {
    console.log(err);
  }
};

const cartView = async (req, res) => {
  try {
    const userId = req.body?.userId;
    let user = await userModel.findOne({ _id: userId }).populate({
      path: "cart.productId",
      model: "product",
      select: "name price size image",
    });
    if (!user) {
      res.status(200).json({ success: false, msg: "User not found" });
    } else {
      res.status(200).json({ success: true, cart: user });
    }
  } catch (err) {
    console.log(err);
  }
};

const cartDelete = async (req, res) => {
  try {
    const { productId, size, userId } = req.body;
    console.log(req.body);

    // const user = await userModel.findOneAndUpdate(
    //   { _id: userId },
    //   { $pull: { cart: { productId } } },
    //   { new: true }
    // );
    // if (!user) {
    //   return res.status(404).json({ success: false, msg: "User not found" });
    // }
    // res
    //   .status(200)
    //   .json({ success: true, msg: "Item removed from cart", cart: user });

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    const updatedCart = user.cart.filter(
      (item) => !(item.productId.toString() === productId && item.size === size)
    );

    if (updatedCart.length === user.cart.length) {
      return res
        .status(404)
        .json({ success: false, msg: "Item not found in cart" });
    }

    user.cart = updatedCart;
    await user.save();

    return res.status(200).json({
      success: true,
      msg: "Item removed successfully",
      cart: updatedCart,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { productId, size, quantity, userId } = req.body;
    const user = await userModel.findOneAndUpdate(
      { _id: userId, "cart.productId": productId, "cart.size": size },
      { $set: { "cart.$.quantity": quantity } },
      { new: true }
    );

    if (!user) {
      return res.status(200).json({ success: false, msg: "User not found" });
    }

    res.status(200).json({
      success: true,
      msg: "Quantity updated successfully",
      cart: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  addToCart,
  cartView,
  cartDelete,
  userView,
  viewAllUser,
  deleteUser,
  updateQuantity,
};
