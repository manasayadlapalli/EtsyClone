const db = require("../models");
const config = require("../config/auth.config");
const item = db.item;

exports.itemhome = (req, res) => {
  res.status(200).send("Item Homepage.");
};

exports.itemcreate = (req, res) => {
  res.status(200).send("Item create page.");
};

exports.itemupdate = (req, res) => {
  res.status(200).send("Item update page.");
};

exports.itemdelete = (req, res) => {
    res.status(200).send("Item Deleted.");
};  