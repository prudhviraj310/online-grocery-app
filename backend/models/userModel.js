const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db.js");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // ensures valid email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users", // explicitly define table name
    timestamps: true, // createdAt and updatedAt
    underscored: true, // snake_case for column names in DB
  }
);

module.exports = User;
