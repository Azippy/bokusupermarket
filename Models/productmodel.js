const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      trim: true,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    description: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

//export default Product;
