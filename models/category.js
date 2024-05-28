const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommoditySchema = new Schema({
  name: { type: String, require: true, minLength: 1 },
  description: { type: String, require: true, minLength: 1 },
  products: [{ type: Schema.Types.ObjectId, ref: "Products", require: true }],
});

CommoditySchema.virtual("url").get(function () {
  return `/categories/${this._id}`;
});

module.exports = mongoose.model("Commodities", CommoditySchema);
