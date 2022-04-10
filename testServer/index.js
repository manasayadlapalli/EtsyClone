const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const Users = require('./models/Usermodel');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = express("cookie-parser");
const multer = require("multer");
const path = require("path");
const app = express();

//import routes
// const userRoutes = require("./routes/user");
// const { count } = require("console");

// const app = express();
// app.use(express.static(__dirname + "/public"));

// app.use(
//   cors({
//     origin: ["http://54.193.95.78:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

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

// app.use(
//   session({
//     key: "email",
//     secret: "cmpe273_kafka_passport_mongo",
//     resave: false, 
//     saveUninitialized: false, 
//     activeDuration: 5 * 60 * 1000,
//     cookie: {
//       expiresIn: 60 * 60 * 24,
//     },
//   })
// );

// app.use(function (req, res, next) {
//   // res.setHeader("Access-Control-Allow-Origin", "http://54.193.95.78:3000");
//   // res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Cache-Control", "no-cache");
//   next();
// });

// const db = mysql.createConnection({
//   host: constants.development.host,
//   user: constants.development.username,
//   password: constants.development.password,
//   port: constants.development.port,
//   database: constants.development.database,
// });


// DB connection
mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log('DB connected...'))
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

//shop storage
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

      console.log(username)
      console.log(email)

      const userExists = await Users.findOne({email});
      if(userExists){
         return res.status(400).send('User already exists')
      }
      let newUser = new Users({
          username,email,password
      })
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

