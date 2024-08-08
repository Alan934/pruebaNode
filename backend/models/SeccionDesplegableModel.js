const { DataTypes } = require("sequelize");
const {sequelize} = require('../config/config');
const SubCategoria = require('./SubCategoriaModel');

const SeccionDesplegable = sequelize.define(
    "seccionDesplegable",
    {
        nombreSeccionDesplegable: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subCategoriaId: {
            type: DataTypes.INTEGER,
            allowNull: true,
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

SubCategoria.hasMany(SeccionDesplegable, { foreignKey: "subCategoriaId", onDelete: "CASCADE" }); //SubCategoria puede tener muchos SeccionDesplegable
SeccionDesplegable.belongsTo(SubCategoria, { foreignKey: "subCategoriaId" }); // SeccionDesplegable pertenece a una SubCategoria

module.exports = SeccionDesplegable;