const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("online_grocery", "root", "prudhviraj", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

// Load models
const Product = require("../models/productModel.js")(sequelize);

sequelize
  .sync()  // REMOVE { alter: true }
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("Error syncing database:", err));

module.exports = { sequelize, Product };
