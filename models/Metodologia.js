const { DataTypes } = require("sequelize");
const {sequelize} = require('../config/config');
const SeccionMetodologia = require('../models/SeccionMetodologia')

const Metodologia = sequelize.define(
  "metodologia",
  {
    tituloMetodologia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seccionMetodologiaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: SeccionMetodologia,
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

SeccionMetodologia.hasMany(Metodologia, { foreignKey: 'seccionMetodologiaId', onDelete: 'CASCADE' });
Metodologia.belongsTo(SeccionMetodologia, { foreignKey: 'seccionMetodologiaId' });

module.exports = Metodologia;