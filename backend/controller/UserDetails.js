const UserModel = require("../models/UserModel");
async function UserDetailsController(req, res) {
	try {
		console.log("User ID : ", req.userID);
		if (!req.userID) {
			throw new Error("Unauthorized: User ID not found");
		}
		const userDetails = await UserModel.findById(req.userID);
		res.status(200).json({
			success: true,
			message: "User details fetched successfully",
			user: {
				fistname : userDetails.firstname,
				email : userDetails.email,
				profilePic : userDetails.profilePic,
			}
		});
	} catch (error) {
		res.status(401).json({
			message: error.message,
			error: true,
			success: false
		});
	}
}

module.exports = UserDetailsController;
