const db = require("../models");
const Userprofile = db.userprofile;

checkDuplicateUserProfile = (req, res, next) => {
  // Username
  Userprofile.findOne({
    where: {
      userId: req.body.userid
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! userid already has a profile in use!"
      });
      return;
    }
    next();
  });
};

const verifyUserProfile = {
    checkDuplicateUserProfile: checkDuplicateUserProfile,
};

module.exports = verifyUserProfile;