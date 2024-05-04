
const { v2: cloudinary } = require("cloudinary");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function UploadAndStoreProduct(req, res) {
    const data = req.body;
    const image = data.images;

    const recivedData = async () => {
        try {
            const newData = await cloudinary.uploader.upload(image[0], {
                folder: "products",
                resource_type: "image"
            });

            return newData;
        } catch (error) {
            console.error(error);
            throw new Error("Error uploading image to Cloudinary");
        }
    };

    try {
        const response = await recivedData();
        if(response){
            res.send({ response, data })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = UploadAndStoreProduct;




// cloudinary.v2.api.create_folder('mobiles')