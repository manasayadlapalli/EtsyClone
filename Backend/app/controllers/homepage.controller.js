const db = require("../models");
const config = require("../config/auth.config");
const item = db.item;

exports.homepage = (req, res) => {
  res.status(200).send("Home page.");
};