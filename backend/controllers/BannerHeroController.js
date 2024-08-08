const BannerHero = require('../models/BannerHero');
const { Sequelize } = require('sequelize');
const filterNullFields = require('../utils/filterNullValues');
const Item = require('../models/Item');

const getAllBannersHero = async (req, res) => {
  try {
    const bannershero = await BannerHero.findAll({ paranoid: false });
    res.status(200).json(bannershero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBannerHeroById = async (req, res) => {
  try {
    const { id } = req.params;
    const bannerhero = await BannerHero.findByPk(id, {
      include: [{
        model: Item,
        as: 'items',
      }],
    });
    if (bannerhero) { 
      // Filtrar los campos nulos del objeto BannerHero
      const filteredData = filterNullFields(bannerhero);
      // Filtrar los campos nulos de los Items asociados
      filteredData.items = bannerhero.items.map(filterNullFields);
      res.send({ data: filteredData });
  } else {
    handleHttpError(res, 'ERROR_GET_ONE_SECTION_TEXT_NOT_FOUND');
  }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createBannerHero = async (req, res) => {
  try {
    const { tituloBannerHero, descripcionBannerHero, urlImagenBannerHero, subCategoriaId } = req.body;

    const newBannerHero = await BannerHero.create({
      tituloBannerHero, descripcionBannerHero,urlImagenBannerHero,subCategoriaId
    });
    res.status(201).json(newBannerHero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateBannerHeroById = async (req, res) => {
  try {
    const { id } = req.params;

    const { tituloBannerHero, descripcionBannerHero,urlImagenBannerHero,subCategoriaId } = req.body;


    if (!tituloBannerHero || !descripcionBannerHero || !urlImagenBannerHero) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const [updatedRows] = await BannerHero.update(
      { tituloBannerHero, descripcionBannerHero,urlImagenBannerHero,subCategoriaId },
      { where: { id } }
    );

    if (updatedRows > 0) {
      const updatedBannerHero = await BannerHero.findOne({ where: { id } });
      res.status(200).json({ message: "BannerHero updated successfully", bannerhero: updatedBannerHero });
    } else {
      res.status(404).json({ message: "BannerHero not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteBannerHeroById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el bannerhero por su clave primaria
    const bannerhero = await BannerHero.findByPk(id);
    if (bannerhero) {
      // Realiza la eliminación suave
      await bannerhero.destroy();
      res.status(200).json({ message: "BannerHero deleted successfully", bannerhero });
    } else {
      res.status(404).json({ message: "BannerHero not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const recoverBannerHeroById = async (req, res) => {
  try {
    const { id } = req.params;

    // Encuentra el bannerhero eliminado utilizando la opción 'paranoid'
    const bannerhero = await BannerHero.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });

    if (!bannerhero) {
      return res.status(404).json({ message: "BannerHero not found or already active" });
    }

    // Restaura el bannerhero eliminado
    await bannerhero.restore();

    res.status(200).json({ message: "BannerHero recovered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAllBannersHero,
    getBannerHeroById,
    createBannerHero,
    updateBannerHeroById,
    deleteBannerHeroById,
    recoverBannerHeroById
};
