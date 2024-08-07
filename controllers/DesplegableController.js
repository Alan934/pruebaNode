const { body } = require('express-validator');
const Desplegable = require('../models/Desplegable');
const Item = require('../models/Item');
const { Sequelize } = require('sequelize');
const filterNullFields = require('../utils/filterNullValues');

const getAllDesplegables = async (req, res) => {
  try {
    const desplegables = await Desplegable.findAll({ paranoid: false });
    res.status(200).json(desplegables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDesplegableById = async (req, res) => {
  try {
    const { id } = req.params;
    const desplegable = await Desplegable.findByPk(id,{
      include: [{
        model: Item,
        as: 'items',
      }],
    });
    if (desplegable) {
      // Filtrar los campos nulos del objeto Desplegable
      const filteredData = filterNullFields(desplegable);
      // Filtrar los campos nulos de los Items asociados
      filteredData.items = desplegable.items.map(filterNullFields);
      res.status(200).json(filteredData);
    } else {
      res.status(404).json({ message: "Desplegable not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDesplegable = async (req, res) => {
  try {

    const { tituloDesplegable, textoDesplegable, seccionDesplegableId } = req.body;
    const newDesplegable = await Desplegable.create({

      tituloDesplegable,
      textoDesplegable,
      seccionDesplegableId

    });
    res.status(201).json(newDesplegable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateDesplegableById = async (req, res) => {
  try {
    const { id } = req.params;
    const { tituloDesplegable ,textoDesplegable , seccionDesplegableId } = req.body;

    if (!textoDesplegable) {

      return res.status(400).json({ message: "Missing required fields" });
    }

    const [updatedRows] = await Desplegable.update(
      { tituloDesplegable , textoDesplegable , seccionDesplegableId },

      { where: { id } }
    );

    if (updatedRows > 0) {
      const updatedDesplegable = await Desplegable.findOne({ where: { id } });
      res.status(200).json({ message: "Desplegable updated successfully", desplegable: updatedDesplegable });
    } else {
      res.status(404).json({ message: "Desplegable not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteDesplegableById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el Desplegable por su clave primaria
    const desplegable = await Desplegable.findByPk(id);
    if (desplegable) {
      // Realiza la eliminación suave
      await desplegable.destroy();
      res.status(200).json({ message: "Desplegable deleted successfully", desplegable });
    } else {
      res.status(404).json({ message: "Desplegable not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const recoverDesplegableById  = async (req, res) => {
  try {
    const { id } = req.params;

    // Encuentra el desplegable eliminado utilizando la opción 'paranoid'
    const desplegable = await Desplegable.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });

    if (!desplegable) {
      return res.status(404).json({ message: "Desplegable not found or already active" });
    }

    // Restaura el desplegable eliminado
    await desplegable.restore();

    res.status(200).json({ message: "Desplegable recovered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAllDesplegables,
    getDesplegableById,
    createDesplegable,
    deleteDesplegableById,
    updateDesplegableById,
    recoverDesplegableById
};

