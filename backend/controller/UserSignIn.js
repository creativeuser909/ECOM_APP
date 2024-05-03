const UserModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

async function UserSignInController(req, res) {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.json({
				status: "error",
				message: "User not found"
			});
		}
		const isPasswordValid = await bcrypt.compare(
			password,
			user.password
		);
		if (!isPasswordValid) {
			return res.json({
				status: "error",
				message: "Password is incorrect"
			});
		}
		const token = jwt.sign(
			{ userId: user._id },
			process.env.JWT_SECRET,
			{ expiresIn:  60 * 60 * 24 * 7}
		);

		res.setHeader(
			"Set-Cookie",
			cookie.serialize("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24 * 7,
				sameSite: "strict",
				path: "/"
			})
		);

		res.json({
			userData: {
				firstname: user.firstname,
				email: user.email,
				profilePic: user.profilePic,
				role: user.role
			},
			status: "success",
			message: "Authentication successful",
			token: token
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: error.message
		});
	}
}

module.exports = UserSignInController;