app.post('/signin',async (req, res) => {
  try{
      const {email,password} = req.body;
      let userExist = await Users.findOne({email});
      if(!userExist) {
          return res.status(400).send('User Not Found');
      }
      if(userExist.password !== password) {
          return res.status(400).send('Invalid credentials');
      }
      let payload = {
          user:{
              id : userExist.id
          }
      }
      jwt.sign(payload,'jwtPassword',{expiresIn:3600000},
        (err,token) =>{
            if (err) throw err;
            return res.json({token})
        })
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

app.post("/findShopDuplicates", (req, res) => {
  const shopName = req.body.shopName;
  console.log("In findShopDuplicates " + shopName);
  db.query(
    "SELECT * FROM Users WHERE shopName=?",
    [shopName],
    (err, result) => {
      console.log(result.length);
      if (result.length !== 0) {
        res.send({
          message: "duplicate",
        });
        console.log("In shops db shop name found");
      } else {
        res.send({
          message: "No duplicates",
        });
        console.log("In shops db and no shop name found");
      }
    }
  );
});

app.post("/createShop/:id", (req, res) => {
  const shopName = req.body.shopName;
  const id = req.params.id;
  console.log("In create shop " + id);
  db.query(
    "UPDATE Users SET shopName=? WHERE id=?",
    [shopName, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        // res.send(result);
        res.send("Shops Value Inserted in user successfully");
      }
    }
  );
});

const addProduct = async (req, res) => {
  const userId = req.params.id;
  const itemImage = req.itemImage;
  const itemName = req.body.itemName;
  const itemDescriprion = req.body.description;
  const itemPrice = req.body.price;
  const itemCount = req.body.count;

  db.query(
    "INSERT INTO Items (userId, itemName, itemPrice, itemDescription, itemCount, itemImage) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, itemName, itemPrice, itemDescriprion, itemCount, itemImage],
    (err, result) => {
      if (err) {
        res.send("error" + err);
      } else {
        res.send("Product added successfully");
      }
    }
  );
};
app.post("/addProduct/:id", async (req, res) => {
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

      const userId = req.params.id;
      const itemName = req.body.itemName;
      const itemDescriprion = req.body.itemDescription;
      const itemPrice = req.body.itemPrice;
      const itemCount = req.body.itemCount;
      const itemImage = req.file.filename;
      const itemCategory = req.body.itemCategory;

      console.log(itemImage);
      console.log(itemName);
      db.query(
        "INSERT INTO Items (userId, itemName, itemCategory, itemPrice, itemDescription, itemCount, itemImage) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          userId,
          itemName,
          itemCategory,
          itemPrice,
          itemDescriprion,
          itemCount,
          itemImage,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            res.send({ message: "error" });
          } else {
            res.send({ message: "success" });
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/getAllProducts/:id", (req, res) => {
  const id = req.params.id;
  const limit = req.body.limit ? parseInt(req.body.limit) : 100;
  const skip = parseInt(req.body.skip);
  const term = req.body.searchTerm;
  // console.log(req.body.skip + "skip");
  // console.log(req.body.limit + "limit");
  console.log("In get all prods");
  console.log(term);

  if (term) {
    console.log("In term");
    db.query(
      // SELECT * FROM test_schema.Items WHERE itemName LIKE "%Rice%" AND userId=1;
      `SELECT * FROM Items WHERE itemName LIKE "%${term}%" AND userId=? LIMIT  ?, ?`,
      [id, skip, limit],
      (err, result) => {
        if (err) {
          // console.log(result + "result in db");

          res.send(err + "err");
          console.log(err);
        } else {
          console.log("Out term");

          console.log(result + "result");
          res
            .status(200)
            .json({ success: true, result, postSize: result.length });
        }
      }
    );
  } else {
    db.query(
      "SELECT * FROM Items WHERE userId=? LIMIT  ?, ?",
      [id, skip, limit],
      (err, result) => {
        console.log(result.length + "result in db");
        if (err) {
          console.log("err");
          res.send(err + "err");
        } else {
          console.log(result + "result");
          res
            .status(200)
            .json({ success: true, result, postSize: result.length });
        }
      }
    );
  }
});

app.get("/getItemById/:itemId", (req, res) => {
  const id = req.params.itemId;
  console.log("Get items by item ID");
  db.query("SELECT * FROM Items WHERE itemId=?", id, (err, result) => {
    console.log(result);
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getItemsByCategory", (req, res) => {
  console.log("get items by category");
  const category = "clothing";
  db.query(
    "SELECT * FROM Items WHERE itemCategory=? ORDER BY itemId DESC LIMIT 3",
    [category],
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
  const id = req.params.itemId;
  // const userId = req.params.id;
  const itemName = req.body.itemName;
  const itemDescriprion = req.body.itemDescription;
  const itemPrice = req.body.itemPrice;
  const itemCount = req.body.itemCount;
  const itemCategory = req.body.itemCategory;

  console.log("In update item post");
  console.log(itemDescriprion);
  console.log(itemName);
  console.log(id);

  db.query(
    "UPDATE Items SET itemName=?, itemPrice=?, itemDescription=?, itemCount=?, itemCategory=? WHERE itemId=?",
    [itemName, itemPrice, itemDescriprion, itemCount, itemCategory, id],
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

app.put("/updateItemImageById/:itemId", (req, res) => {
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

      const id = req.params.itemId;
      const itemImage = req.file.filename;
      console.log("In update item post");
      console.log(id);
      console.log(itemImage);
      db.query(
        "UPDATE Items SET itemImage=? WHERE itemId=?",
        [itemImage, id],
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

app.get("/getShopById/:userId", (req, res) => {
  console.log("In get shop by id");
  const userId = req.params.userId;
  console.log(userId);
  db.query("SELECT * FROM Users WHERE id=?", userId, (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      console.log(result);
      console.log("-----------------------------");
      res.send({ success: true, result: result });
    }
  });
});

app.get("/getUserInfo/:id", (req, res) => {
  console.log("In get shop by id");
  const userId = req.params.userId;
  console.log(userId);
  db.query("SELECT * FROM Users WHERE id=?", userId, (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      console.log(result);
      console.log("-----------------------------");
      res.send({ success: true, result: result });
    }
  });
});

app.put("/updateShopImageById/:id", (req, res) => {
  console.log("In edit shop details put method");
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

      const userId = req.params.id;
      const shopImage = req.file.filename;

      console.log("In update shop post ----------------------");
      console.log(shopImage);

      db.query(
        "UPDATE Users SET shopImage=? WHERE id=?",
        [shopImage, userId],
        (err, result) => {
          if (err) {
            console.log(err + "err");
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
  console.log("get Search Items -------------------------------");
  const searchValue = req.params.searchValue;
  console.log(searchValue);

  db.query(
    `SELECT * FROM Items WHERE itemName REGEXP '${searchValue}'`,
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

app.put("/updateUser/:id", async (req, res) => {
  try {
    let upload = multer({ storage: userStorage }).single("userImage");
    upload(req, res, function (err) {
      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      const userId = req.params.id;
      const userName = req.body.userName;
      const gender = req.body.gender;
      const city = req.body.city;
      const dob = req.body.dob;
      const userImage = req.file.filename;
      const about = req.body.about;
      const phoneNumber = req.body.phoneNumber;

      console.log(userImage);
      console.log(userName);
      console.log(
        "Updateing profile --------------------------------: " + phoneNumber
      );
      db.query(
        "UPDATE Users set name = ?, city  = ?, dob  = ?, gender  = ?, about  = ?, phoneNumber =?, profilePic=? where id = ? ",
        [userName, city, dob, gender, about, phoneNumber, userImage, userId],
        (err, result) => {
          console.log(result);
          if (err) {
            console.log(err);
            res.send({ message: "error" });
          } else {
            res.send({ message: "success", result });
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getItems", (req, res) => {
  console.log("Getting all products in home");
  db.query("SELECT * FROM Items", (err, result) => {
    console.log(result);
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send({ success: true, result });
    }
  });
});

app.get("/getItemsBasedOnUser/:id", (req, res) => {
  const userId = req.params.id;
  console.log("Getting all products in home");
  db.query("SELECT * FROM Items WHERE userId = ?", [userId], (err, result) => {
    console.log(result);
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
  console.log(userId);
  const itemId = req.body.itemId;
  db.query(
    "INSERT INTO Favourites (itemId, userId) VALUES (?, ?)",
    [itemId, userId],
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

app.get("/getFavourites/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  console.log("Getting all favoutrites in home");
  db.query(
    "SELECT * FROM Items WHERE itemId IN (SELECT itemId FROM Favourites WHERE userId=?)",
    [userId],
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

app.delete("/deleteFavourite/:itemId/:userId", (req, res) => {
  const itemId = req.params.itemId;
  const userId = req.params.userId;
  console.log("Deleting Fav Item");
  db.query(
    "delete FROM Favourites WHERE itemId =? and userId =? ",
    [itemId, userId],
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

app.post("/addCartProduct/:userId", (req, res) => {
  const userId = req.params.userId;
  const items = req.body.items;
  const orderId = req.body.orderId;
  const price = req.body.price;

  db.query(
    "INSERT INTO Carts (items, orderId, price, userId) VALUES (?, ?, ?, ?)",
    [items, orderId, price, userId],
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
  db.query(
    "SELECT * FROM Items WHERE itemId IN (SELECT itemId FROM Carts WHERE userId=?)",

    [userId],
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

  console.log("In update cart");
  console.log(itemId);
  console.log(qty);
  // console.log(id);

  db.query(
    "UPDATE Carts SET qty = ? WHERE itemId=? AND userId = ?",
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
  db.query(
    "select qty from Carts where userId=? AND itemId=?",
    [userId, itemId],
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
app.get("/getPurchases/:UserId", (req, res) => {
  const userid = req.params.UserId;
  console.log("Get purchased items");
  db.query(
    "SELECT * FROM Carts WHERE userId=? order by cartId desc limit 0, 1 ",
    [userid],
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
  const id = req.params.itemId;
  // const userId = req.params.id;
  const itemName = req.body.itemName;
  const itemDescriprion = req.body.itemDescription;
  const itemPrice = req.body.itemPrice;
  const itemCount = req.body.itemCount;
  const itemCategory = req.body.itemCategory;

  console.log("In update item post");
  console.log(itemDescriprion);
  console.log(itemName);
  console.log(id);

  db.query(
    "UPDATE Items SET itemName=?, itemPrice=?, itemDescription=?, itemCount=?, itemCategory=? WHERE itemId=?",
    [itemName, itemPrice, itemDescriprion, itemCount, itemCategory, id],
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

app.post("/editCount/:id", (req, res) => {
  const productid = req.params.id;
  const quantity = req.body.quantity;
  console.log(productid);
  console.log(quantity);
  db.query(
    "UPDATE Items SET itemCount=itemCount-?,sales=sales+? WHERE itemId=?",
    [quantity, quantity, productid],
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
    console.log("Serving running on port 4000");
  });

module.exports = app;
