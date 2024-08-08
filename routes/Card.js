const express = require("express")
const router = express.Router()
const {authMiddleware} = require('../middleware/session')
const checkRol = require("../middleware/rol")
const {getItem, getItems, createItem, updateItem, deleteItem,recoverCardById} = require('../controllers/CardController')

/**
 * @swagger
 * tags:
 *   name: Card
 *   description: Operaciones sobre las cards
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       required:
 *         - nombreCard
 *         - urlImagenCard
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la card
 *         nombreCard:
 *           type: string
 *           description: Nombre de la card
 *         urlImagenCard:
 *           type: string
 *           description: URL de la imagen de la card
 *         seccionCardId:
 *           type: integer
 *           description: ID de la sección de la card
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave de la card
 */
/**
 * @swagger
 * /api/card:
 *   get:
 *     summary: Obtiene todas las cards
 *     tags: [Card]
 *     responses:
 *       200:
 *         description: Lista de cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 */
router.get("/", getItems);

/**
 * @swagger
 * /api/card/{id}:
 *   get:
 *     summary: Obtiene una card por ID
 *     tags: [Card]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la card
 *     responses:
 *       200:
 *         description: Card encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       404:
 *         description: Card no encontrada
 */
router.get("/:id", getItem);

/**
 * @swagger
 * /api/card:
 *   post:
 *     summary: Crea una nueva card
 *     tags: [Card]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       201:
 *         description: Card creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authMiddleware, checkRol(["admin"]), createItem);

/**
 * @swagger
 * /api/card/{id}:
 *   put:
 *     summary: Actualiza una card por ID
 *     tags: [Card]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la card
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       200:
 *         description: Card actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       404:
 *         description: Card no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateItem);

/**
 * @swagger
 * /api/card/{id}:
 *   delete:
 *     summary: Elimina una card por ID
 *     tags: [Card]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la card
 *     responses:
 *       200:
 *         description: Card eliminada exitosamente
 *       404:
 *         description: Card no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteItem);

/**
 * @swagger
 * /api/card/recover/{id}:
 *   patch:
 *     summary: Recupera una card eliminada por ID
 *     tags: [Card]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la card
 *     responses:
 *       200:
 *         description: Card recuperada exitosamente
 *       404:
 *         description: Card no encontrada o ya activa
 *       500:
 *         description: Error en el servidor
 */
router.patch('/recover/:id', authMiddleware, checkRol(["admin"]), recoverCardById);

module.exports = router;