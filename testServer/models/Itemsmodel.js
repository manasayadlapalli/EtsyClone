const mongoose  = require("mongoose")

const Itemsmodel = new mongoose.Schema({
   
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  "Users"      
    },
    itemName: {
      type: String,
      default:null
    },
    itemCategory: {
      type: String,
      default:null,
    },
    itemPrice: {
      type: String,
      default:null,
    },
    itemDescription: {
      type: String,
      default:null,
    },
    itemCount: {
      type: String,
      default:null,
    },
    itemImage: {
      type: String,
      default:null
    },
    sales: {
      type: String,
      default:null
      
    },
  }, { timestamps: true });

  module.exports = Items = mongoose.model('Items',Itemsmodel)      