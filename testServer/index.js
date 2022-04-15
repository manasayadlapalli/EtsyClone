const express = require("express");
const bodyParser = require("body-parser");
// const jwt = require('jsonwebtoken');
// require('./passport');
// const passport = require("passport");
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
const Favouritesmodel = require("./models/Favouritesmodel");
const Cartmodel = require("./models/Cartmodel");
const app = express();

// AWS S3 stuff
require('dotenv').config();
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const bucketName = process.env.AWS_BUCKET_NAME 
const region =  process.env.AWS_BUCKET_REGION 
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY 

aws.config.update({
  secretAccessKey: secretAccessKey,
  accessKeyId: accessKeyId,
  region: region
})

const s3 = new aws.S3();

// function to upload file to s3
const uploadS3 = multer({
  storage: multerS3({
    s3,
    ACL: 'public-read',
    bucket: bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, file.originalname)
    }
    //limits: { fileSize: "1000000" },
    //fileFilter: (req, file, cb) => {
    //  const fileTypes = /jpeg|jpg|png|gif/;
    //  const mimType = fileTypes.test(file.mimetype);
    //  const extname = fileTypes.test(path.extname(file.originalname));

    //  if (mimType && extname) {
    //    return cb(null, true);
    //  }
    //  cb("Give proper file name");
    //}
  })
}).single("itemImage");



app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
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

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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

mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log('Database connected...'))
  .catch(err =>console.log(err))

// storage

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
      res.send(user);   
  }
  catch(err){
      console.log(err);
      return res.status(500).send('Server Error')
  }
})

app.get("/user", (req, res) => {
  console.log("hello" + req.session);
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
        res.send({ message: "No duplicates", });
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
    //let upload = multer({ storage: storage }).single("itemImage");
    //
    //upload(req, res, function (err) {
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
      const itemImage = req.file.filename;
      const itemCategory = req.body.itemCategory;
      
      console.log ("Trying to add a item into MongoDB");
      
      Items.create( {userId,itemImage,itemName,itemDescription,itemPrice,itemCount,itemCategory },(err, result) => {
        console.log(result);
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
  
  console.log("Get items by item ID");
  const userId = req.params.userId;
  Items.find(userId, (err, result) => {  
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
        console.log(result);
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
      console.log(result);
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
    let upload = multer({ storage: storage }).single("itemImage");
    upload(req, res, function (err) {
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
          console.log(result);
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
  console.log("Updating shop image");
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
        console.log(result);
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

app.get("/getSearchItems/:searchValue", (req, res) => {
  const searchValue = req.params.searchValue;
  console.log('Searching for ' + searchValue);
  Items.find({'itemName':{ "$regex": searchValue, "$options": "i" }},(err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ success: true, result });
      }
    }
  );
});

app.put("/updateUser/:id", async (req, res) => {

    let upload = multer({ storage: userStorage }).single("userImage");
    upload(req, res, function (err) {
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
      const userImage = req.file.filename;
      const about = req.body.about;
      const phoneNumber = req.body.phoneNumber;
                
      Users.findOneAndUpdate({"_id":req.params.id}, 
      {$set: { userName, city, dob, gender, about, phoneNumber, userImage}},
         (err, result) => {
          console.log("Result is "+ result);
         if (err) {
            res.send({ message: "error" });
          } else {
            res.send({ message: "success", result });
            
          }        
        })    
    });  
});


app.get("/getItems", (req, res) => {
   Items.find({}, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send({ success: true, result });
    }
  });
});

app.get("/getItemsBasedOnUser/", (req, res) => {
  const userId = req.query.id;
  console.log("Getting all products in home for the user");
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
  const userId = req.body.itemId;
  const itemId = req.body.userId;
  
  Favourites.create({userId,itemId},(err, result) => {
    
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send({ success: true, result });
    }
  })  
});


app.get("/getFavourites/:id", (req, res) => {
  const userId = req.body.userId;
  console.log("Displaying user favourites");
 
  Favourites.find(userId ,(err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({ success: true, result });
      }
    }
  );
});

app.delete("/deleteFavourite/:itemId/:userId", (req, res) => {
  const itemId = req.body.itemId;
  const userId = req.body.userId;
  console.log("Deleting Fav Item");
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
  const items = req.body.items;
  const orderId = req.body.orderId;
  const price = req.body.price;

  Cart.create({items, orderId, price, userId},
    (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({ success: true, result });
      }
    }
  );
});


app.get("/getFinalCartProducts/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log("Getting cart products in cart");
  Items.find({"itemId" : { $in : userId}},
  
    (err, result) => {
      console.log(result);
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
      console.log(result);
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
  console.log("Getting all cart products in home");
  Cart.find(userId, itemId, (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({ success: true, result });
      }
    }
  );
});


app.get("/getPurchases/:UserId", (req, res) => {
  const userId = req.params.UserId;
  console.log("Get purchased items");
  Cart.find(userId, (err, result) => {
      console.log(result);
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
      console.log(result.itemName);
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
