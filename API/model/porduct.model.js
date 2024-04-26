const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please Enter Product Name..."]
  },
  description: String,
  price: {
    type: Number,
    required: [true, "Please Enter Product Price..."]
  },
  image: {
    type: String,
    required: [false, "Please Enter Product Image..."]
  },
  category: {
    type: String,
    required: [true, "Please Enter Product Category..."]
  },
  quantity: {
    type: Number,
    required: [true, "Please Enter Product Quantity..."],
    default: 0
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
