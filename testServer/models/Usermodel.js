const mongoose = require('mongoose');

    const UserSchema = new mongoose.Schema({
      // id: {
      //   type: String,
      //   required:true,
      //   unique:true
      // },
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
        
      },
      gender: {
        type: String,
        default:null
      },
      profilePic: {
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
        // required:true,
     },
      shopImage: {
        type: String,
        default:null
      },
    })

module.exports = mongoose.model('Users', UserSchema);
    
  