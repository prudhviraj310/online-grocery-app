// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productcontroller.js"); // adjust path

// GET /api/products -> grouped by category (controller handles)
router.get("/", productController.getAllProducts);

// If you want create/upload endpoints, expose them:
router.post("/", productController.createProduct);
// POST to upload image if using multer
router.post("/upload", productController.uploadImage);

module.exports = router;
