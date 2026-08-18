const productController = require("../Controllers/productController");
//we can destructure it
//const {createProduct, updateProduct, getAllProduct, getProductById, deleteProduct} = require("../Controllers/productController");
const { protect } = require("../middleware/auth.js");
const { authorize } = require("../middleware/role.js");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.js");

//define the route
router.post(
  "/createproduct",
  protect,
  authorize("superadmin", "storekeeper"),
  productController.createProduct,
);
router.put(
  "/updateproduct/:id",
  protect,
  authorize("storekeeper"),
  productController.updateProduct,
);
router.post(
  "/createproductwithimage",
  protect,
  productController.createProductWithImage,
);
router.get("/get-all-product", protect, productController.getAllProduct);
router.get("/get-one-product/:id", protect, productController.getProductById);
router.delete(
  "/deleteProduct/:id",
  protect,
  authorize("superadmin"),
  productController.deleteProduct,
);

//export the router
module.exports = router;
