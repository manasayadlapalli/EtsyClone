require('dotenv').config({path:__dirname+'/../.env'});
const mongoose = require('mongoose');

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   poolSize: 15
// }).then(res=>{
//     console.log("connected!!!!!!!!!!!!!!!!!");
// });


mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log('MongoDB connected for Kafka...'))
  .catch(err =>console.log(err))