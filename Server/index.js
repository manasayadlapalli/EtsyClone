const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const Users = require('./models/Usermodel');
const Items = require('./models/Itemsmodel');
const Favourites  = require('./models/Favouritesmodel');
const Cart = require('./models/Cartmodel');
const mongoose = require("mongoose");
const cookieParser = express("cookie-parser");
const multer = require("multer");
const path = require("path");
const app = express();

require('dotenv').config();

var kafka = require('./kafka-backend/kafka/client');

// AWS S3 stuff
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
//const { Kafka } = require("aws-sdk");
const bucketName = process.env.AWS_BUCKET_NAME 
const region =  process.env.AWS_BUCKET_REGION 
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY 

aws.config.update({
  secretAccessKey: secretAccessKey,
  accessKeyId: accessKeyId,
  region: region
})

//new s3 instance
const s3 = new aws.S3();
const uploadS3 = multer({
  storage: multerS3({
    s3,
    //ACL: 'public-read',
    bucket: bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, file.originalname)
    }    
  })
}).single("itemImage");

const uploadS3_userImage = multer({
  storage: multerS3({
    s3,
    //ACL: 'public-read',
    bucket: bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, file.originalname)
    }    
  })
}).single("userImage");



app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(
  cors({
    origin: ["http://ec2-13-56-211-75.us-west-1.compute.amazonaws.com:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
require("dotenv").config({path:"./config.env"});

app.use(
  session({
    key: "email",
    secret: "cmpe273-etsy-lab2",
    resave: false, 
    saveUninitialized: false, 
    activeDuration: 5 * 60 * 1000,
    cookie: {
      expiresIn: 60 * 60 * 24,
    },
  })
);


//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://ec2-13-56-211-75.us-west-1.compute.amazonaws.com:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//
mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log('Database connected...'))
  .catch(err =>console.log(err))



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});


const shopStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/Users/Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimType && extname) {
      return cb(null, true);
    }
    cb("Give proper file name");
  },
}).single("itemImage");


app.use("/Images", express.static("./Images"));



app.post('/register',async (req,res)=>{  
  try{
      const {username,email,password} = req.body; 
      const userExists = await Users.findOne({email});
      if(userExists){ return res.status(400).send('User already exists')}
      let newUser = new Users({ username,email,password })
          newUser.save();
      return res.send({success:true, newUser});      
  }catch(err){
      console.log(err);      
  }
})


app.get("/signin", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post('/signin', async (req, res) => {
  try{
      const {email,password} = req.body;
      let user = await Users.findOne(
        {
          $and: [
                 { 'email' : email },
                 { 'password': password }
               ]
        }
      );      
      if(!user) {
          return res.status(400).send('User Not Found');
      }
      res.cookie("user", user.username, {
        maxAge: 900000,
        httpOnly: false,
        path: "/",
      });
      req.session.user = user;
      res.status(200).send(user);   
  }
  catch(err){
      console.log(err);
      return res.status(500).send('Server Error')
  }
})

app.get("/user", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});


app.post("/findShopDuplicates", async (req, res) => {
       const shopName = req.body.shopName;
      const shopNameExists = await Users.findOne({filter:shopName});
      if(!shopNameExists){
        res.send({message:"duplicate"});
        console.log("Shop name already exists");
      }
      else{
        res.status(200).send({ message: "No duplicates", });
        console.log("Shop name is available");
       }         
    }
);

app.post("/createShop/:id", async(req, res) => {
  try {
    console.log("Creating Shop for " + req.params.id + " Shop Id is " + req.body.shopName);
    await Users.updateOne(
      {
        '_id': req.params.id
      }, 
      { 
        $set: {
          'shopName': req.body.shopName
        }  
      }
    );

    res.send("Shops Value Inserted in user successfully");
  }
  catch(err) {
    console.log(err);
  }
});


app.post("/addProduct/:id", (req, res) => {

  uploadS3(req, res, function (err) {
    //if (!req.file) {
    //  return res.send("Please select an image to upload");
    if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
   
      const userId = req.params.id;
      const itemName = req.body.itemName;
      const itemDescription = req.body.itemDescription;
      const itemPrice = req.body.itemPrice;
      const itemCount = req.body.itemCount;
      const itemImage = req.file.location;
      const itemCategory = req.body.itemCategory;

      Items.create( {userId,itemImage,itemName,itemDescription,itemPrice,itemCount,itemCategory },(err, result) => {
        console.log(req.file);
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send({ success: true, result });
        }
      })
    })
  });
    

