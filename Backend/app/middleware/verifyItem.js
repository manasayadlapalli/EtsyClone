const db = require("../models");
const Item = db.item;

checkDuplicateItem = (req, res, next) => {
  // Username
  Item.findOne({
    where: {
      name: req.body.name
    }
  }).then(item => {
    if (item) {
      res.status(400).send({
        message: "Failed! already has an item defined by the name!"
      });
      return;
    }
    next();
  });
};

const verifyItem = {
    checkDuplicateItem: checkDuplicateItem,
};

module.exports = verifyItem;