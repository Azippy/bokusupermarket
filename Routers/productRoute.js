const productController = require("../Controllers/productController");
//we can destructure it
//const {createProduct, updateProduct, getAllProduct, getProductById, deleteProduct} = require("../Controllers/productController");

const express = require("express");
const router = express.Router();

//define the route
router.post("/createproduct", productController.createProduct);
router.put("/updateproduct/:id", productController.updateProduct);
router.get("/getAllProduct", productController.getAllProduct);
router.get("/getProductById/:id", productController.getProductById);
router.delete("/deleteProduct/:id", productController.deleteProduct);

//export the router
module.exports = router;
