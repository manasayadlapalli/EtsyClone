const db = require("../models");
const config = require("../config/auth.config");
const user = db.user;
const userprofile = db.userprofile;

exports.userhome = (req, res) => {
  res.status(200).send("User Homepage.");
};

exports.userdelete = (req, res) => {
  res.status(200).send("User Deleted.");
};

exports.userprofile = (req, res) => {
  res.status(200).send("User Profile page.");
};

exports.userprofilecreate = (req, res) => {
  res.status(200).send("User Profile create page.");
};

exports.userprofileupdate = (req, res) => {
  res.status(200).send("User Profile update page.");
};

exports.userfavourites = (req, res) => {
  res.status(200).send("User Favourites page.");
};

exports.userpurchases = (req, res) => {
  res.status(200).send("User Purchases page.");
};
