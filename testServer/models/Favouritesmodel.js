const mongoose = require("mongoose")

const Favouritesmodel = new mongoose.Schema({
    
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  });

  module.exports = mongoose.model('Favourites',Favouritesmodel)   