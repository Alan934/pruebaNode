// models/VistaModel.js
const { sequelize } = require("../config/config");
const { DataTypes } = require("sequelize");

const Vista = sequelize.define(
  "vistas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombreVista: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    iconUrlVista: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    }
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Vista;

