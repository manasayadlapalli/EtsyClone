const { authJwt, verifyShop, verifyInputForm, verifyItem } = require("../middleware");
const controller = require("../controllers/item.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/shop/item", 
    controller.itemhome
  );

  app.post(
    "/api/shop/owner/item",
    [
      authJwt.verifyToken,
      verifyShop.checkShopExists,
      verifyInputForm.checkCategoryIsAlpha,
      verifyItem.checkDuplicateItem
    ], 
    controller.itemcreate
  );

  app.put(
    "/api/shop/owner/item",
    [authJwt.verifyToken],
    controller.itemupdate
  );

  app.delete(
    "/api/shop/owner/item",
    [authJwt.verifyToken],
    controller.itemdelete
  );
};