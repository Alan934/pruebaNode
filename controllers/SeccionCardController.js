const SeccionCard = require("../models/SeccionCard");
const { Sequelize } = require('sequelize');
const Card = require('../models/CardModel');
const Item = require("../models/Item");

const getItem = async (req, res) => {
    const id = req.params.id
    try {
        const seccionCard = await SeccionCard.findByPk(id, {
            include:[{
                model:Card,
                include: Item
            }]
        });
        if (seccionCard) {
            res.status(200).json(seccionCard);
        } else {
            res.status(404).json({ error: 'seccionCard no encontrada' });
        }
    } catch (error) {
        console.error('Error al buscar la seccionCard:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const getItems = async (req, res) => {
    try {
        const seccionCard = await SeccionCard.findAll({ paranoid: false });
        res.status(200).json(seccionCard);
    } catch (error) {
        console.error('Error al obtener las seccionCards:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const createItem = async (req, res) => {
    try {
        const { tituloSeccionCard, subTituloSeccionCard, seccionGeneralId } = req.body;
        const data = await SeccionCard.create({ tituloSeccionCard, subTituloSeccionCard, seccionGeneralId });
        res.send({ data });
      } catch (e) {
        console.error('Error al crear una SeccionCard:', e);
        res.status(500).json({ error: 'Error al crear una SeccionCard' });
      }
}

const updateItem = async (req, res) => {
    const id = req.params.id;
    const { tituloSeccionCard, subTituloSeccionCard, seccionGeneralId } = req.body;

    try {
        const seccionCard = await SeccionCard.findByPk(id);
        if (seccionCard) {
            seccionCard.tituloSeccionCard = tituloSeccionCard || seccionCard.tituloSeccionCard;
            seccionCard.subTituloSeccionCard = subTituloSeccionCard || seccionCard.subTituloSeccionCard;
            seccionCard.seccionGeneralId = seccionGeneralId || seccionCard.seccionGeneralId;
            
            await seccionCard.save();
            res.status(200).json({ message: 'seccionCard actualizada correctamente', data: seccionCard });
        } else {
            res.status(404).json({ error: 'seccionCard no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la seccionCard:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
    
        const seccionCard = await SeccionCard.findByPk(id);
        if (seccionCard) {
          await seccionCard.destroy();
          res.status(200).json({ message: "seccionCard deleted successfully", seccionCard });
        } else {
          res.status(404).json({ message: "seccionCard not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

const recoverSeccionCardById = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Encuentra el Seccion Card eliminado utilizando la opción 'paranoid'
        const seccionCard = await SeccionCard.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });
    
        if (!seccionCard) {
          return res.status(404).json({ message: "Seccion Card not found or already active" });
        }
    
        // Restaura el seccionCard eliminado
        await seccionCard.restore();
    
        res.status(200).json({ message: "Seccion Card recovered successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = {getItem, getItems, createItem, updateItem, deleteItem, recoverSeccionCardById}
