const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true, minimize: false }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
