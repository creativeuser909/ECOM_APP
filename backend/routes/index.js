const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel.js");
const UserSignUpController = require("../controller/user/UserSignUp.js");
const UserSignInController = require("../controller/user/UserSignIn.js");
const UserDetailsController = require("../controller/user/UserDetails.js");
const authToken = require("../middleware/authToken.js");
const UpdateUserDetailsController = require("../controller/user/UpdateUserDetails.js");
const UploadAndStoreProduct = require("../controller/product/UploadAndStroreProduct.js");
const SaveProductToDB = require("../controller/product/SaveProductToDB.js");
const SendProductList = require("../controller/product/SendProductList.js");
const UpdateProductDetail = require("../controller/product/UpdateProductDetails.js");
const DeleteProduct = require("../controller/product/DeleteProduct.js");
const GetProductCategory = require("../controller/product/GetProductCategory.js");

router.post("/signup", UserSignUpController);

router.post("/signin", UserSignInController);

router.post("/user-details", authToken, UserDetailsController);
router.post("/update-user-details", UpdateUserDetailsController);
router.post(
	"/upload-product",
	authToken,
	UploadAndStoreProduct,
	SaveProductToDB
);
router.post("/get-products", authToken, SendProductList);
router.post("/update-product", authToken, UpdateProductDetail);
router.post("/delete-product", authToken, DeleteProduct);
router.post("/get-product-category", GetProductCategory);
router.get("/getUsers", async (req, res) => {
	try {
		const users = await UserModel.find({});
		res.json(users);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

module.exports = router;
