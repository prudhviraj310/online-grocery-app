// backend/controllers/orderController.js
const Order = require("../models/orderModel.js");

const createOrder = async (req, res) => {
  try {
    const { userId, products, total } = req.body;
    const order = await Order.create({ userId, products, total });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({ where: { userId } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createOrder, getOrdersByUser };
