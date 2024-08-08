const { DataTypes } = require("sequelize");
const {sequelize} = require('../config/config');
const SeccionGeneral = require("./SeccionGeneral");

const SeccionCard = sequelize.define(
  "seccionCards",
  {
    tituloSeccionCard: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subTituloSeccionCard: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seccionGeneralId: {
        type: DataTypes.INTEGER,
        allowNull : true,
        references: {
          model: SeccionGeneral,
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

SeccionGeneral.hasMany(SeccionCard, { foreignKey: 'seccionGeneralId', onDelete: 'CASCADE' });
SeccionCard.belongsTo(SeccionGeneral, { foreignKey: 'seccionGeneralId' });

module.exports = SeccionCard;