app.post("/getAllProducts/:id", (req, res) => {
  const _id = req.params.id;
   
  Items.find({"_id" : _id}).limit(100)
      .exec((err, result) => {
      if (err) {
        res.send(err + "err");
        console.log(err);
      } else {
        console.log(result + "result");
        res.status(200).json({ success: true, result, postSize: result.length });
      }
    }
  );
});

app.get("/getItemById/:userId", (req, res) => {
  
  const userId = req.params.userId;
  Items.findById(userId, (err, result) => {  
    if (err) {
      res.send(err);
    } else {
        res.send({ success: true, result });        
      }   
   })
});

app.get("/getItemsByCategory", (req, res) => {
  
  Items.find( { 'itemCategory': req.body.itemCategory },
        (err, result) => {
        if (err) {
        res.send(err);
      } else {
        res.send({ success: true, result });
      }
    }
  );
});

app.put("/updateItemById/:itemId", (req, res) => {
  
  const itemName = req.body.itemName;
  const itemDescription = req.body.itemDescription;
  const itemPrice = req.body.itemPrice;
  const itemCount = req.body.itemCount;
  const itemCategory = req.body.itemCategory;
  
  Items.updateMany({itemName, itemPrice, itemDescription, itemCount, itemCategory},
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({ success: true, result });
      }
    }
  );
});

app.put("/updateItemImageById/:id", (req, res) => {
  try {
    // let upload = multer({ storage: storage }).single("itemImage");
    uploadS3(req, res, function (err) {
      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }
      const _id = req.params.id;
      const itemImage = req.file.filename;      
      Items.findOneAndUpdate(_id,itemImage,{overwrite: true},
          (err, result) => {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            res.send({ success: true, result });
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getShopById/:id", (req, res) => {
  const _id = req.params.id; 
  Users.findById(_id, (err, result) => {  
    if (err) {
      res.send(err);
    } else {
        res.send({ success: true, result });        
      }   
   })
});

app.get("/getUserInfo/", (req, res) => {
  Users.find({
    'id': req.query.id
  },   (err, result) => {  
    if (err) {
      res.send(err);
    } else {
        res.send({ success: true, result });        
      }   
   })
});

  
app.put("/updateShopImageById/:id", (req, res) => {
  try {
    let upload = multer({ storage: shopStorage }).single("shopImage");
    upload(req, res, function (err) {
      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }
        const _id = req.params.id;

      Users.findByIdAndUpdate(_id, 
        {$set:{"shopImage":req.file.filename}},
        (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send({ success: true, result });
        }
      }
    );
    });
  } catch (err) {
    console.log(err);
  }
});





// app.get("/getSearchItems/:searchValue", (req, res) => {
//   const searchValue = req.params.searchValue;
//   Items.find({'itemName':{ "$regex": searchValue, "$options": "i" }},(err, result) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send({ success: true, result });
//       }
//     }
//   );
// });


app.get("/getSearchItems/:searchValue", async (req, res) => {
  const searchValue = req.params.searchValue;

  kafka.make_request('getSearchItems', req.params.searchValue, function(err, results) {
  Items.find({'itemName':{ "$regex": searchValue, "$options": "i" }},(err, result) => {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {
      res.send({ success: true, result });
      console.log("----> GETSEARCHITEMS backend: " + results);
      res.end();
    }
    }
  );
});
})


app.put("/updateUser/:id", async (req, res) => {

    uploadS3_userImage(req, res, function (err) {
      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      const userName = req.body.userName;
      const gender = req.body.gender;
      const city = req.body.city;
      const dob = req.body.dob;
      const userImage = req.file.location;
      const about = req.body.about;
      const phoneNumber = req.body.phoneNumber;
        
      Users.findOneAndUpdate({"_id":req.params.id}, 
      {$set: { userName, city, dob, gender, about, phoneNumber, userImage}},
         (err, result) => {
         if (err) {
            res.send({ message: "error" });
          } else {
            res.send({ message: "success", result });
            
          }        
        })    
    });  
});


// app.get("/getItems", (req, res) => {
//    Items.find({}, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.send(err);
//     } else {
//       res.send({ success: true, result });
//     }
//   });
// });

app.get("/getItems", (req, res) => {
  console.log("---> API kafka call: getItems <---");
    kafka.make_request('getItems', req.body, function(err, results) {
      if (err) {
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        })
      } else {
        res.json(results);
        console.log("----> getItems backend: " + results);
        res.end();
      }
    });
});


app.get("/getItemsBasedOnUser/", (req, res) => {
  const userId = req.query.id;
  Items.find(userId,(err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send({ success: true, result });
    }
  });
});

