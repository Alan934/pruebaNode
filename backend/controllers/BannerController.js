const Banner = require('../models/Banner');
const Item = require('../models/Item');
const { Sequelize } = require('sequelize');
const filterNullFields = require('../utils/filterNullValues');

const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll({ paranoid: false });
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByPk(id, {
      include: [{
        model: Item,
        as: 'items',
      }],
    });
    if (banner) {
      // Filtrar los campos nulos del objeto Banner
      const filteredData = filterNullFields(banner);
      // Filtrar los campos nulos de los Items asociados
      filteredData.items = banner.items.map(filterNullFields);
      res.status(200).json(filteredData);
    } else {
      res.status(404).json({ message: "Banner not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBanner = async (req, res) => {
  try {
    const { tituloBanner, subtituloBanner, urlImagenBanner, subCategoriaId } = req.body;
    const newBanner = await Banner.create({ tituloBanner, urlImagenBanner, subCategoriaId, subtituloBanner });
    res.status(201).json(newBanner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const { tituloBanner, subtituloBanner, urlImagenBanner, subCategoriaId } = req.body;
    
    if (!tituloBanner || !urlImagenBanner || !subtituloBanner ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const [updatedRows] = await Banner.update(
      { tituloBanner, subtituloBanner,urlImagenBanner, subCategoriaId },
      { where: { id } }
    );

    if (updatedRows > 0) {
      const updatedBanner = await Banner.findOne({ where: { id } });
      res.status(200).json({ message: "Banner updated successfully", banner: updatedBanner });
    } else {
      res.status(404).json({ message: "Banner not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteBannerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el banner por su clave primaria
    const banner = await Banner.findByPk(id);
    if (banner) {
      // Realiza la eliminación suave
      await banner.destroy();
      res.status(200).json({ message: "Banner deleted successfully", banner });
    } else {
      res.status(404).json({ message: "Banner not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const recoverBannerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Encuentra el banner eliminado utilizando la opción 'paranoid'
    const banner = await Banner.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });

    if (!banner) {
      return res.status(404).json({ message: "Banner not found or already active" });
    }

    // Restaura el banner eliminado
    await banner.restore();

    res.status(200).json({ message: "Banner recovered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBanners,
  getBannerById,
  deleteBannerById,
  createBanner,
  updateBannerById,
  recoverBannerById
};
