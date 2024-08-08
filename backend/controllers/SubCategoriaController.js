const SeccionDesplegables = require("../models/SeccionDesplegableModel");
const SectionText = require("../models/SectionTextModel");
const Banner = require("../models/Banner")
const BannerHero = require("../models/BannerHero")
const Footer = require("../models/footer")
const SeccionGeneral = require('../models/SeccionGeneral')
const SubCategoria = require("../models/SubCategoriaModel")
const SeccionTecnologia = require('../models/SeccionTecnologia')
const SeccionMetodologia = require('../models/SeccionMetodologia')
const SeccionCard = require('../models/SeccionCard')
const Card = require('../models/CardModel')
const Item = require('../models/Item')
const Tecnologia = require('../models/Tecnologia')
const Metodologia = require('../models/Metodologia')
const Team = require('../models/team/team')

const getItem = async (req, res) => {
    const id = req.params.id
    try {
        const subCategoria = await SubCategoria.findByPk(id, {
            include:[
                {
                    model: SeccionGeneral
                },
                {
                    model: SeccionTecnologia
                },
                {
                    model: SeccionMetodologia
                },
                {
                    model: Banner,
                },
                {
                    model: BannerHero
                },
                {
                    model: SeccionDesplegables
                },
                {
                    model: SectionText
                },
                {
                    model: Team
                }
            ]
        }); // Buscar la categoría por ID
        if (SubCategoria) {
            res.status(200).json(subCategoria); // Enviar la categoría encontrada como respuesta
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
        const SubCategorias = await SubCategoria.findAll({ paranoid: false }); // Obtener todas las categorías
        res.status(200).json(SubCategorias); // Enviar todas las categorías como respuesta
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ error: 'Error interno del servidor' }); // Manejar errores del servidor
    }
}

const createItem = async (req, res) => {
    try {
        const { nombreSubCategoria, categoriaId } = req.body;
        const data = await SubCategoria.create({ nombreSubCategoria, categoriaId });
        res.send({ data });
      } catch (error) {
        console.error('Error al crear una SubCategoria:', e);
        res.status(500).json({ error: 'Error al crear una SubCategoria' }); // Manejar errores del servidor
      }
}

const updateItem = async (req, res) => {
    const id = req.params.id; // Obtener el id de los parámetros de la ruta
    const { nombreSubCategoria, categoriaId } = req.body; // Obtener los datos a actualizar

    try {
        const subCategoria = await SubCategoria.findByPk(id); // Buscar la subCategoria por id
        if (subCategoria) {
            // Actualizar los campos de la subCategoria
            subCategoria.nombreSubCategoria = nombreSubCategoria || subCategoria.nombreSubCategoria;
            subCategoria.categoriaId = categoriaId || subCategoria.categoriaId
            
            await subCategoria.save(); // Guardar los cambios
            res.status(200).json({ message: 'subCategoria actualizada correctamente', data: subCategoria });
        } else {
            res.status(404).json({ error: 'subCategoria no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la subCategoria:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Buscar el subCategoria por su clave primaria
        const subCategoria = await SubCategoria.findByPk(id);
        if (subCategoria) {
          // Realiza la eliminación suave
          await subCategoria.destroy();
          res.status(200).json({ message: "SubCategoria deleted successfully", subCategoria });
        } else {
          res.status(404).json({ message: "SubCategoria not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    
    
    const recoverSubCategoriaById = async (req, res) => {
      try {
        const { id } = req.params;
    
        // Encuentra el subCategoria eliminado utilizando la opción 'paranoid'
        const subCategoria = await SubCategoria.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });
    
        if (!subCategoria) {
          return res.status(404).json({ message: "SubCategoria not found or already active" });
        }
    
        // Restaura el banner eliminado
        await subCategoria.restore();
    
        res.status(200).json({ message: "SubCategoria recovered successfully" });
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
    recoverSubCategoriaById
}