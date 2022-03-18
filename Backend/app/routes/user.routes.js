const { authJwt, verifyUserProfile } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/user",
    [authJwt.verifyToken],
    controller.userhome
  );

  app.delete(
    "/api/user",
    [authJwt.verifyToken],
    controller.userdelete
  );

  app.get(
    "/api/user/profile",
    [authJwt.verifyToken],
    controller.userprofile
  );

  app.post(
    "/api/user/profile",
    [
      authJwt.verifyToken,
      verifyUserProfile.checkDuplicateUserProfile
    ],
    controller.userprofilecreate
  );

  app.put(
    "/api/user/profile",
    [authJwt.verifyToken],
    controller.userprofileupdate
  );

  app.get(
    "/api/user/favourites",
    [authJwt.verifyToken],
    controller.userfavourites
  );

  app.post(
    "/api/user/favourites",
    [authJwt.verifyToken],
    controller.userfavouritesadd
  );

  app.delete(
    "/api/user/favourites",
    [authJwt.verifyToken],
    controller.userfavouritesdelete
  );

  app.get(
    "/api/user/purchases",
    [authJwt.verifyToken],
    controller.userpurchases
  );
};