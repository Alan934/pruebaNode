const express = require("express");
const router = express.Router();
const { getItem, getItems, createItem, updateItem, daleteItem, recoverVistaById, addFooterToVista, removeFooterFromVista } = require('../controllers/VistaController');
const { authMiddleware } = require('../middleware/session');
const checkRol = require("../middleware/rol");

/**
 * @swagger
 * tags:
 *   name: Vista
 *   description: Operaciones de vistas
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Vista:
 *       type: object
 *       required:
 *         - nombreVista
 *         - iconUrlVista
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la vista
 *         nombreVista:
 *           type: string
 *           description: Nombre de la vista
 *         iconUrlVista:
 *           type: string
 *           description: URL del ícono de la vista
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave del vista
 */
/**
 * @swagger
 * /api/vista:
 *   get:
 *     summary: Obtiene todas las vistas
 *     tags: [Vista]
 *     responses:
 *       200:
 *         description: Lista de vistas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vista'
 */
router.get("/", getItems);

/**
 * @swagger
 * /api/vista/{id}:
 *   get:
 *     summary: Obtiene una vista por ID
 *     tags: [Vista]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la vista
 *     responses:
 *       200:
 *         description: Vista encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vista'
 *       404:
 *         description: Vista no encontrada
 */
router.get("/:id", getItem);

/**
 * @swagger
 * /api/vista:
 *   post:
 *     summary: Crea una nueva vista
 *     tags: [Vista]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vista'
 *     responses:
 *       201:
 *         description: Vista creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vista'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authMiddleware, checkRol(["admin"]), createItem);

/**
 * @swagger
 * /api/vista/{id}:
 *   put:
 *     summary: Actualiza una vista por ID
 *     tags: [Vista]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la vista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vista'
 *     responses:
 *       200:
 *         description: Vista actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vista'
 *       404:
 *         description: Vista no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateItem);

/**
 * @swagger
 * /api/vista/{id}:
 *   delete:
 *     summary: Elimina una vista por ID
 *     tags: [Vista]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la vista
 *     responses:
 *       200:
 *         description: Vista eliminada exitosamente
 *       404:
 *         description: Vista no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), daleteItem);

/**
 * @swagger
 * /api/vista/recover/{id}:
 *   patch:
 *     summary: Recupera una vista eliminada por ID
 *     tags: [Vista]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la vista
 *     responses:
 *       200:
 *         description: Vista recuperada exitosamente
 *       404:
 *         description: Vista no encontrada o ya activa
 *       500:
 *         description: Error en el servidor
 */
router.patch("/recover/:id", authMiddleware, checkRol(["admin"]), recoverVistaById);

/**
 * @swagger
 * /api/vista/addFooter:
 *   post:
 *     summary: Agrega un footer a una vista
 *     tags: [Vista]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vistaId:
 *                 type: integer
 *               footerId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Footer agregado a la vista exitosamente
 *       404:
 *         description: Vista o Footer no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.post('/addFooter', authMiddleware, checkRol(["admin"]), addFooterToVista);

/**
 * @swagger
 * /api/vista/removeFooter:
 *   post:
 *     summary: Elimina un footer de una vista
 *     tags: [Vista]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vistaId:
 *                 type: integer
 *               footerId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Footer eliminado de la vista exitosamente
 *       404:
 *         description: Vista o Footer no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.post('/removeFooter', authMiddleware, checkRol(["admin"]), removeFooterFromVista);

module.exports = router;
