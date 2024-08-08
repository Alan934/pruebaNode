const { DataTypes } = require("sequelize");
const {sequelize} = require('../config/config');
const SubCategoria = require('./SubCategoriaModel');

const SectionText = sequelize.define(
    "sectionText",
    {
        titleSectionText: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subtitleSectionText: {
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

SubCategoria.hasMany(SectionText, { foreignKey: 'subCategoriaId', onDelete: 'CASCADE' }); // Subcategoría puede tener muchos SeccionText, al eliminar SubCategoria se eliminan sus SeccionText
SectionText.belongsTo(SubCategoria, { foreignKey: 'subCategoriaId' });// SeccionText pertenece a una Subcategoría

module.exports = SectionText;