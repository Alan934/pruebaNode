const { sequelize } = require("../config/config");
const { DataTypes } = require("sequelize");
const Categoria = require('./CategoriaModel')

const SubCategoria = sequelize.define(
  "subCategorias",
  {
    nombreSubCategoria: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull : true,
      references: {
        model: Categoria,
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

Categoria.hasMany(SubCategoria, { foreignKey: 'categoriaId', onDelete: 'CASCADE' });
SubCategoria.belongsTo(Categoria, { foreignKey: 'categoriaId' });

module.exports = SubCategoria;