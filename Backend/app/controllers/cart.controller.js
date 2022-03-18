const db = require("../models");
const config = require("../config/auth.config");
const item = db.item;
const user = db.user;
const itemorder = db.itemorder;
const cartorder = db.cartorder;

exports.cartadditem = (req, res) => {
  // Create ItemOrders and set them to pending
  //itemorder.create({
  //  Item: req.body.username,
  //  quantity: req.body.quantity,
  //  inprogress: true
  //})
  //  .then(itemorder => {
  //    res.send({ message: "Item added to cart successfully!" });
  //  })
  //  .catch(err => {
  //    res.status(500).send({ message: err.message });
  //  });
};

exports.cartallitems = (req, res) => {
  // Send all current Itemorders
  res.status(200).send("Home page.");
};

exports.cartorder = (req, res) => {
  // Save all itemorders to cartorder
  //cartorder.create({
  //  username: req.body.username,
  //  email: req.body.email,
  //  password: bcrypt.hashSync(req.body.password, 8)
  //})
  //  .then(cartorder => {
  //    res.send({ message: "User registered successfully!" });
  //  })
  //  .catch(err => {
  //    res.status(500).send({ message: err.message });
  //  });
};