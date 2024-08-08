const Card = require("../models/CardModel")
const Item = require("../models/Item")
const { Sequelize } = require('sequelize');
const filterNullFields = require('../utils/filterNullValues');

const getItem = async (req, res) => {
    const id = req.params.id
    try {
        const card = await Card.findByPk(id, {
            include:[{
                model: Item
            }]
        }); // Buscar la card por ID
        if (card) {
            // Filtrar los campos nulos del objeto card
            const filteredData = filterNullFields(card);
            // Filtrar los campos nulos de los Items asociados
            filteredData.items = card.items.map(filterNullFields);
            res.status(200).json(filteredData, ); // Enviar la card encontrada como respuesta
        } else {
            res.status(404).json({ error: 'card no encontrada' }); // Manejar el caso de card no encontrada
        }
    } catch (error) {
        console.error('Error al buscar la card:', error);
        res.status(500).json({ error: 'Error interno del servidor' }); // Manejar errores del servidor
    }
}

const getItems = async (req, res) => {
    try {
        const cards = await Card.findAll({ paranoid: false }); // Obtener todas las card
        res.status(200).json(cards); // Enviar todas las card como respuesta
    } catch (error) {
        console.error('Error al obtener las card:', error);
        res.status(500).json({ error: 'Error interno del servidor' }); // Manejar errores del servidor
    }
}

const createItem = async (req, res) => {
    try {
        const { nombreCard, urlImagenCard, seccionCardId } = req.body;
        // Crear la nueva Card
        const data = await Card.create({ nombreCard, urlImagenCard, seccionCardId });
        res.send({ data });
      } catch (e) {
        console.error('Error al crear una Card:', e);
        res.status(500).json({ error: 'Error al crear una Card' }); // Manejar errores del servidor
      }
}

const updateItem = async (req, res) => {
    const id = req.params.id; // Obtener el id de los parámetros de la ruta
    const { nombreCard, urlImagenCard, seccionCardId } = req.body; // Obtener los datos a actualizar

    try {
        const card = await Card.findByPk(id); // Buscar la Card por id
        if (card) {
            // Actualizar los campos de la Card
            card.nombreCard = nombreCard || card.nombreCard;
            card.urlImagenCard = urlImagenCard || card.urlImagenCard
            card.urlImagenCard = seccionCardId || card.seccionCardId
            
            await card.save(); // Guardar los cambios
            res.status(200).json({ message: 'Card actualizada correctamente', data: card });
        } else {
            res.status(404).json({ error: 'Card no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la Card:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el banner por su clave primaria
    const card = await Card.findByPk(id);
    if (card) {
      // Realiza la eliminación suave
      await card.destroy();
      res.status(200).json({ message: "Card deleted successfully", card });
    } else {
      res.status(404).json({ message: "Card not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
  const recoverCardById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Encuentra el banner eliminado utilizando la opción 'paranoid'
      const card = await Card.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });
  
      if (!card) {
        return res.status(404).json({ message: "Card not found or already active" });
      }
  
      // Restaura el card eliminado
      await card.restore();
  
      res.status(200).json({ message: "Card recovered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    getItem,
    getItems,
    createItem,
    updateItem,
    deleteItem,
    recoverCardById
}