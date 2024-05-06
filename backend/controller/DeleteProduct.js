const { v2: cloudinary } = require("cloudinary");
const ProductModel = require("../models/ProductModel");
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

async function DeleteProduct(req, res) {
	try {
		const { images, _id } = req.body;
		for (const image of images) {
			const parts = image.split("/");

			const public_id = `${parts[7]}/${parts[8].split(".")[0]}`;
			const type = `${parts[5]}`;
			const resource_type = `${parts[4]}`;

			const result = await cloudinary.uploader.destroy([public_id], {
				type: type,
				resource_type: resource_type
			});
		}
        const deleteProduct = await ProductModel.findByIdAndDelete(_id);
        if(deleteProduct){
            return res.status(200).json({message: "Product Deleted successfully"});
        }
	} catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = DeleteProduct;
