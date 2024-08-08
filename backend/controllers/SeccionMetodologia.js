const { Sequelize } = require('sequelize');
const SeccionMetodologia = require("../models/SeccionMetodologia");
const Metodologia = require('../models/Metodologia')
const Item = require('../models/Item');
const filterNullFields = require('../utils/filterNullValues');

const getItem = async (req, res) => {
    const id = req.params.id;
    try {
        const seccionMetodologia = await SeccionMetodologia.findByPk(id, {

            include: [{
                model: Metodologia,
                as: 'metodologia',
                include: [{
                    model: Item,
                    as: 'items',
                }]

            }]
        });

        if (seccionMetodologia) {
            // Filtrar los campos nulos en el objeto principal
            const filteredData = filterNullFields(seccionMetodologia.toJSON());
            // Filtrar los campos nulos en 'metodologia' y 'items' si existen
            filteredData.metodologia = filteredData.metodologia.map(metodologiaFilter => {
                const filteredMetodologia = filterNullFields(metodologiaFilter);
                if (Array.isArray(filteredMetodologia.items)) {
                    filteredMetodologia.items = filteredMetodologia.items.map(filterNullFields);
                } else {
                    filteredMetodologia.items = [];
                }
                return filteredMetodologia;
            });
            res.send({ seccionMetodologia: filteredData });
        } else {
            res.status(404).json({ error: 'seccionMetodologia no encontrada' });
        }
    } catch (error) {
        console.error('Error al buscar la seccionMetodologia:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getItems = async (req, res) => {
    try {
        const seccionMetodologia = await SeccionMetodologia.findAll({ paranoid: false });
        res.status(200).json(seccionMetodologia);
    } catch (error) {
        console.error('Error al obtener las seccionMetodologia:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const createItem = async (req, res) => {
    try {
        const { tituloSeccionMetodologia, subTituloSeccionMetodologia, subCategoriaId } = req.body;
        const data = await SeccionMetodologia.create({ tituloSeccionMetodologia, subTituloSeccionMetodologia, subCategoriaId });
        res.send({ data });
      } catch (e) {
        console.error('Error al crear una SeccionCard:', e);
        res.status(500).json({ error: 'Error al crear una SeccionCard' });
      }
}

const updateItem = async (req, res) => {
    const id = req.params.id;
    const { tituloSeccionMetodologia, subTituloSeccionMetodologia, subCategoriaId } = req.body;

    try {
        const seccionMetodologia = await SeccionMetodologia.findByPk(id);
        if (seccionMetodologia) {
            seccionMetodologia.tituloSeccionMetodologia = tituloSeccionMetodologia || seccionMetodologia.tituloSeccionMetodologia;
            seccionMetodologia.subTituloSeccionMetodologia = subTituloSeccionMetodologia || seccionMetodologia.subTituloSeccionMetodologia;
            seccionMetodologia.subCategoriaId = subCategoriaId || seccionMetodologia.subCategoriaId;
            
            await seccionMetodologia.save();
            res.status(200).json({ message: 'seccionMetodologia actualizada correctamente', data: seccionMetodologia });
        } else {
            res.status(404).json({ error: 'seccionMetodologia no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la seccionMetodologia:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
    
        const seccionMetodologia = await SeccionMetodologia.findByPk(id);
        if (seccionMetodologia) {
          await seccionMetodologia.destroy();
          res.status(200).json({ message: "seccionMetodologia deleted successfully", seccionMetodologia });
        } else {
          res.status(404).json({ message: "seccionMetodologia not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

const recoverSeccionMetodologiaById = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Encuentra el SeccionMetodologia eliminado utilizando la opción 'paranoid'
        const seccionMetodologia = await SeccionMetodologia.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });
    
        if (!seccionMetodologia) {
          return res.status(404).json({ message: "SeccionMetodologia not found or already active" });
        }
    
        // Restaura el SeccionMetodologia eliminado
        await seccionMetodologia.restore();
    
        res.status(200).json({ message: "SeccionMetodologia recovered successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = { getItem, getItems, createItem, updateItem, deleteItem, recoverSeccionMetodologiaById }
