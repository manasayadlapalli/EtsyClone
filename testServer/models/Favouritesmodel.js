const mongoose = require("mongoose")

const Favouritesmodel = new mongoose.Schema({
    favId: {
      type: Integer,
      required:true,
      unique: true
    },
    itemId: {
      type: Integer,
      ref: "Items"    
    },
    userId: {
      type: Integer,
      ref: {
        model: "Users",
        key: "id",
      },
    },
  });

  module.exports = Favourites = mongoose.model('Favourites',Favouritesmodel)   