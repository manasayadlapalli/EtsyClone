const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyInputForm = require("./verifyInputForm");
const verifyUserProfile = require("./verifyUserProfile");
const verifyShop = require("./VerifyShop");

module.exports = {
  authJwt,
  verifySignUp,
  verifyInputForm,
  verifyUserProfile,
  verifyShop
};