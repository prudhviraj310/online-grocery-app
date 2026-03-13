// models/cartModel.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.js"); // adjust path if needed

const Cart = sequelize.define("Cart", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  items: {
    type: DataTypes.JSON, // array of { id, name, price, quantity, image }
    allowNull: false,
    defaultValue: [],
  },
});

module.exports = Cart;
