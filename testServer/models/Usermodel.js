const mongoose = require('mongoose');

    const UserSchema = new mongoose.Schema({
     
      username: {
        type: String,
        required:true
      },
      email: {
        type: String,
        required:true
      },
      password: {
        type: String,
        required:true
      },
      fullAddress: {
        type: String,
        // required:true,
        default:null
      },
      city: {
        type: String,
        default:null
        // required:true,
      },
      phoneNumber: {
        type: String,
        default:null
        // required:true,
      },
      dob: {
        type: String,
        default:null
        
      },
      gender: {
        type: String,
        default:null
      },
      userImage: {
        type: String,
        default:null
      },
      about: {
        type: String,
        default:null
        // required:true,
      },
  
      shopName: {
        type: String,
        default:null
        
     },
      shopImage: {
        type: String,
        default:null
      },
    })

module.exports = mongoose.model('Users', UserSchema);
    
  