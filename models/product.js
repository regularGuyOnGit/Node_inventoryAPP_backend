const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true, minLength: 1 },
  description: { type: String, required: true, minLength: 10 },
  category: { type: String, required: true },
  price: { type: String, required: true },
  number_in_stock: Number,
});

ProductSchema.virtual("url").get(function () {
  return `/products/${this._id}`;
});

module.exports = mongoose.model("Products", ProductSchema);
