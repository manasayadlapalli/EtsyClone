const db = require("../models");
const config = require("../config/auth.config");
const shop = db.shop;

exports.shoppublic = (req, res) => {
  res.status(200).send("Shop public page.");
};

exports.shopowner = (req, res) => {
  res.status(200).send("Shop owner page.");
};

exports.shopcreate = (req, res) => {
  res.status(200).send("Shop create in a popup page.");
};

exports.shopupdate = (req, res) => {
  res.status(200).send("Shop modify in a popup page.");
};

exports.shopdelete = (req, res) => {
  res.status(200).send("Shop delete in a popup page.");
};