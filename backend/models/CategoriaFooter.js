const { sequelize } = require("../config/config");
const { DataTypes } = require("sequelize");
const Footer = require("./footer");

const CategoriaFooter = sequelize.define(
    "categoriaFooter",
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titleCategoriaFooter: {
        type: DataTypes.STRING,
        allowNull : true
    },
    id_footer: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
          model: Footer,
          key: "id",
        }
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

Footer.hasMany(CategoriaFooter, { foreignKey: "id_footer", onDelete: "CASCADE"});
CategoriaFooter.belongsTo(Footer, { foreignKey: "id_footer" });

module.exports = CategoriaFooter;