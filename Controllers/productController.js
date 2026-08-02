const Product = require("../Models/productmodel.js");
//create a product

exports.createProduct = async (req, res) => {
  try {
    //check if all required filed are provided
    if (
      !req.body.name ||
      !req.body.size ||
      !req.body.description ||
      !req.body.price ||
      !req.body.quantity
    ) {
      return res
        .status(400)
        .json({ message: "please provide all the required field" });
    }
    //short code to post
    // const product = await Product.create(req.body);
    // res.status(201).json(product)

    const { name, size, description, price, quantity, color } = req.body;

    const product = new Product({
      name,
      size,
      description,
      price,
      quantity,
      color,
    });
    await product.save();
    res.status(201).json({ message: "product created successsfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

//update a product

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, size, description, price, quantity, color } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { name, size, description, price, quantity, color },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ message: "product updated successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

//get all products

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Can not get product" });
  }
};

//get one product by id

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

//delete a product

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Product deleted successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not delete the product", error: error.message });
  }
};
