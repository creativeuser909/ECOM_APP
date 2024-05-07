// const ProductModel = require("../../models/ProductModel");

// const GetProductCategory = async (req, res) => {
//     try {
//         const products = await ProductModel.find("category");
//         const categoriesList = products.map(product => ({
//             category: product.category,
//             images: product.images,
//         }));

//         res.status(200).json({ categoriesList });
//     } catch (error) {
//         console.error("Error fetching product categories:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// module.exports = GetProductCategory;









const ProductModel = require("../../models/ProductModel");

const GetProductCategory = async (req, res) => {
    try {
        const categoriesList = await ProductModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    images: { $first: "$images" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    images: 1
                }
            }
        ]);

        res.status(200).json({ categoriesList });
    } catch (error) {
        console.error("Error fetching product categories:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = GetProductCategory;
