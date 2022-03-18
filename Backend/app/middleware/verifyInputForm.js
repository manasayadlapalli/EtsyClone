const validator = require('validator');

checkUsernameForm = (req, res, next) => {
  // Username
  if (!validator.isLength(req.body.username, {min: 4})) {
    res.status(400).send({
        message: "Failed! Username too short!"
      });
    return;
  }
  next();
};

checkEmailForm = (req, res, next) => {
  // Email
  if (!validator.isEmail(req.body.email)) {
    res.status(400).send({
        message: "Failed! Email is not correct!"
      });
    return;
  }
  next();
};
  
checkPasswordForm = (req, res, next) => {
  // Password
  if (!validator.isLength(req.body.password, {min: 4})) {
    res.status(400).send({
        message: "Failed! Password too short!"
      });
    return;
  }
  next();
};

checkCategoryIsAlpha = (req, res, next) => {
  // Email
  if (!validator.isAlpha(req.body.category)) {
    res.status(400).send({
        message: "Failed! Category name has to be within (a-zA-Z)"
      });
    return;
  }
  next();
};


const verifyInputForm = {
    checkUsernameForm: checkUsernameForm,
    checkEmailForm: checkEmailForm,
    checkPasswordForm: checkPasswordForm,
    checkCategoryIsAlpha: checkCategoryIsAlpha
};

module.exports = verifyInputForm;