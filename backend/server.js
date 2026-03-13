// server.js (partial - show placement)
const express = require("express");
const cors = require("cors");
const path = require("path");
const { sequelize } = require("./db/db.js");
const authRoutes = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

// import models so sequelize knows them before sync
require("./models/cartModel.js");
require("./models/orderModel.js");
// other models (Product, User) must be required somewhere as well
require("./models/Product.js");
require("./models/User.js");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    await sequelize.sync({ alter: true }); // will create tables for imported models
    console.log("Database synced successfully");
  } catch (err) {
    console.error("Unable to connect to DB:", err);
  }
});
