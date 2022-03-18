const db = require("../models");
const User = db.user;
const Shop = db.shop;


checkShopOwnerExists = (req, res, next) => {
  // check if user exists
  User.findOne({
    where: {
      id: req.body.userid
    }
  }).then(user => {
    if (!user) {
      res.status(400).send({
        message: "Failed! Need user registered first to create a Shop!"
      });
      return;
    }
    next();
  });
};

checkDuplicateShop = (req, res, next) => {
  // only one shop per user
  Shop.findOne({
    where: {
      ownerId: req.body.userid
    }
  }).then(shop => {
    if (shop) {
      res.status(400).send({
        message: "Failed! userid already has a shop!"
      });
      return;
    }
    next();
  });
};
  
const verifyShop = {
    checkShopOwnerExists: checkShopOwnerExists,
    checkDuplicateShop: checkDuplicateShop
};

module.exports = verifyShop;