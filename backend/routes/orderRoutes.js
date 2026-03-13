import express from "express";
import Order from "../models/OrderModel.js";

const router = express.Router();

// Place a new order
router.post("/create", async (req, res) => {
  try {
    const { userId, items, shippingAddress, paymentMethod } = req.body;

    if (!userId || !items || !items.length || !shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({
      userId,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user orders
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
