const Tecnologia = require('../models/Tecnologia');
const { Sequelize } = require('sequelize');


const getAlltecnologias = async (req, res) => {
  try {
    const tecnologias = await Tecnologia.findAll({ paranoid: false });
    res.status(200).json(tecnologias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTecnologiaById = async (req, res) => {
  try {
    const { id } = req.params;
    const tecnologia = await Tecnologia.findByPk(id);
    if (tecnologia) {
      res.status(200).json(tecnologia);
    } else {
      res.status(404).json({ message: "Tecnologia not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createTecnologia = async (req, res) => {
  try {
    const { nombreTecnologia, urlImagenTecnologia, seccionTecnologiaId } = req.body;
    const newTecnologia = await Tecnologia.create({
      nombreTecnologia, urlImagenTecnologia, seccionTecnologiaId
    });
    res.status(201).json(newTecnologia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateTecnologiaById = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreTecnologia, urlImagenTecnologia, seccionTecnologiaId } = req.body;

    if (!nombreTecnologia || !urlImagenTecnologia ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const [updatedRows] = await Tecnologia.update(
      { nombreTecnologia, urlImagenTecnologia, seccionTecnologiaId },
      { where: { id } }
    );

    if (updatedRows > 0) {
      const updatedTecnologia = await Tecnologia.findOne({ where: { id } });
      res.status(200).json({ message: "Tecnologia updated successfully", tecnologia: updatedTecnologia });
    } else {
      res.status(404).json({ message: "Tecnologia not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteTecnologiaById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el tecnologia por su clave primaria
    const tecnologia = await Tecnologia.findByPk(id);
    if (tecnologia) {
      // Realiza la eliminación suave
      await tecnologia.destroy();
      res.status(200).json({ message: "Tecnologia deleted successfully", tecnologia });
    } else {
      res.status(404).json({ message: "Tecnologia not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const recoverTecnologiaById  = async (req, res) => {
  try {
    const { id } = req.params;

    // Encuentra el tecnologia eliminado utilizando la opción 'paranoid'
    const tecnologia = await Tecnologia.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });

    if (!tecnologia) {
      return res.status(404).json({ message: "Tecnologia not found or already active" });
    }

    // Restaura el tecnologia eliminado
    await tecnologia.restore();

    res.status(200).json({ message: "Tecnologia recovered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAlltecnologias,
    getTecnologiaById,
    createTecnologia,
    deleteTecnologiaById,
    updateTecnologiaById,
    recoverTecnologiaById
};
