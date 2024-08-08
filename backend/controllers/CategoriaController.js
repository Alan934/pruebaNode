const Categoria = require("../models/CategoriaModel");
const Formulario = require('../models/FormularioModel');
const { Sequelize } = require('sequelize');

const getItem = async (req, res) => {
    const id = req.params.id
    try {
        const categoria = await Categoria.findByPk(id, {
            include: [{
                model: Formulario
            }]
        }); // Buscar la categoría por ID
        if (categoria) {
            res.status(200).json(categoria); // Enviar la categoría encontrada como respuesta
        } else {
            res.status(404).json({ error: 'Categoría no encontrada' }); // Manejar el caso de categoría no encontrada
        }
    } catch (error) {
        console.error('Error al buscar la categoría:', error);
        res.status(500).json({ error: 'Error interno del servidor' }); // Manejar errores del servidor
    }
}
const getItems = async (req, res) => {
    try {
        const categorias = await Categoria.findAll({ paranoid: false }); // Obtener todas las categorías
        res.status(200).json(categorias); // Enviar todas las categorías como respuesta
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ error: 'Error interno del servidor' }); // Manejar errores del servidor
    }
}

const createItem = async (req, res) =>{
    try {
        const { nombreCategoria, vistaId } = req.body;
        const data = await Categoria.create({ nombreCategoria, vistaId });
        res.send({ data });
      } catch (e) {
        console.error('Error al crear una categoria:', e);
        res.status(500).json({ error: 'Error al crear una categoria' }); // Manejar errores del servidor
      }
}

const updateItem = async (req, res) =>{
    const id = req.params.id; // Obtener el id de los parámetros de la ruta
    const { nombreCategoria, vistaId } = req.body; // Obtener los datos a actualizar

    try {
        const categoria = await Categoria.findByPk(id); // Buscar la categoria por id
        if (categoria) {
            // Actualizar los campos de la Card
            categoria.nombreCategoria = nombreCategoria || categoria.nombreCategoria;
            categoria.vistaId = vistaId || categoria.vistaId;
            
            await categoria.save(); // Guardar los cambios
            res.status(200).json({ message: 'categoria actualizada correctamente', data: categoria });
        } else {
            res.status(404).json({ error: 'categoria no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la categoria:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el categoria por su clave primaria
    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      // Realiza la eliminación suave
      await categoria.destroy();
      res.status(200).json({ message: "Categoria deleted successfully", categoria });
    } else {
      res.status(404).json({ message: "Categoria not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  const recoverCategoriaById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Encuentra el banner eliminado utilizando la opción 'paranoid'
      const categoria = await Categoria.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });
  
      if (!categoria) {
        return res.status(404).json({ message: "Categoria not found or already active" });
      }
  
      // Restaura el banner eliminado
      await categoria.restore();
  
      res.status(200).json({ message: "Categoria recovered successfully" });
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
    recoverCategoriaById
}
