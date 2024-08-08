const SeccionDesplegable = require('../models/SeccionDesplegableModel');
const { Sequelize } = require('sequelize');
const { handleHttpError } = require('../utils/handleError');
const Item = require('../models/Item');
const Desplegable = require('../models/Desplegable');
const filterNullFields = require('../utils/filterNullValues');

const getAllSeccionDesplegable = async (req, res) => {
    try {
        const data = await SeccionDesplegable.findAll({ paranoid: false });
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ALL_SECCION_DESPLEGABLE');
    }
}

const getOneSeccionDesplegable = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await SeccionDesplegable.findByPk(id, {

            include: [{
                model: Desplegable,
                include: [{
                    model: Item,
                    as: 'items',
                }]

            }]
        });

        if (data) {
            // Filtrar campos nulos en el objeto principal
            const filteredData = filterNullFields(data.toJSON());
            // Filtrar campos nulos en 'desplegables' y sus 'items'
            filteredData.desplegables = filteredData.desplegables.map(desplegableFilter => {
                const filteredDesplegable = filterNullFields(desplegableFilter);
                if (Array.isArray(filteredDesplegable.items)) {
                    filteredDesplegable.items = filteredDesplegable.items.map(filterNullFields);
                } else {
                    filteredDesplegable.items = [];
                }
                return filteredDesplegable;
            });
            res.send({ data: filteredData });
        } else {
            handleHttpError(res, 'ERROR_GET_ONE_SECCION_DESPLEGABLE_NOT_FOUND');
        }
    } catch (error) {
        console.error('Error al obtener la seccion desplegable:', error);
        handleHttpError(res, 'ERROR_GET_ONE_SECCION_DESPLEGABLE');
    }
};

const createSeccionDesplegable = async (req, res) => {
    try {
        const { nombreSeccionDesplegable, subCategoriaId } = req.body;
        const data = await SeccionDesplegable.create({ nombreSeccionDesplegable, subCategoriaId });
        if (data) {
            res.status(200).json(data);
        } else {
            handleHttpError(res, 'ERROR_CREATE_SECCION_DESPLEGABLE_NOT_FOUND');
        }
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR_CREATE_SECCION_DESPLEGABLE');
    }
}

const updateSeccionDesplegable = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombreSeccionDesplegable, subCategoriaId } = req.body;
        const data = await SeccionDesplegable.findByPk(id);
        if (data) {
            data.nombreSeccionDesplegable = nombreSeccionDesplegable || data.nombreSeccionDesplegable;
            data.subCategoriaId = subCategoriaId || data.subCategoriaId;
            const updateData = await data.save();
            res.status(200).json({ message: 'Seccion Desplegable actualizado correctamente', updateData });
        } else {
            handleHttpError(res, 'ERROR_UPDATE_SECCION_DESPLEGABLE_NOT_FOUND');
        }
    } catch (error) {
        handleHttpError(res, 'ERROR_UPDATE_SECCION_DESPLEGABLE');
    }
}

const deleteSeccionDesplegable = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await SeccionDesplegable.findByPk(id);
        if (data) {
            const deleteData = await data.destroy();
            res.send({ data: deleteData });
        } else {
            handleHttpError(res, 'ERROR_DELETE_SECCION_DESPLEGABLE_NOT_FOUND');
        }
    } catch (error) {
        handleHttpError(res, 'ERROR_DELETE_SECCION_DESPLEGABLE');
    }
}

const recoverDesplegableById = async (req, res) => {
    try {
        const {id} = req.params.id;
        const data = await SeccionDesplegable.findOne(id, {
            where: {
                id, deletedAt: { [Sequelize.Op.ne]: null }
            }, paranoid: false
        });
        if (!data) {
            return res.status(404).json({ message: 'Seccion Desplegable not found or already active' });
        }
        await data.restore();
        res.status(200).json({ message: 'Seccion Desplegable recovered successfully' });
    } catch (error) {
        handleHttpError(res, 'ERROR_RECOVER_SECCION_DESPLEGABLE');
    }
}

module.exports = { getAllSeccionDesplegable, getOneSeccionDesplegable, createSeccionDesplegable, updateSeccionDesplegable, deleteSeccionDesplegable, recoverDesplegableById };