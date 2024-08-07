const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");
const Banner = require("./Banner");
const Desplegable = require("./Desplegable");
const Metodologia = require("./Metodologia");
const Card = require("./CardModel");
const Footer = require("./footer");
const SectionText = require("./SectionTextModel");
const CategoriaFooter = require("./CategoriaFooter");
const BannerHero = require('../models/BannerHero')

const Item = sequelize.define(
  "item",
  {
    tituloItem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subtituloItem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    urlIconItem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_banner: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Banner,
        key: "id",
      },
    },
    id_categoriaFooter: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: CategoriaFooter,
        key: "id",
      },
    },
    id_desplegable: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Desplegable,
        key: "id",
      },
    },
    id_metodologia: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Metodologia,
        key: "id",
      },
    },
    id_card:{
      type: DataTypes.INTEGER,
      allowNull: true,
      references:{
        model: Card,
        key: "id",
      }
    },
    id_sectionText: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references:{
        model: SectionText,
        key: "id",
      }
    },
    id_bannerHero: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references:{
        model: BannerHero,
        key: "id",
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

BannerHero.hasMany(Item, { foreignKey: "id_bannerHero", onDelete: "CASCADE"});
Item.belongsTo(BannerHero, { foreignKey: "id_bannerHero" });

Banner.hasMany(Item, { foreignKey: "id_banner", onDelete: "CASCADE"});
Item.belongsTo(Banner, { foreignKey: "id_banner" });

CategoriaFooter.hasMany(Item, { foreignKey: "id_categoriaFooter", onDelete: "CASCADE"});
Item.belongsTo(CategoriaFooter, { foreignKey: "id_categoriaFooter" });

Desplegable.hasMany(Item, { foreignKey: "id_desplegable", onDelete: "CASCADE" });
Item.belongsTo(Desplegable, { foreignKey: "id_desplegable" });

Metodologia.hasMany(Item, { foreignKey: "id_metodologia", onDelete: "CASCADE" });
Item.belongsTo(Metodologia, { foreignKey: "id_metodologia" });

Card.hasMany(Item, { foreignKey: "id_card", onDelete: "CASCADE" });
Item.belongsTo(Card, { foreignKey: "id_card" });

SectionText.hasMany(Item, { foreignKey: "id_sectionText", onDelete: "CASCADE" });
Item.belongsTo(SectionText, { foreignKey: "id_sectionText" });

module.exports = Item;