app.post("/addFavourite", (req, res) => {  
  const userId = req.body.userId;
  const itemId = req.body.itemId;
  
  Favourites.create({userId,itemId},(err, result) => {    
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send({ success: true, result });
    }
  })  
});


// app.get("/getFavourites/:id", (req, res) => {
  
//   Favourites.find().select({"userId":req.body.userId}).populate("itemId").exec((err, result) => {
//       if (err) {
//         console.log(err);
//         res.send(err);
//       } else {
//         res.send({ success: true, result });
//       }
//     }
//   );
// });

app.get("/getFavourites/:id", (req, res) => {
  console.log("---> API kafka call: getFavourites userId: <---", req.params.id);
    kafka.make_request('getFavourites', req.params.id, function(err, results) {
      if (err) {
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        })
      } else {
        res.json(results);
        console.log("----> getfavourites backend: " + results);
        res.end();
      }
    });
});


app.delete("/deleteFavourite/:itemId/:userId", (req, res) => {
  const itemId = req.body.itemId;
  const userId = req.body.userId;
  Favourites.findOneAndRemove(itemId, userId, (err, result) => {
        if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({ success: true, result });
      }
    }
  );
});


app.post("/addCartProduct/:userId", (req, res) => {      
  const userId = req.params.userId;
  const itemId = req.body.itemId;
  const orderId = req.body.orderId;
  const qty = req.body.qty;
  const orderAmount =req.body.orderAmount;
  const giftMessage= req.body.giftMessage;
  const purchase = 0;

  console.log("REQ>BODY to Backend", req.body);

  Cart.create({userId, itemId, orderId, giftMessage, qty, orderAmount, purchase},
    (err, result) => {      
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({ success: true, result });
        console.log("Added cart ITEMS", result)
      }
    }
  );
});



app.get("/getFinalCartProducts/:userId", (req, res) => {
  const userId = req.params.userId;
  Items.find({"itemId" : { $in : userId}},
  
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({ success: true, result });
      }
    }
  );
});

app.put("/updateCartQuantity/:userId", (req, res) => {
  const userId = req.params.userId;
  // const userId = req.params.id;
  const itemId = req.body.itemId;
  const qty = req.body.qty;

  
  Cart.updateOne({"userId" : userId, "itemId" : itemId}, {$set: {"qty" : qty} },
    [qty, itemId, userId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({ success: true, result });
      }
    }
  );
});


app.get("/getQtyFromCart/:userid/:itemId", (req, res) => {
  const userId = req.params.userid;
  const itemId = req.params.itemId;
  Cart.find(userId, itemId, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({ success: true, result });
      }
    }
  );
});


app.get("/getItemByItemId/:itemId", (req, res) => {
  
  const item_id = req.params.userId;
  Items.find(item_id, (err, result) => {  
    if (err) {
      res.send(err);
    } else {
        res.send({ success: true, result });        
      }   
   })
});

app.get("/getFavourites/:id", (req, res) => {
  console.log("---> API kafka call: getFavourites userId: <---", req.params.id);
    kafka.make_request('getFavourites', req.params.id, function(err, results) {
      if (err) {
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        })
      } else {
        res.json(results);
        res.end();
      }
    });
});

app.get("/getPurchases/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log("---> API kafka call: getPurchases userId: <---", req.params.userId);
  kafka.make_request('getPurchases', req.params.userId, function(err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {
      res.json(results);
      console.log("----> getPurchases backend: " + results);
      res.end();
    }
  });

  console.log("USER ID:", userId)
});


app.get("/getAllItemsbyIDs/:id", (req, res) => {
  const _id = req.params.id;
  Items.find({_id : {"$all" : itemId}}, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ success: true, result });
      } 
    }
  );
});


app.put("/updateItemById/:id", (req, res) => {
  const _id = req.params.id; 
  // const userId = req.params.id;
  const itemName = req.body.itemName;
  const itemDescription = req.body.itemDescription;
  const itemPrice = req.body.itemPrice;
  const itemCount = req.body.itemCount;
  const itemCategory = req.body.itemCategory;

 Items.updateOne( _id,
    { $set:{itemName, itemDescription, itemPrice, itemCount, itemCount, itemCategory }},
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({ success: true, result });
      }
    }
  );
});

app.put("/editCount/:id", (req, res) => {
  const _id = req.params.id;  
  const quantity = req.body.quantity;
  const sales = req.body.sales;
 Items.findByIdAndUpdate(_id, { $set:{ quantity, sales }},
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ success: true });
      }
    }
  );
});

const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log("Server running on PORT:4000");
  });

module.exports = app;
