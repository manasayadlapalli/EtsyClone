const { authJwt } = require("../middleware");
const controller = require("../controllers/search.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/search", 
    controller.search
  );

  app.get(
    "/api/search/shop",
    controller.searchinshop
  );

  app.get(
    "/api/user/favourites/search",
    [authJwt.verifyToken],
    controller.searchuserfavourites
  );
};