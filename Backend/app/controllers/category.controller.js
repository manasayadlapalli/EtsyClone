const db = require("../models");
const config = require("../config/auth.config");
const item = db.category;

exports.category = (req, res) => {
  res.status(200).send("Category page.");
};

exports.categorycreate = (req, res) => {
  res.status(200).send("Category create page.");
};