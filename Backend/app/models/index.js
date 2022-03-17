// db config
const config = require("../config/db.config.js");

// sequelize construction
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

//initialization
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db tables
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.userprofile = require("../models/userprofile.model.js")(sequelize, Sequelize);
db.shop = require("../models/shop.model.js")(sequelize, Sequelize);
db.item = require("../models/item.model.js")(sequelize, Sequelize);
db.itemorder = require("../models/itemorder.model.js")(sequelize, Sequelize);
db.cartorder = require("../models/cartorder.model.js")(sequelize, Sequelize);
db.category = require("../models/category.model.js")(sequelize, Sequelize);
db.favourite = require("../models/favourite.model.js")(sequelize, Sequelize);

// table associations
db.userprofile.belongsTo(db.user, {
  foriegnKey: "userId", 
  as: "user"
});

db.shop.belongsTo(db.user, {
  foriegnKey: "ownerId",
  as: "owner"
});

db.favourite.belongsTo(db.user, {
  foriegnKey: "userId",
  as: "user"
});

db.cartorder.belongsTo(db.user, {
  foriegnKey: "userId",
  as: "user"
});

db.shop.hasMany(db.item, {
  as: "shopitems",
});

db.item.belongsTo(db.shop, {
  foriegnKey: "shopId",
  as: "shop"
});

db.item.belongsTo(db.category, {
  foriegnKey: "categoryId",
  as: "category"
});

db.itemorder.belongsToMany(db.item, {
  through: "itemorder_items",
  as: "items",
  foriegnKey: "itemorderId"
});

db.cartorder.belongsToMany(db.itemorder, {
  through: "cartorders_itemorders",
  as: "itemorders",
  foriegnKey: "cartorderId",
});

db.category.hasMany(db.item, {
  foriegnKey: "itemId",
  as: "items"
});

db.favourite.belongsToMany(db.item, {
  through: "favourites_items",
  as: "favouriteitems",
  foriegnKey: "favouriteId"
});

module.exports = db;