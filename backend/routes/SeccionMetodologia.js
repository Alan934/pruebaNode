const express = require("express");
const router = express.Router();
const {getItem, getItems, createItem, updateItem, deleteItem,recoverSeccionMetodologiaById} = require('../controllers/SeccionMetodologia')
const {authMiddleware} = require('../middleware/session')
const checkRol = require("../middleware/rol")

/**
 * @swagger
 * tags:
 *   name: SeccionMetodologia
 *   description: Operaciones de SeccionMetodologia
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SeccionMetodologia:
 *       type: object
 *       required:
 *         - tituloSeccionMetodologia
 *         - subTituloSeccionMetodologia
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la sección de metodología
 *         tituloSeccionMetodologia:
 *           type: string
 *           description: Título de la sección de metodología
 *         subTituloSeccionMetodologia:
 *           type: string
 *           description: Subtítulo de la sección de metodología
 *         subCategoriaId:
 *           type: integer
 *           description: ID de la subcategoría asociada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave de la sección de metodología
 */
/**
 * @swagger
 * /api/seccionmetodologia:
 *   get:
 *     summary: Obtiene todas las secciones de metodología
 *     tags: [SeccionMetodologia]
 *     responses:
 *       200:
 *         description: Lista de secciones de metodología
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SeccionMetodologia'
 */
router.get("/", getItems);

/**
 * @swagger
 * /api/seccionmetodologia/{id}:
 *   get:
 *     summary: Obtiene una sección de metodología por ID
 *     tags: [SeccionMetodologia]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sección de metodología
 *     responses:
 *       200:
 *         description: Sección de metodología encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionMetodologia'
 *       404:
 *         description: Sección de metodología no encontrada
 */
router.get("/:id", getItem);

/**
 * @swagger
 * /api/seccionmetodologia:
 *   post:
 *     summary: Crea una nueva sección de metodología
 *     tags: [SeccionMetodologia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SeccionMetodologia'
 *     responses:
 *       201:
 *         description: Sección de metodología creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionMetodologia'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authMiddleware, checkRol(["admin"]), createItem);

/**
 * @swagger
 * /api/seccionmetodologia/{id}:
 *   put:
 *     summary: Actualiza una sección de metodología por ID
 *     tags: [SeccionMetodologia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sección de metodología
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SeccionMetodologia'
 *     responses:
 *       200:
 *         description: Sección de metodología actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionMetodologia'
 *       404:
 *         description: Sección de metodología no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateItem);

/**
 * @swagger
 * /api/seccionmetodologia/{id}:
 *   delete:
 *     summary: Elimina una sección de metodología por ID
 *     tags: [SeccionMetodologia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sección de metodología
 *     responses:
 *       200:
 *         description: Sección de metodología eliminada exitosamente
 *       404:
 *         description: Sección de metodología no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteItem);

/**
 * @swagger
 * /api/seccionmetodologia/recover/{id}:
 *   patch:
 *     summary: Recupera una sección de metodología eliminada por ID
 *     tags: [SeccionMetodologia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sección de metodología
 *     responses:
 *       200:
 *         description: Sección de metodología recuperada exitosamente
 *       404:
 *         description: Sección de metodología no encontrada o ya activa
 *       500:
 *         description: Error en el servidor
 */
router.patch("/recover/:id", authMiddleware, checkRol(["admin"]), recoverSeccionMetodologiaById);

module.exports = router;