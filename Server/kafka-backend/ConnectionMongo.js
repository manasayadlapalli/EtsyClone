require('dotenv').config({path:__dirname+'/../.env'});
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log('MongoDB connected for Kafka...'))
  .catch(err =>console.log(err))