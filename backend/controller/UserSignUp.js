const { response } = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

async function UserSignUpController(request, response) {
	try {
		const { firstname, lastname, email, password, profilePic } =
			request.body;
		const userEmail = await UserModel.findOne({ email: email });

		if (userEmail) {
			throw new Error("Email Already Exists");
		}
		if (!email) {
			throw new Error("Invalid email");
		}
		if (!password) {
			throw new Error("Incorrect Password");
		}
		if (!firstname) {
			throw new Error("Invalid User Name");
		}
		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashPassword = bcrypt.hashSync(password, salt);
		if (!hashPassword) {
			throw new Error("Something went wrong.");
		}
		const userData = new UserModel({
			firstname,
			lastname,
			email,
			password: hashPassword,
			role: "GENERAL",
			profilePic
		});
		await userData.save().then(() => {
			response.status(201).json({
				success: true,
				message: "User Created Successfully!"
			});
		});
	} catch (error) {
		response.json({
			message: error.message,
			error: true,
			success: false
		});
	}
}

module.exports = UserSignUpController;
