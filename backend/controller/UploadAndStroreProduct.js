const { v2: cloudinary } = require("cloudinary");
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

async function UploadAndStoreProduct(req, res, next) {
	try {
		const data = req.body;
		const images = data.images;
		const UserID = req.userID;

		const uploadedImages = [];
		for (const img of images) {
			const newData = await cloudinary.uploader.upload(img, {
				folder: data.category,
				resource_type: "image"
			});
			uploadedImages.push(newData.secure_url);
		}
		req.body = { ...data, images: uploadedImages, price: data.sellingPrice };
		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error uploading image to Cloudinary" });
	}
}

module.exports = UploadAndStoreProduct;

