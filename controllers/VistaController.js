const { Model } = require("sequelize");
const VistaModel = require("../models/VistaModel");
const Categoria = require("../models/CategoriaModel");
const SubCategoria = require("../models/SubCategoriaModel");
const { Sequelize } = require('sequelize');
const Footer = require('../models/footer');

const getItem = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const vista = await VistaModel.findByPk(id, {
            include: [
                {
                    model: Categoria, // Nombre del modelo Sequelize que deseas incluir
                    include: [SubCategoria] // Array de modelos secundarios que deseas incluir
                },
                {
                  model: Footer // Incluir los Footers asociados a esta vista
                }
            ]
        }); // Busca la vista por su ID
        if (vista) {
            res.status(200).json(vista); // Enviar la categoría encontrada como respuesta
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
        const vistas = await VistaModel.findAll({ paranoid: false }); // Obtener todas las categorías
        res.status(200).json(vistas); // Enviar todas las categorías como respuesta
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ error: 'Error interno del servidor' }); // Manejar errores del servidor
    }
}

const createItem = async (req, res) => {
    try {
        const { nombreVista, iconUrlVista } = req.body;
        const data = await VistaModel.create({ nombreVista, iconUrlVista});
        res.send({ data });
      } catch (e) {
        console.error('Error al crear una Vista:', e);
        res.status(500).json({ error: 'Error al crear una Vista' }); // Manejar errores del servidor
      }
}

const updateItem = async (req, res) => {
    const id = req.params.id; // Obtener el id de los parámetros de la ruta
    const { nombreVista, iconUrlVista } = req.body; // Obtener los datos a actualizar

    try {
        const vista = await VistaModel.findByPk(id); // Buscar la vista por id
        if (vista) {
            // Actualizar los campos de la vista
            vista.nombreVista = nombreVista || vista.nombreVista;
            vista.iconUrlVista = iconUrlVista || vista.iconUrlVista
            
            await vista.save(); // Guardar los cambios
            res.status(200).json({ message: 'Vista actualizada correctamente', data: vista });
        } else {
            res.status(404).json({ error: 'Vista no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la Vista:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const daleteItem = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Buscar el banner por su clave primaria
        const vista = await VistaModel.findByPk(id);
        if (vista) {
          // Realiza la eliminación suave
          await vista.destroy();
          res.status(200).json({ message: "Vista deleted successfully", vista });
        } else {
          res.status(404).json({ message: "Vista not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    
    
    const recoverVistaById = async (req, res) => {
      try {
        const { id } = req.params;
    
        // Encuentra el vista eliminado utilizando la opción 'paranoid'
        const vista = await VistaModel.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });
    
        if (!vista) {
          return res.status(404).json({ message: "Banner not found or already active" });
        }
    
        // Restaura el vista eliminado
        await vista.restore();
    
        res.status(200).json({ message: "Banner recovered successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    const addFooterToVista = async (req, res) => {
        const { vistaId, footerId } = req.body;
      
        try {
          // Buscar la Vista y el Footer por sus IDs
          const vista = await VistaModel.findByPk(vistaId);
          const footer = await Footer.findByPk(footerId);
      
          if (!vista || !footer) {
            return res.status(404).json({ message: 'Vista o Footer no encontrado' });
          }
      
          // Agregar el Footer a la Vista
          await vista.addFooter(footer);
      
          res.status(200).json({ message: 'Footer agregado a la Vista exitosamente' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error al agregar Footer a la Vista' });
        }
    };

    const removeFooterFromVista = async (req, res) => {
        const { vistaId, footerId } = req.body;
      
        try {
          // Buscar la Vista y el Footer por sus IDs
          const vista = await VistaModel.findByPk(vistaId);
          const footer = await Footer.findByPk(footerId);
      
          if (!vista || !footer) {
            return res.status(404).json({ message: 'Vista o Footer no encontrado' });
          }
      
          // Eliminar el Footer de la Vista
          await vista.removeFooter(footer);
      
          res.status(200).json({ message: 'Footer eliminado de la Vista exitosamente' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error al eliminar Footer de la Vista' });
        }
    };
    

module.exports = {
    getItem,
    getItems,
    createItem,
    updateItem,
    daleteItem,
    recoverVistaById,
    addFooterToVista,
    removeFooterFromVista
}