const jwt = require("jsonwebtoken");

const isUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.headers.token;
    
    if (!token) {
      return res.status(200).json({
        success: false,
        msg: "You need to login first",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.body.userId = decode.userId;
    next();
  } catch (err) {
    console.error(err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(200).json({
        success: false,
        msg: "Session expired. Please log in again.",
      });
    }

    return res.status(200).json({
      success: false,
      msg: "Invalid token. Please log in again.",
    });
  }
};

module.exports = { isUser };
