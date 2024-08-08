const { DataTypes } = require("sequelize");
const {sequelize} = require('../config/config');
const SubCategoria = require("./SubCategoriaModel");

const SeccionTecnologia = sequelize.define(
  "SeccionTecnologia",
  {
    tituloSeccionTecnologia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subTituloSeccionTecnologia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    subCategoriaId: {
      allowNull : true,
        type: DataTypes.INTEGER,
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

SubCategoria.hasMany(SeccionTecnologia, { foreignKey: 'subCategoriaId', onDelete: 'CASCADE' });
SeccionTecnologia.belongsTo(SubCategoria, { foreignKey: 'subCategoriaId' });

module.exports = SeccionTecnologia;