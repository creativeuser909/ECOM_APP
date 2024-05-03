const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel.js");
const UserSignUpController = require("../controller/UserSignUp.js");
const UserSignInController = require("../controller/UserSignIn.js");
const UserDetailsController = require("../controller/UserDetails.js");
const authToken = require("../middleware/authToken.js");
const UpdateUserDetailsController = require("../controller/UpdateUserDetails.js");

router.post("/signup", UserSignUpController);

router.post("/signin", UserSignInController);

router.post("/user-details", authToken, UserDetailsController);
router.post("/update-user-details", UpdateUserDetailsController);
router.get('/getUsers', async (req, res) =>{
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})

module.exports = router;
