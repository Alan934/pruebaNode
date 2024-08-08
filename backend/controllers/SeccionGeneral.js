const SeccionGeneral = require('../models/SeccionGeneral');
const { Sequelize } = require('sequelize');
const SeccionCard = require('../models/SeccionCard')
const CardModel = require('../models/CardModel')
const Item = require('../models/Item')
const filterNullFields = require('../utils/filterNullValues');

const getItem = async (req, res) => {
    const { id } = req.params;
    try {
        const seccionGeneral = await SeccionGeneral.findByPk(id, {
        include: [{
            model: SeccionCard,
            as: 'seccionCards',
            include: [{
            model: CardModel,
            as: 'cards',
            include: { model: Item, as: 'items' }
            }]
        }]
        });

        if (seccionGeneral) {
        const filteredData = filterNullFields(seccionGeneral.toJSON());
        filteredData.seccionCards = filteredData.seccionCards.map(seccionCard => {
            const filteredSeccionCard = filterNullFields(seccionCard);
            filteredSeccionCard.cards = filteredSeccionCard.cards.map(card => {
                const filteredCard = filterNullFields(card);
                filteredCard.items = filteredCard.items.map(filterNullFields);
                return filteredCard;
            });
            return filteredSeccionCard;
        });

        res.send({ seccionGeneral: filteredData });
        } else {
        handleHttpError(res, 'ERROR_GET_ONE_SECTION_TEXT_NOT_FOUND');
        }
    } catch (error) {
        console.error('Error al buscar la seccionGeneral:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}  

const getItems = async (req, res) => {
    try {
        const seccionGeneral = await SeccionGeneral.findAll({ paranoid: false });
        res.status(200).json(seccionGeneral);
    } catch (error) {
        console.error('Error al obtener las seccionGeneral:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const createItem = async (req, res) => {
    try {
        const { tituloSeccionGeneral, subTituloSeccionGeneral, subCategoriaId } = req.body;
        const data = await SeccionGeneral.create({ tituloSeccionGeneral, subTituloSeccionGeneral, subCategoriaId });
        res.send({ data });
      } catch (e) {
        console.error('Error al crear una seccionGeneral:', e);
        res.status(500).json({ error: 'Error al crear una seccionGeneral' });
      }
}

const updateItem = async (req, res) => {
    const id = req.params.id;
    const { tituloSeccionGeneral, subTituloSeccionGeneral, subCategoriaId } = req.body;

    try {
        const seccionGeneral = await SeccionGeneral.findByPk(id);
        if (seccionGeneral) {
            seccionGeneral.tituloSeccionGeneral = tituloSeccionGeneral || seccionGeneral.tituloSeccionGeneral;
            seccionGeneral.subTituloSeccionGeneral = subTituloSeccionGeneral || seccionGeneral.subTituloSeccionGeneral;
            seccionGeneral.subCategoriaId = subCategoriaId || seccionGeneral.subCategoriaId;
            
            await seccionGeneral.save();
            res.status(200).json({ message: 'seccionGeneral actualizada correctamente', data: seccionGeneral });
        } else {
            res.status(404).json({ error: 'seccionGeneral no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la seccionGeneral:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
    
        const seccionGeneral = await SeccionGeneral.findByPk(id);
        if (seccionGeneral) {
          await seccionGeneral.destroy();
          res.status(200).json({ message: "seccionGeneral deleted successfully", seccionGeneral });
        } else {
          res.status(404).json({ message: "seccionGeneral not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

const recoverSeccionGeneralById = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Encuentra el Seccion Card eliminado utilizando la opción 'paranoid'
        const seccionGeneral = await SeccionGeneral.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });
    
        if (!seccionGeneral) {
          return res.status(404).json({ message: "SeccionGeneral not found or already active" });
        }
    
        // Restaura el SeccionGeneral eliminado
        await seccionGeneral.restore();
    
        res.status(200).json({ message: "SeccionGeneral recovered successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = {getItem, getItems, createItem, updateItem, deleteItem, recoverSeccionGeneralById}

