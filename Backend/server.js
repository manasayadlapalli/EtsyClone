const express = require('express');
const cors = require('cors');
const app = express();
const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");

//db.sequelize.sync();

// force: true will drop the table if it already exists
db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(() => {
  console.log('Set foriegn key checks to False')
  db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Database with { force: true }');
    db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1').then(() => {
      console.log('Set foriegn key checks to True');
    });
  });
});

// simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to EtsyClone Backend!" });
// });
  
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/shop.routes')(app);
require('./app/routes/item.routes')(app);
require('./app/routes/category.routes')(app);
require('./app/routes/search.routes')(app);
require('./app/routes/homepage.routes')(app);
require('./app/routes/cart.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}.`);
});