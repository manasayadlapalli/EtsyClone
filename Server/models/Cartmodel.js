const mongoose = require('mongoose');

const Cartmodel = new mongoose.Schema({
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users'
  },

  itemId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Items'
   }, 

  orderId: {
    type: String
  },

  qty: {
    type: String,
  },

  gift:{
    type: String
  }, 

  purchase: {
    type:Number
  },
}, { timestamps: true });


module.exports =  mongoose.model('Cart',Cartmodel)    