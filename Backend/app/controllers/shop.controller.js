const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Shop = db.shop;

exports.shoppublic = (req, res) => {
  Shop.findOne({
    where: {
      id: req.body.shopid
    }
  })
    .then(shop => {
      if (!shop) {
        return res.status(404).send({ message: "Shop Not found!" });
      }
      res.status(200).send({
        shopid: shop.id,
        name: shop.name,
        image: shop.image,
        description: shop.description,
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.shopowner = (req, res) => {
  Shop.findOne({
    where: {
      ownerId: req.body.userid
    }
  })
    .then(shop => {
      if (!shop) {
        return res.status(404).send({ message: "Shop Not found for this user." });
      }
      res.status(200).send({
        shopid: shop.id,
        name: shop.name,
        image: shop.image,
        description: shop.description,
        salescount : shop.salescount
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.shopcreate = (req, res) => {
 // Save Shop to Database
  Shop.create({
    ownerId: req.body.userid,
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
  })
    .then(shop => {
      res.send({ message: "User's Shop created successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.shopupdate = (req, res) => {
  res.status(200).send("Shop modify in a popup page.");
};

exports.shopdelete = (req, res) => {
  res.status(200).send("Shop delete in a popup page.");
};