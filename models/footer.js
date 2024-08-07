// models/FooterModel.js
const { sequelize } = require("../config/config");
const { DataTypes } = require("sequelize");

const Footer = sequelize.define(
  "footer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titleFooter: {
      type: DataTypes.STRING,
      allowNull : true
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

module.exports = Footer;


