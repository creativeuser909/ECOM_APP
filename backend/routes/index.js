const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel.js");
const UserSignUpController = require("../controller/UserSignUp.js");
const UserSignInController = require("../controller/UserSignIn.js");
const UserDetailsController = require("../controller/UserDetails.js");
const authToken = require("../middleware/authToken.js");
const UpdateUserDetailsController = require("../controller/UpdateUserDetails.js");
const UploadAndStoreProduct = require("../controller/UploadAndStroreProduct.js");
const SaveProductToDB = require("../controller/SaveProductToDB.js");
const SendProductList = require("../controller/SendProductList.js");
const UpdateProductDetail = require("../controller/UpdateProductDetails.js");
const DeleteProduct = require("../controller/DeleteProduct.js");

router.post("/signup", UserSignUpController);

router.post("/signin", UserSignInController);

router.post("/user-details", authToken, UserDetailsController);
router.post("/update-user-details", UpdateUserDetailsController);
router.post("/upload-product", authToken, UploadAndStoreProduct, SaveProductToDB);
router.post("/get-products", authToken, SendProductList);
router.post("/update-product", authToken, UpdateProductDetail, SaveProductToDB);
router.post("/delete-product", authToken, DeleteProduct);
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
