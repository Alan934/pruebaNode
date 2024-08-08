const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../middleware/session');
const checkRol = require("../middleware/rol");
const { getAllSectionText, getOneSectionText, createSectionText, updateSectionText, deleteSectionText, recoverSectionControllerById } = require("../controllers/SectionTextController");

/**
 * @swagger
 * tags:
 *   name: SectionText
 *   description: Operaciones con textos de secciones
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SectionText:
 *       type: object
 *       required:
 *         - subtitleSectionText
 *         - titleSectionText
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del texto de la sección
 *         subtitleSectionText:
 *           type: string
 *           description: Subtítulo del texto de la sección
 *         titleSectionText:
 *           type: string
 *           description: Título del texto de la sección
 *         subCategoriaId:
 *           type: integer
 *           description: ID de la subcategoría relacionada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave del texto de la sección
 */
/**
 * @swagger
 * /api/SectionText:
 *   get:
 *     summary: Obtiene todos los textos de secciones
 *     tags: [SectionText]
 *     responses:
 *       200:
 *         description: Lista de textos de secciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SectionText'
 */
router.get('/', getAllSectionText);

/**
 * @swagger
 * /api/SectionText/{id}:
 *   get:
 *     summary: Obtiene un texto de sección por ID
 *     tags: [SectionText]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del texto de la sección
 *     responses:
 *       200:
 *         description: Texto de sección encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SectionText'
 *       404:
 *         description: Texto de sección no encontrado
 */
router.get('/:id', getOneSectionText);

/**
 * @swagger
 * /api/SectionText:
 *   post:
 *     summary: Crea un nuevo texto de sección
 *     tags: [SectionText]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SectionText'
 *     responses:
 *       201:
 *         description: Texto de sección creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SectionText'
 *       500:
 *         description: Error en el servidor
 */
router.post('/', authMiddleware, checkRol(["admin"]), createSectionText);

/**
 * @swagger
 * /api/SectionText/{id}:
 *   put:
 *     summary: Actualiza un texto de sección por ID
 *     tags: [SectionText]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del texto de la sección
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SectionText'
 *     responses:
 *       200:
 *         description: Texto de sección actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SectionText'
 *       404:
 *         description: Texto de sección no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', authMiddleware, checkRol(["admin"]), updateSectionText);

/**
 * @swagger
 * /api/SectionText/{id}:
 *   delete:
 *     summary: Elimina un texto de sección por ID
 *     tags: [SectionText]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del texto de la sección
 *     responses:
 *       200:
 *         description: Texto de sección eliminado exitosamente
 *       404:
 *         description: Texto de sección no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', authMiddleware, checkRol(["admin"]), deleteSectionText);

/**
 * @swagger
 * /api/SectionText/recover/{id}:
 *   patch:
 *     summary: Recupera un texto de sección eliminado por ID
 *     tags: [SectionText]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del texto de la sección
 *     responses:
 *       200:
 *         description: Texto de sección recuperado exitosamente
 *       404:
 *         description: Texto de sección no encontrado o ya activo
 *       500:
 *         description: Error en el servidor
 */
router.patch('/recover/:id', authMiddleware, checkRol(["admin"]), recoverSectionControllerById);

module.exports = router;