const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Userprofile = db.userprofile;
const Favourite = db.favourite;
const Item = db.item;

exports.userhome = (req, res) => {
  res.status(200).send("User Homepage.");
};

exports.userdelete = (req, res) => {
  res.status(200).send("User Deleted.");
};

exports.userprofile = (req, res) => {
  Userprofile.findOne({
    where: {
      userId: req.body.userid
    }
  })
    .then(userprofile => {
      if (!userprofile) {
        return res.status(404).send({ message: "Userprofile Not found for this user." });
      }

      res.status(200).send({
        userprofileid: userprofile.id,
        name: userprofile.name,
        address: userprofile.address,
        city: userprofile.city,
        zipcode: userprofile.zipcode,
        country: userprofile.country,
        image: userprofile.image,
        description: userprofile.description,
        gender: userprofile.gender,
        dateofbirth: userprofile.dateofbirth,
        phonenumber: userprofile.phonenumber
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
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

exports.userfavouritesadd = (req, res) => {
  // Save items as Favourites
  Favourite.create({
    userId: req.body.userid,
    itemId: req.body.itemid
  })
  .then(favourite => {
    res.send({ message: "User added item as favourite!" });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.userfavouritesdelete = (req, res) => {
  res.status(200).send("User Favourites page.");
};

exports.userpurchases = (req, res) => {
  res.status(200).send("User Purchases page.");
};
