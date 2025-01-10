const validator = require("validator");
const contactModel = require("../models/contactModel");

const contactMessages = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!validator.isEmail(email)) {
      return res
        .status(200)
        .json({ success: false, msg: "Please enter a valid email" });
    }
    await contactModel.create({
      name,
      email,
      message,
    });
    res.status(200).json({ success: true, msg: "Message Submitted" });
  } catch (err) {
    console.log(err.message);
    res.status(200).json({ success: false, msg: "Failed to send message" });
  }
};

const getMessages = async (req, res) => {
  try {
    let contactMessages = await contactModel.find();
    res.json({ success: true, contactMessages });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { contactMessages, getMessages };
