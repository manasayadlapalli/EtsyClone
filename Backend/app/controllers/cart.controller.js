const db = require("../models");
const config = require("../config/auth.config");
const item = db.item;
const user = db.user;
const itemorder = db.itemorder;
const cartorder = db.cartorder;

exports.cartcreate = (req, res) => {
  res.status(200).send("Cart create page.");
};