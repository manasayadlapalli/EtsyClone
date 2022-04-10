const mongoose = require('mongoose');

    const Cartmodel = new mongoose.Schema({
      cartId: {
        type: String,
        required:true,
        unique: true
      },  
      userId: {
        type: String,
        ref: "Users"        
      },
      itemId: {
        type: String,
        allowNull: false,
      },
      orderId: {
        type: Integer,
        allowNull: false,
      },
      qty: {
        type: Integer,
        allowNull: false,
      },
    })

  module.exports = Cart = mongoose.model('Cart',Cartmodel)    