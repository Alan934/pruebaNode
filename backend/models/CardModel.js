const { sequelize } = require("../config/config");
const { DataTypes } = require("sequelize");
const SeccionCard = require("./SeccionCard");

const Card = sequelize.define(
  "cards",
  {
    nombreCard: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    urlImagenCard: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seccionCardId: {
      type: DataTypes.INTEGER,
      references: {
        model: SeccionCard,
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

SeccionCard.hasMany(Card, { foreignKey: 'seccionCardId', onDelete: 'CASCADE' });
Card.belongsTo(SeccionCard, { foreignKey: 'seccionCardId' });

module.exports = Card;