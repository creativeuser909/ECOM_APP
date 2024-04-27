const express = require("express");
const router = express.Router();
const UserModel = require('../models/UserModel.js')
const UserSignUpController = require("../controller/UserSignUp.js");

router.post("/signup", UserSignUpController);

router.get("/customers", async (req, res) => {
  try {
    const customers = await UserModel.find({});
    res.send(customers);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
