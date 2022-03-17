const { authJwt } = require("../middleware");
const controller = require("../controllers/cart.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/user/cart/item",
    [authJwt.verifyToken], 
    controller.cartadditem
  );

  app.get(
    "/api/user/cart",
    [authJwt.verifyToken], 
    controller.cartallitems
  );

  app.post(
    "/api/user/cart",
    [authJwt.verifyToken], 
    controller.cartorder
  );
};