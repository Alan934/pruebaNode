const express = require("express");
const router = express.Router();
const {getItem, getItems, createItem, updateItem, deleteItem,recoverSeccionTecnologiaById} = require('../controllers/SeccionTecnologia')
const {authMiddleware} = require('../middleware/session')
const checkRol = require("../middleware/rol")

/**
 * @swagger
 * tags:
 *   name: SeccionTecnologia
 *   description: Operaciones de la sección de tecnología
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SeccionTecnologia:
 *       type: object
 *       required:
 *         - tituloSeccionTecnologia
 *         - subTituloSeccionTecnologia
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la sección de tecnología
 *         tituloSeccionTecnologia:
 *           type: string
 *           description: Título de la sección de tecnología
 *         subTituloSeccionTecnologia:
 *           type: string
 *           description: Subtítulo de la sección de tecnología (opcional)
 *         subCategoriaId:
 *           type: integer
 *           description: ID de la subcategoría
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave de la sección de tecnología
 */
/**
 * @swagger
 * /api/secciontecnologia/{id}:
 *   get:
 *     summary: Obtiene una sección de tecnología por ID
 *     tags: [SeccionTecnologia]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sección de tecnología
 *     responses:
 *       200:
 *         description: Sección de tecnología encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionTecnologia'
 *       404:
 *         description: Sección de tecnología no encontrada
 */
router.get("/:id", getItem);

/**
 * @swagger
 * /api/secciontecnologia:
 *   get:
 *     summary: Obtiene todas las secciones de tecnología
 *     tags: [SeccionTecnologia]
 *     responses:
 *       200:
 *         description: Lista de secciones de tecnología
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SeccionTecnologia'
 */
router.get("/", getItems);

/**
 * @swagger
 * /api/secciontecnologia:
 *   post:
 *     summary: Crea una nueva sección de tecnología
 *     tags: [SeccionTecnologia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SeccionTecnologia'
 *     responses:
 *       201:
 *         description: Sección de tecnología creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionTecnologia'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authMiddleware, checkRol(["admin"]), createItem);

/**
 * @swagger
 * /api/secciontecnologia/{id}:
 *   put:
 *     summary: Actualiza una sección de tecnología por ID
 *     tags: [SeccionTecnologia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sección de tecnología
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SeccionTecnologia'
 *     responses:
 *       200:
 *         description: Sección de tecnología actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionTecnologia'
 *       404:
 *         description: Sección de tecnología no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateItem);

/**
 * @swagger
 * /api/secciontecnologia/{id}:
 *   delete:
 *     summary: Elimina una sección de tecnología por ID
 *     tags: [SeccionTecnologia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sección de tecnología
 *     responses:
 *       200:
 *         description: Sección de tecnología eliminada exitosamente
 *       404:
 *         description: Sección de tecnología no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteItem);

/**
 * @swagger
 * /api/secciontecnologia/recover/{id}:
 *   patch:
 *     summary: Recupera una sección de tecnología eliminada por ID
 *     tags: [SeccionTecnologia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sección de tecnología
 *     responses:
 *       200:
 *         description: Sección de tecnología recuperada exitosamente
 *       404:
 *         description: Sección de tecnología no encontrada o ya activa
 *       500:
 *         description: Error en el servidor
 */
router.patch("/:id", authMiddleware, checkRol(["admin"]), recoverSeccionTecnologiaById);

module.exports = router;