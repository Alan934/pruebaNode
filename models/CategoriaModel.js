const { sequelize } = require("../config/config");
const { DataTypes } = require("sequelize");
const Vista = require('./VistaModel')

const Categoria = sequelize.define(
  "categorias",
  {
    nombreCategoria: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vistaId: {
      type: DataTypes.INTEGER,
      references: {
        model: Vista,
        key: 'id',
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

Vista.hasMany(Categoria, { foreignKey: 'vistaId', onDelete: 'CASCADE' });
Categoria.belongsTo(Vista, { foreignKey: 'vistaId' });

module.exports = Categoria;