const Footer = require('../models/footer');
const CategoriaFooter = require('../models/CategoriaFooter')
const { handleHttpError } = require('../utils/handleError');
const Item = require('../models/Item');
const { Sequelize } = require('sequelize');
const filterNullFields = require('../utils/filterNullValues');

const getFooters = async (req, res)=>{
    try {
        const footers = await Footer.findAll({ paranoid: false });
        res.json(footers);   
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_FOOTERS');
    }
};

const getFooter = async (req, res) => {
    try {
        const id = req.params.id;
        const footer = await Footer.findByPk(id, {
            include: [{
                model: CategoriaFooter,
                include: [{
                    model: Item,
                    as: 'items',
                }]
            }]
        });

        if (footer) {
            // Filtrar campos nulos en el objeto principal
            const filteredFooter = filterNullFields(footer.toJSON());
            // Filtrar campos nulos en 'categoriaFooters' y sus 'items'
            filteredFooter.categoriaFooters = filteredFooter.categoriaFooters.map(categoriaFilter => {
                const filteredCategoria = filterNullFields(categoriaFilter);
                if (Array.isArray(filteredCategoria.items)) {
                    filteredCategoria.items = filteredCategoria.items.map(filterNullFields);
                } else {
                    filteredCategoria.items = [];
                }
                return filteredCategoria;
            });

            res.status(200).json(filteredFooter);
        } else {
            handleHttpError(res, 'FOOTER_NOT_FOUND', 404);
        }
    } catch (error) {
        console.error('Error al obtener el footer:', error);
        handleHttpError(res, 'ERROR_GET_FOOTER');
    }
};

const createFooter = async (req, res) => {
    try {
        const { titleFooter, subCategoriaId } = req.body;
        const data = await Footer.create({ titleFooter, subCategoriaId });
        if (data) {
            res.send({ data });
        }else {
            handleHttpError(res, 'ERROR_CREATE_FOOTER');
        }
    } catch (error) {
        handleHttpError(res, 'ERROR_CREATE_FOOTER');
    }
}

const updateFooter = async (req, res) => {
    try {
        const id = req.params.id;
        const { titleFooter, subCategoriaId } = req.body;
        try {
            const dataFooter = await Footer.findByPk(id);
            if (dataFooter) {
                dataFooter.titleFooter = titleFooter || dataFooter.titleFooter;
                dataFooter.subCategoriaId = subCategoriaId || dataFooter.subCategoriaId;
                const updateDataFooter = await dataFooter.save();
                res.status(200).json({ message: 'Footer actualizado correctamente', updateFooter });
            }
        } catch (error) {
            handleHttpError(res, 'ERROR_UPDATE_FOOTER_NOT_FOUND');
        }
    } catch (error) {
        handleHttpError(res, 'ERROR_UPDATE_FOOTER');
    }
}

const deleteFooter = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Buscar el footer por su clave primaria
        const footer = await Footer.findByPk(id);
        if (footer) {
          // Realiza la eliminación suave
          await footer.destroy();
          res.status(200).json({ message: "Footer deleted successfully", footer });
        } else {
          res.status(404).json({ message: "Footer not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

const recoverFooterById = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Encuentra el footer eliminado utilizando la opción 'paranoid'
        const footer = await Footer.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });
    
        if (!footer) {
        return res.status(404).json({ message: "Footer not found or already active" });
        }
    
        // Restaura el banner eliminado
        await footer.restore();
    
        res.status(200).json({ message: "Footer recovered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {getFooter, getFooters, createFooter, updateFooter, deleteFooter,recoverFooterById};