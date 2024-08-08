const Item = require('../models/Item');
const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/config');
const filterNullFields = require('../utils/filterNullValues');

const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll({ paranoid: false });
    // Filtrar los campos nulos de los Items
    const filteredItems = items.map(filterNullFields);
    res.status(200).json(filteredItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getItemById = async (req, res) => {
  try {
    const { id } = req.params; 
    const item = await Item.findByPk(id);
    if (item) {
      // Filtrar los campos nulos del objeto Item
      const filteredItem = filterNullFields(item);
      res.status(200).json(filteredItem);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createItem = async (req, res) => {
  try {
    const { subtituloItem, tituloItem, urlIconItem, id_banner, id_desplegable, id_metodologia, id_card, id_footer, id_categoriaFooter, id_bannerHero } = req.body;
    const newItem = await Item.create({
      subtituloItem,
      tituloItem,
      urlIconItem,
      id_banner,
      id_desplegable,
      id_metodologia,
      id_card,
      id_footer,
      id_categoriaFooter,
      id_bannerHero
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const { subtituloItem, tituloItem, urlIconItem, id_banner, id_desplegable, id_metodologia,id_card, id_footer, id_categoriaFooter, id_bannerHero }  = req.body;

    if (!subtituloItem || !tituloItem || !urlIconItem) {
       return res.status(400).json({ message: "Missing required fields" });
     }

    const [updatedRows] = await Item.update(
      { subtituloItem, tituloItem, urlIconItem, id_banner, id_desplegable, id_metodologia,id_card,id_footer, id_categoriaFooter, id_bannerHero },
      { where: { id } }
    );

    if (updatedRows > 0) {
      const updatedItem = await Item.findOne({ where: { id } });
      res.status(200).json({ message: "Item updated successfully", item: updatedItem });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteItemById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el item por su clave primaria
    const item = await Item.findByPk(id);
    if (item) {
      // Realiza la eliminación suave
      await item.destroy();
      res.status(200).json({ message: "Item deleted successfully", item });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const recoverItemById  = async (req, res) => {
  try {
    const { id } = req.params;

    // Encuentra el item eliminado utilizando la opción 'paranoid'
    const item = await Item.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });

    if (!item) {
      return res.status(404).json({ message: "Item not found or already active" });
    }

    // Restaura el item eliminado
    await item.restore();

    res.status(200).json({ message: "Item recovered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  deleteItemById,
  updateItemById,
  recoverItemById
};
