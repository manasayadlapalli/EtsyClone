const mongoose = require('mongoose');

    const Cartmodel = new mongoose.Schema({
     
      userId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      itemId: {
        type: mongoose.Schema.Types.ObjectId
      },
      orderId: {
        type: String
      },
      qty: {
        type: String,
      },
   })

  module.exports =  mongoose.model('Cart',Cartmodel)    