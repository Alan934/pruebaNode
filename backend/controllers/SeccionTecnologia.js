const { Sequelize } = require('sequelize');
const SeccionTecnologia = require('../models/SeccionTecnologia')
const Tecnologia = require('../models/Tecnologia')

const getItem = async (req, res) => {
    const id = req.params.id
    try {
        const seccionTecnologia = await SeccionTecnologia.findByPk(id, {
            include:[{
                model:Tecnologia,
                include: Item
            }]
        });
        if (seccionTecnologia) {
            res.status(200).json(seccionTecnologia);
        } else {
            res.status(404).json({ error: 'seccionTecnologia no encontrada' });
        }
    } catch (error) {
        console.error('Error al buscar la seccionTecnologia:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const getItems = async (req, res) => {
    try {
        const seccionTecnologia = await SeccionTecnologia.findAll({ paranoid: false });
        res.status(200).json(seccionTecnologia);
    } catch (error) {
        console.error('Error al obtener las seccionTecnologia:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const createItem = async (req, res) => {
    try {
        const { tituloSeccionTecnologia, subTituloSeccionTecnologia, subCategoriaId } = req.body;
        const data = await SeccionTecnologia.create({ tituloSeccionTecnologia, subTituloSeccionTecnologia, subCategoriaId });
        res.send({ data });
      } catch (e) {
        console.error('Error al crear una seccionTecnologia:', e);
        res.status(500).json({ error: 'Error al crear una seccionTecnologia' });
      }
}

const updateItem = async (req, res) => {
    const id = req.params.id;
    const { tituloSeccionTecnologia, subTituloSeccionTecnologia, subCategoriaId } = req.body;

    try {
        const seccionTecnologia = await SeccionTecnologia.findByPk(id);
        if (seccionTecnologia) {
            seccionTecnologia.tituloSeccionTecnologia = tituloSeccionTecnologia || seccionTecnologia.tituloSeccionTecnologia;
            seccionTecnologia.subTituloSeccionTecnologia = subTituloSeccionTecnologia || seccionTecnologia.subTituloSeccionTecnologia;
            seccionTecnologia.subCategoriaId = subCategoriaId || seccionTecnologia.subCategoriaId;
            
            await seccionTecnologia.save();
            res.status(200).json({ message: 'seccionTecnologia actualizada correctamente', data: seccionTecnologia });
        } else {
            res.status(404).json({ error: 'seccionTecnologia no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la seccionTecnologia:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
    
        const seccionTecnologia = await SeccionTecnologia.findByPk(id);
        if (seccionTecnologia) {
          await seccionTecnologia.destroy();
          res.status(200).json({ message: "seccionTecnologia deleted successfully", seccionTecnologia });
        } else {
          res.status(404).json({ message: "seccionTecnologia not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

const recoverSeccionTecnologiaById = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Encuentra el SeccionTecnologia eliminado utilizando la opción 'paranoid'
        const seccionTecnologia = await SeccionTecnologia.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });
    
        if (!seccionTecnologia) {
          return res.status(404).json({ message: "SeccionTecnologianot found or already active" });
        }
    
        // Restaura el SeccionTecnologia eliminado
        await seccionTecnologia.restore();
    
        res.status(200).json({ message: "SeccionTecnologia recovered successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = { getItem, getItems, createItem, updateItem, deleteItem, recoverSeccionTecnologiaById}

