const UserModel = require("../../models/UserModel");
async function UpdateUserDetailsController(request, response) {
	try {
		const { firstname, lastname, email, password, profilePic, role, _id } =
			request.body;
		console.log(_id);
		const userEmail = await UserModel.findOne({ _id });
		if (!userEmail) {
			throw new Error("User not found");
		}
		const newData = {
			firstname,
			lastname,
			email,
			password,
			profilePic,
			role
		};
		const userNewData = await UserModel.findByIdAndUpdate(
			userEmail._id,
			newData
		);
		await userNewData.save().then(() => {
			response.status(201).json({
				data: {
					firstname: userNewData.firstname,
					lastname: userNewData.lastname,
					email: userNewData.email,
					profilePic: userNewData.profilePic,
					role: userNewData.role,
					_id: userNewData._id
				},
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

module.exports = UpdateUserDetailsController;
