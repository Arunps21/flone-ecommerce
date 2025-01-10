const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");

const isAdmin = async (req, res, next) => {
  try {
    console.log(req.headers)
    const { token } = req.headers;
    if (!token) {
      return res
        .status(200)
        .json({ success : false, msg: "You need to login first" });
    }
    const decode = jwt.verify(token, process.env.JWT_KEY);
    
    let admin = await adminModel.findOne({ _id: decode.userId });
    if (!admin) {
      return res
        .status(200)
        .json({ success : false, msg: "You need to login first" });
    }
    next();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {isAdmin}