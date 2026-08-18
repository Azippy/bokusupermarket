const Product = require("../Models/productmodel.js");
const upload = require("../middleware/upload");
const sendEmail = require("../middleware/emailsender.js");
//create a product

exports.createProduct = async (req, res) => {
  try {
    //check if all required filed are provided
    const { name, size, description, price, quantity, color } = req.body;

    if (!name || !size || !description || !price || !quantity || !color) {
      return res
        .status(400)
        .json({ message: "please provide all the required field" });
    }
    //short code to post
    // const product = await Product.create(req.body);
    // res.status(201).json(product)

    const product = new Product({
      name,
      size,
      description,
      price,
      quantity,
      color,
    });
    await product.save();

    //generate otp
    const otp = Math.floor(100000 + Math.random() * 900000); //generate a 6 digit otp
    //send email notification to admin that a new product has been created
    const subject = "New Product Created";
    const text = `A new product has been creacted, confirm with this ${otp}`;
    await sendEmail("lekanazippy@gmail.com", subject, text);

    res.status(201).json({ message: "product created successsfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

exports.createProductWithImage = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    //check upload error
    if (err) {
      return res
        .status(400)
        .json({ message: "Error uploading image", error: err.message });
    }
    try {
      //get product data from requst body
      const { name, size, description, price, quantity, color } = req.body;
      //check required field
      if (!name || !size || !description || !price || !quantity) {
        return res
          .status(400)
          .json({ message: "Please provide all the required field" });
      }

      //check if image was uploaded
      if (!req.file) {
        return res.status(400).json({ message: "Please provide an image" });
      }
      console.log(req.file.path);
      console.log(req.body);

      //create product
      const product = new Product({
        name,
        size,
        description,
        price,
        quantity,
        color,
        image: req.file.path,
      });
      //save product to database
      await product.save();
      return res
        .status(200)
        .json({ message: "Product Created successfully", product });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ message: "Error Creating Product" });
    }
  });
};

//update a product

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, size, description, price, quantity, color } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { name, size, description, price, quantity, color },
      { new: true, runValidators: true },
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
