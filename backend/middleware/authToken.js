const jwt = require("jsonwebtoken");
async function authToken(req, res, next) {
	try {
		let token = req.headers.authorization;
		if (!token || !token.startsWith("Bearer ")) {
			throw new Error("Unauthorized: Invalid token format");
		}
		let tokenValue = token.split("Bearer ")[1];
		jwt.verify(tokenValue, process.env.JWT_SECRET, async (err, decoded) => {
			console.log(err);
			console.log(decoded);
			if (err) {
				console.log("Token expire");
				return;
			}
			req.userID = decoded ? decoded.userId : null;
            console.log(req.userID);
			next();
		});
	} catch (error) {
		res.status(401).json({
			message: error.message,
			error: true,
			success: false
		});
	}
}
module.exports = authToken;
