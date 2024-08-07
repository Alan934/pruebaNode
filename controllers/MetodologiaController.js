const Metodologia = require('../models/Metodologia');
const Item = require('../models/Item');
const { Sequelize } = require('sequelize');
const filterNullFields = require('../utils/filterNullValues');

const getAllMetodologias = async (req, res) => {
  try {
    const metodologias = await Metodologia.findAll({ paranoid: false });
    res.status(200).json(metodologias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getMetodologiaById = async (req, res) => {
  try {
    const { id } = req.params;
    const metodologia = await Metodologia.findByPk(id,{
      include: [{
        model: Item,
        as: 'items',
      }],
    });
    if (metodologia) {
      // Filtrar los campos nulos del objeto Metodologia
      const filteredData = filterNullFields(metodologia);
      // Filtrar los campos nulos de los Items asociados
      filteredData.items = metodologia.items.map(filterNullFields);
      res.status(200).json(filteredData);
    } else {
      res.status(404).json({ message: "Metodologia not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createMetodologia = async (req, res) => {
  try {
    const { tituloMetodologia, seccionMetodologiaId } = req.body;
    const newMetodologia = await Metodologia.create({
      tituloMetodologia, seccionMetodologiaId
    });
    res.status(201).json(newMetodologia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateMetodologiaById = async (req, res) => {
  try {
    const { id } = req.params;
    const { tituloMetodologia, seccionMetodologiaId } = req.body;

    if (!tituloMetodologia) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const [updatedRows] = await Metodologia.update(
      { tituloMetodologia, seccionMetodologiaId },
      { where: { id } }
    );

    if (updatedRows > 0) {
      const updatedMetodologia = await Metodologia.findOne({ where: { id } });
      res.status(200).json({ message: "Metodologia updated successfully", metodologia: updatedMetodologia });
    } else {
      res.status(404).json({ message: "Metodologia not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteMetodologiaById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el metodologia por su clave primaria
    const metodologia = await Metodologia.findByPk(id);
    if (metodologia) {
      // Realiza la eliminación suave
      await metodologia.destroy();
      res.status(200).json({ message: "Metodologia deleted successfully", metodologia });
    } else {
      res.status(404).json({ message: "Metodologia not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const recoverMetodologiaById = async (req, res) => {
  try {
    const { id } = req.params;

    // Encuentra el metodologia eliminado utilizando la opción 'paranoid'
    const metodologia = await Metodologia.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });

    if (!metodologia) {
      return res.status(404).json({ message: "Metodologia not found or already active" });
    }

    // Restaura el metodologia eliminado
    await metodologia.restore();

    res.status(200).json({ message: "Metodologia recovered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    getAllMetodologias,
    getMetodologiaById,
    createMetodologia,
    deleteMetodologiaById,
    updateMetodologiaById,
    recoverMetodologiaById
};
