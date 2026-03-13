// backend/routes/cartRoutes.js
const express = require("express");
const Cart = require("../models/cartmodel.js");
const router = express.Router();

// Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { userId, product } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ ...product }] });
    } else {
      const existing = cart.items.find(item => item.productId === product.productId);
      if (existing) {
        existing.quantity += product.quantity || 1;
      } else {
        cart.items.push(product);
      }
    }

    await cart.save();
    res.json({ message: "Added to cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// Get user cart
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ items: [] }); // return empty array if no cart
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cart" });
  }
});

module.exports = router;
