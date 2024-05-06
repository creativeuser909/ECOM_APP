const ProductModel = require("../models/ProductModel");
async function SendProductList(req, response) {
	try {
		const userId = req.userID;
		if (!userId) {
			return response
				.status(400)
				.json({ error: "User ID is missing in the request" });
		}

		const products = await ProductModel.find({ userId });
		const productData = products.map(product => ({
            ...product.toObject(),
			signature: product.signature
        }));
		response.status(200).json(productData);
	} catch (error) {
		console.error("Failed to fetch products:", error);
		response.status(500).json({ error: "Failed to fetch products" });
	}
}

module.exports = SendProductList;
