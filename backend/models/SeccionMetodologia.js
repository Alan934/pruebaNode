const { DataTypes } = require("sequelize");
const {sequelize} = require('../config/config');
const SubCategoria = require("./SubCategoriaModel");

const SeccionMetodologia = sequelize.define(
  "SeccionMetodologia",
  {
    tituloSeccionMetodologia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subTituloSeccionMetodologia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    subCategoriaId: {
        type: DataTypes.INTEGER,
        allowNull : true,
        references: {
          model: SubCategoria,
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

SubCategoria.hasMany(SeccionMetodologia, { foreignKey: 'subCategoriaId', onDelete: 'CASCADE' });
SeccionMetodologia.belongsTo(SubCategoria, { foreignKey: 'subCategoriaId' });

module.exports = SeccionMetodologia;