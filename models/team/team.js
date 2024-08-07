const { sequelize } = require("../../config/config");
const { DataTypes } = require("sequelize");
const SubCategoria = require('../SubCategoriaModel');

const Team = sequelize.define("team", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    teamDescription: {
        type: DataTypes.STRING
    },
    teamName:{
        type: DataTypes.STRING
    },
    subCategoriaId: {
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

SubCategoria.hasMany(Team, { foreignKey: 'subCategoriaId', onDelete: 'CASCADE' }); // Subcategoría puede tener muchos Team, al eliminar SubCategoria se eliminan sus Team
Team.belongsTo(SubCategoria, { foreignKey: 'subCategoriaId' });// Team pertenece a una Subcategoría

module.exports = Team;