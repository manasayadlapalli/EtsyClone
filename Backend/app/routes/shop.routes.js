const { authJwt, verifyShop } = require("../middleware");
const controller = require("../controllers/shop.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/shop", 
    controller.shoppublic
  );

  app.get(
    "/api/shop/owner",
    [authJwt.verifyToken], 
    controller.shopowner
  );

  app.post(
    "/api/shop/owner",
    [
      authJwt.verifyToken,
      verifyShop.checkShopOwnerExists,
      verifyShop.checkDuplicateShop
    ],
    controller.shopcreate
  );

  app.put(
    "/api/shop/owner",
    [authJwt.verifyToken],
    controller.shopupdate
  );

  app.delete(
    "/api/shop/owner",
    [authJwt.verifyToken],
    controller.shopdelete
  );
};