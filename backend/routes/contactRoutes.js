const express = require("express");
const contactRouter = express.Router();
const { contactMessages, getMessages } = require("../controllers/contactController");

contactRouter.route("/message").post(contactMessages);
contactRouter.route("/getmessage").post(getMessages);

module.exports = contactRouter;
