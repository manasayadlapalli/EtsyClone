const db = require("../models");
const config = require("../config/auth.config");
const Item = db.item;
const Shop = db.shop;
const Category = db.category;


exports.itemhome = (req, res) => {
  Item.findOne({
    where: {
      id: req.body.itemid
    }
  })
    .then(item => {
      if (!item) {
        return res.status(404).send({ message: "Item Not found!" });
      }
      res.status(200).send({
        name: item.name,
        description: item.description,
        image: item.image,
        availablecount: item.availablecount,
        price: item.price,
        shopId: item.shopId,
        categoryId: item.categoryId
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.itemcreate = (req, res) => {
  Category.findOne({
    where: {
      name: req.body.category
    }
  })
    .then(category => {
      if (!category) {
        Category.create({
          name: req.body.category
        })
          .then(newcategory => {
            // Save Item to Database with new category
            Item.create({
              name: req.body.name,
              description: req.body.description,
              image: req.body.image,
              availablecount: req.body.availablecount,
              price: req.body.price,
              shopId: req.body.shopid,
              categoryId: newcategory.id
            })
              .then(item => {
                res.send({ message: "Item created successfully!" });
              })
              .catch(err => {
                res.status(500).send({ message: err.message });
              });
          })
      } else {
        // Save Item to Database with existing category
        Item.create({
          name: req.body.name,
          description: req.body.description,
          image: req.body.image,
          availablecount: req.body.availablecount,
          price: req.body.price,
          shopId: req.body.shopid,
          categoryId: category.id
        })
          .then(item => {
            res.send({ message: "Item created successfully!" });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      }
    });
};

exports.itemupdate = (req, res) => {
  res.status(200).send("Item update page.");
};

exports.itemdelete = (req, res) => {
    res.status(200).send("Item Deleted.");
};  