const { DataTypes } = require("sequelize");
const {sequelize} = require('../config/config');
const SubCategoria = require('./SubCategoriaModel')

const SeccionGeneral = sequelize.define(
  "seccionGeneral",
  {
    tituloSeccionGeneral: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subTituloSeccionGeneral: {
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

SubCategoria.hasMany(SeccionGeneral, { foreignKey: 'subCategoriaId', onDelete: 'CASCADE' });
SeccionGeneral.belongsTo(SubCategoria, { foreignKey: 'subCategoriaId' });

module.exports = SeccionGeneral;