const db = require("../models");
const config = require("../config/auth.config");
const item = db.item;
const user = db.user;

exports.search = (req, res) => {
  res.status(200).send("Search page.");
};

exports.searchinshop = (req, res) => {
  res.status(200).send("Search shop page.");
};

exports.searchuserfavourites = (req, res) => {
  res.status(200).send("Search user favourites update page.");
};