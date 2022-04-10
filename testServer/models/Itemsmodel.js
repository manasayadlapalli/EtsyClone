const mongoose  = require("mongoose")

const Itemsmodel = new mongoose.Schema({
    itemId: {
      type: Integer,
      required:true,
      unique: true      
    },
    userId: {
      type: Integer,
      ref:  "Users"      
    },
    itemName: {
      type: Data,
    },
    itemCategory: {
      type: String,
      required:true,
    },
    itemPrice: {
      type: Integer,
      required:true,
    },
    itemDescription: {
      type: String,
      required:true,
    },
    itemCount: {
      type: Integer,
      required:true,
    },
    itemImage: {
      type: String,
    },
    sales: {
      type: String,
      
    },
  })

  module.exports = Items = mongoose.model('Items',Itemsmodel)      