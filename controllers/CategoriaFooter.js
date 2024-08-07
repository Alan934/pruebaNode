const CategoriaFooter = require('../models/CategoriaFooter')
const { Sequelize } = require('sequelize');
const item = require('../models/Item')
const filterNullFields = require('../utils/filterNullValues');

const getItem = async (req, res) =>{
    const id = req.params.id
    try {
      const categoriaFooter = await CategoriaFooter.findByPk(id, {
          include:[{
              model:item
          }]
      });
      if (categoriaFooter) {
          // Filtrar los campos nulos del objeto CategoriaFooter
          const filteredData = filterNullFields(categoriaFooter);
          // Filtrar los campos nulos de los Items asociados
          filteredData.items = categoriaFooter.items.map(filterNullFields);
          res.status(200).json(filteredData);
      } else {
          res.status(404).json({ error: 'categoriaFooter no encontrada' });
      }
    } catch (error) {
        console.error('Error al buscar la categoriaFooter:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const getItems = async (req, res) =>{
    try {
        const categoriaFooter = await CategoriaFooter.findAll({ paranoid: false });
        res.status(200).json(categoriaFooter);
    } catch (error) {
        console.error('Error al obtener las categoriaFooter:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const createItem = async (req, res) =>{
    try {
        const { titleCategoriaFooter, id_footer } = req.body;
        const data = await CategoriaFooter.create({ titleCategoriaFooter, id_footer });
        res.send({ data });
      } catch (e) {
        console.error('Error al crear una categoriaFooter:', e);
        res.status(500).json({ error: 'Error al crear una categoriaFooter' });
      }
}

const updateItem = async (req, res) =>{
    const id = req.params.id;
    const { titleCategoriaFooter, id_footer } = req.body;

    try {
        const categoriaFooter = await CategoriaFooter.findByPk(id);
        if (categoriaFooter) {
            categoriaFooter.titleCategoriaFooter = titleCategoriaFooter || categoriaFooter.titleCategoriaFooter;
            categoriaFooter.id_footer = id_footer || categoriaFooter.id_footer;
            
            await categoriaFooter.save();
            res.status(200).json({ message: 'categoriaFooter actualizada correctamente', data: categoriaFooter });
        } else {
            res.status(404).json({ error: 'categoriaFooter no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la categoriaFooter:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
    
        const categoriaFooter = await CategoriaFooter.findByPk(id);
        if (categoriaFooter) {
          await categoriaFooter.destroy();
          res.status(200).json({ message: "categoriaFooter deleted successfully", categoriaFooter });
        } else {
          res.status(404).json({ message: "categoriaFooter not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const recoverCategoriaFooterById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Encuentra el categoriaFooter eliminado utilizando la opción 'paranoid'
      const categoriaFooter = await CategoriaFooter.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });
  
      if (!categoriaFooter) {
        return res.status(404).json({ message: "CategoriaFooter not found or already active" });
      }
  
      // Restaura el categoriaFooter eliminado
      await categoriaFooter.restore();
  
      res.status(200).json({ message: "CategoriaFooter recovered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { getItem, getItems, createItem, updateItem, deleteItem, recoverCategoriaFooterById }