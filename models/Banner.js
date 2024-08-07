const { sequelize } = require('../config/config');
const { DataTypes } = require("sequelize");
const SubCategoria = require('./SubCategoriaModel')

const Banner = sequelize.define(
  "banner",
  {
    tituloBanner: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subtituloBanner: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    urlImagenBanner: {
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
    }
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

SubCategoria.hasMany(Banner, { foreignKey: 'subCategoriaId', onDelete: 'CASCADE' });
Banner.belongsTo(SubCategoria, { foreignKey: 'subCategoriaId' });

module.exports = Banner;