const SectionText = require('../models/SectionTextModel');
const { handleHttpError } = require('../utils/handleError');
const Item = require('../models/Item');
const { Sequelize } = require('sequelize');
const filterNullFields = require('../utils/filterNullValues');

const getAllSectionText = async (req, res) => {
    try {
        const data = await SectionText.findAll({ paranoid: false });
        res.send({ data });
    } catch (e) {
        handleHttpError(res, 'ERROR_GET_ITEM');
    }
};

const getOneSectionText = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await SectionText.findByPk(id, {
        include: [{
          model: Item,
          as: 'items',
        }],
      });
    if (data) { 
        // Filtrar los campos nulos del objeto SectionText
        const filteredData = filterNullFields(data);
        // Filtrar los campos nulos de los Items asociados
        filteredData.items = data.items.map(filterNullFields);
        res.send({ data: filteredData });
    } else {
      handleHttpError(res, 'ERROR_GET_ONE_SECTION_TEXT_NOT_FOUND');
    }
    } catch (error) {
      console.error(error);
      handleHttpError(res, 'ERROR_GET_ITEM');
    }
};

const createSectionText = async (req, res) => {
    try {
        const { titleSectionText, subtitleSectionText, subCategoriaId } = req.body;
        const data = await SectionText.create({ titleSectionText, subtitleSectionText, subCategoriaId });
        if (data) {
            res.status(200).json(data);
        } else {
            handleHttpError(res, 'ERROR_CREATE_SECTION_TEXT_NOT_FOUND');
        }
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR_CREATE_SECTION_TEXT');
    }
};

const updateSectionText = async (req, res) => {
    try {
        const {id} = req.params;
        const { titleSectionText, subtitleSectionText, subCategoriaId } = req.body;
        const data = await SectionText.findByPk(id);
        if (data) {
            data.titleSectionText = titleSectionText || data.titleSectionText;
            data.subtitleSectionText = subtitleSectionText || data.subtitleSectionText;
            data.subCategoriaId = subCategoriaId || data.subCategoriaId
            const updateData = await data.save();
            res.send({ data: updateData });
        } else {
            handleHttpError(res, 'ERROR_UPDATE_SECTION_TEXT_NOT_FOUND');
        }
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'ERROR_UPDATE_SECTION_TEXT');
    }
};

const deleteSectionText = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await SectionText.findByPk(id);
        if (data) {
            const deleteData = await data.destroy();
            res.send({ data: deleteData });
        } else {
            handleHttpError(res, 'ERROR_DELETE_SECTION_TEXT_NOT_FOUND');
        }
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR_DELETE_SECTION_TEXT');
    }
};

const recoverSectionControllerById = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await SectionText.findOne({ where: { id,
                deletedAt: { [Sequelize.Op.ne]: null 
            }}, paranoid: false
        });
        if (!data) {
            return res.status(404).json({ message: 'SectionText not found or already active' });
        }
        await data.restore();
        res.status(200).json({ message: 'SectionText recovered successfully' });

    } catch (error) {
        console.error(error);
        handleHttpError(res, 'ERROR_RECOVER_SECTION_TEXT');
    }
};

module.exports = { getAllSectionText, getOneSectionText, createSectionText, updateSectionText, deleteSectionText, recoverSectionControllerById };