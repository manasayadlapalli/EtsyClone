const mongoose = require('mongoose');

const Cartmodel = new mongoose.Schema({
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },

  itemIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'items' }], 


  orderId: {
    type: String
  },

  qty: {
    type: String,
  },
})


module.exports =  mongoose.model('Cart',Cartmodel)    