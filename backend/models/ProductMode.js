const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true
		},
		productName: {
			type: String,
			required: true
		},
		description: String,
		price: {
			type: Number,
			required: true
		},
		image: [
			{
				type: String,
				required: true
			}
		],
		category: {
			type: String,
			required: true
		},
		quantity: {
			type: Number,
			required: true,
			default: 0
		}
	},
	{
		timestamps: true
	}
);

const ProductModel = mongoose.model("Products", productSchema);

module.exports = ProductModel;