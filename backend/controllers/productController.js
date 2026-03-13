// controllers/productcontroller.js
const Product = require('../models/productModel.js');
// Get all products grouped by category
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    const grouped = products.reduce((acc, p) => {
      const cat = (p.category || "uncategorized").toLowerCase();
      if (!acc[cat]) acc[cat] = [];
      // convert to plain object if necessary
      acc[cat].push({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        stock: p.stock,
        category: p.category,
        image: p.image, // ensure image is a path like /images/xxx.jpg or full URL
      });
      return acc;
    }, {});
    res.json(grouped);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    let image = null;
    if (req.file) {
      image = `/images/${req.file.filename}`;
    }
    const product = await Product.create({ name, description, price, stock, category, image });
    res.status(201).json(product);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Upload image only (optional)
exports.uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ path: `/images/${req.file.filename}` });
};
