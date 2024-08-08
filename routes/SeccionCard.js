const express = require("express");
const router = express.Router();

const {getItem, getItems, createItem, updateItem, deleteItem,recoverSeccionCardById} = require('../controllers/SeccionCardController')
const {authMiddleware} = require('../middleware/session')
const checkRol = require("../middleware/rol")

/**
 * @swagger
 * tags:
 *   name: SeccionCard
 *   description: Operaciones para SeccionCard
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SeccionCard:
 *       type: object
 *       required:
 *         - tituloSeccionCard
 *         - subTituloSeccionCard
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la Sección Card
 *         tituloSeccionCard:
 *           type: string
 *           description: Título de la sección card
 *         subTituloSeccionCard:
 *           type: string
 *           description: Subtítulo de la sección card
 *         seccionGeneralId:
 *           type: integer
 *           description: ID de la sección general asociada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave de la sección card
 */
/**
 * @swagger
 * /api/SeccionCard/{id}:
 *   get:
 *     summary: Obtiene una sección card por ID
 *     tags: [SeccionCard]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sección card
 *     responses:
 *       200:
 *         description: Sección card encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionCard'
 *       404:
 *         description: Sección card no encontrada
 */
router.get("/:id", getItem);

/**
 * @swagger
 * /api/SeccionCard:
 *   get:
 *     summary: Obtiene todas las secciones card
 *     tags: [SeccionCard]
 *     responses:
 *       200:
 *         description: Lista de secciones card
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SeccionCard'
 */
router.get("/", getItems);

/**
 * @swagger
 * /api/SeccionCard:
 *   post:
 *     summary: Crea una nueva sección card
 *     tags: [SeccionCard]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SeccionCard'
 *     responses:
 *       201:
 *         description: Sección card creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionCard'
 *       500:
 *         description: Error al crear la sección card
 */
router.post("/", authMiddleware, checkRol(["admin"]), createItem);

/**
 * @swagger
 * /api/SeccionCard/{id}:
 *   put:
 *     summary: Actualiza una sección card por ID
 *     tags: [SeccionCard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sección card
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SeccionCard'
 *     responses:
 *       200:
 *         description: Sección card actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionCard'
 *       404:
 *         description: Sección card no encontrada
 *       500:
 *         description: Error al actualizar la sección card
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateItem);

/**
 * @swagger
 * /api/SeccionCard/{id}:
 *   delete:
 *     summary: Elimina una sección card por ID
 *     tags: [SeccionCard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sección card
 *     responses:
 *       200:
 *         description: Sección card eliminada exitosamente
 *       404:
 *         description: Sección card no encontrada
 *       500:
 *         description: Error al eliminar la sección card
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteItem);
/**
 * @swagger
 * /api/SeccionCard/recover/{id}:
 *   patch:
 *     summary: Recupera una SeccionCard eliminada por ID
 *     tags: [SeccionCard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la SeccionCard
 *     responses:
 *       200:
 *         description: SeccionCard recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionCard'
 *       404:
 *         description: SeccionCard no encontrada o ya activa
 *       500:
 *         description: Error en el servidor
 */
router.patch("/recover/:id", authMiddleware, checkRol(["admin"]), recoverSeccionCardById);

module.exports = router;