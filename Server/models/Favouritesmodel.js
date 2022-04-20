const mongoose = require("mongoose")

const Favouritesmodel = new mongoose.Schema({
    
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Items",
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Users",
      required: true
    }
  });

  module.exports = mongoose.model('Favourites',Favouritesmodel)   