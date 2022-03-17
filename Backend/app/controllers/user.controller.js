const db = require("../models");
const config = require("../config/auth.config");
const user = db.user;
const Userprofile = db.userprofile;

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
  // Save Userprofile to Database
  Userprofile.create({
    userId: req.body.userid,
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    zipcode: req.body.zipcode,
    country: req.body.country,
    image: req.body.image,
    description: req.body.description,
    gender: req.body.gender,
    dateofbirth: req.body.dateofbirth,
    phonenumber: req.body.phonenumber
  })
    .then(userprofile => {
      res.send({ message: "User profile created successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
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
