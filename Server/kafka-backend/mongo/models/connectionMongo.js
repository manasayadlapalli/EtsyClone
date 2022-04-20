require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log('Database connected...'))
  .catch(err =>console.log(err))
