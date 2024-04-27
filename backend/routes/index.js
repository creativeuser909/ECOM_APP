const express = require("express");
const router = express.Router();
const UserModel = require('../models/UserModel.js')
const UserSignUpController = require("../controller/UserSignUp.js");
const UserSignInController = require('../controller/UserSignIn.js');

router.post("/signup", UserSignUpController);

router.post("/signin", UserSignInController)

module.exports = router;
