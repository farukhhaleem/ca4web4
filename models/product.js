const mongoose = require("../db");

const ProductSchema = mongoose.Schema({
  product_name: String,
  product_price: Number,
  product_short_description: String,
  product_description: String,
  product_image: String,
});

const Product = mongoose.model("Product", ProductSchema, "Product");
module.exports = Product;
