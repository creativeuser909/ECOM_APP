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
		images: [
			{
				type: String,
				required: true
			}
		],
		brandName: {
			type: String,
		},
		category: {
			type: String,
			required: true
		},
		quantity: {
			type: Number,
			default: 0
		}
	},
	{
		timestamps: true
	}
);

const ProductModel = mongoose.model("Products", productSchema);

module.exports = ProductModel;