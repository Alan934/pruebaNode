const { DataTypes } = require("sequelize");
const {sequelize} = require('../config/config');
const SubCategoria = require('./SubCategoriaModel')

const BannerHero = sequelize.define(
  "bannerhero",
  {
    tituloBannerHero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcionBannerHero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    urlImagenBannerHero: {
      type: DataTypes.STRING,
      allowNull: true,
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
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

SubCategoria.hasMany(BannerHero, { foreignKey: 'subCategoriaId', onDelete: 'CASCADE' });
BannerHero.belongsTo(SubCategoria, { foreignKey: 'subCategoriaId' });

module.exports = BannerHero;
