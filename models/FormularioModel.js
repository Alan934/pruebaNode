const { sequelize } = require("../config/config");
const { DataTypes } = require("sequelize");
const User = require('./User')

const Formulario = sequelize.define(
  "formularios",
  {
    empresa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rubroEmpresa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mensaje: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
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

User.hasMany(Formulario, { foreignKey: 'userId', onDelete: 'CASCADE' });
Formulario.belongsTo(User, { foreignKey: 'userId' });

module.exports = Formulario;
