const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");
const SeccionTecnologia = require('../models/SeccionTecnologia')

const Tecnologia = sequelize.define(
  "tecnologia",
  {
    nombreTecnologia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    urlImagenTecnologia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seccionTecnologiaId: {
      type: DataTypes.INTEGER,
      allowNull : true, 
      references: {
        model: SeccionTecnologia,
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

SeccionTecnologia.hasMany(Tecnologia, { foreignKey: 'seccionTecnologiaId', onDelete: 'CASCADE' });
Tecnologia.belongsTo(SeccionTecnologia, { foreignKey: 'seccionTecnologiaId' });

module.exports = Tecnologia;
