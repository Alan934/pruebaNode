const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../middleware/session')
const checkRol = require("../middleware/rol")
const {getAllItems, getItemById, createItem,deleteItemById,updateItemById,recoverItemById} = require("../controllers/ItemController")

/**
 * @swagger
 * tags:
 *   name: Item
 *   description: Operaciones de items
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - subtituloItem
 *         - tituloItem
 *         - urlIconItem
 *       properties:
 *         subtituloItem:
 *           type: string
 *           description: Subtítulo del item
 *         tituloItem:
 *           type: string
 *           description: Título del item
 *         urlIconItem:
 *           type: string
 *           description: URL del ícono del item
 *         id_banner:
 *           type: integer
 *           description: ID del banner asociado 
 *         id_desplegable:
 *           type: integer
 *           description: ID del desplegable asociado 
 *         id_metodologia:
 *           type: integer
 *           description: ID de la metodología asociada 
 *         id_card:
 *           type: integer
 *           description: ID de la tarjeta asociada 
 *         id_footer:
 *           type: integer
 *           description: ID del footer asociado 
 *         id_sectionText:
 *           type: integer
 *           description: ID del texto de sección asociado 
 *         id_bannerHero:
 *           type: integer
 *           description: ID del texto de bannerHero asociado 
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación 
 */
/**
 * @swagger
 * /api/item:
 *   get:
 *     summary: Obtiene todos los items
 *     tags: [Item]
 *     responses:
 *       200:
 *         description: Lista de items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get("/", getAllItems);

/**
 * @swagger
 * /api/item/{id}:
 *   get:
 *     summary: Obtiene un item por ID
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del item
 *     responses:
 *       200:
 *         description: Item encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item no encontrado
 */
router.get("/:id", getItemById);

/**
 * @swagger
 * /api/item:
 *   post:
 *     summary: Crea un nuevo item
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authMiddleware, checkRol(["admin"]), createItem);

/**
 * @swagger
 * /api/item/{id}:
 *   put:
 *     summary: Actualiza un item por ID
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateItemById);

/**
 * @swagger
 * /api/item/{id}:
 *   delete:
 *     summary: Elimina un item por ID
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del item
 *     responses:
 *       200:
 *         description: Item eliminado exitosamente
 *       404:
 *         description: Item no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteItemById);

/**
 * @swagger
 * /api/item/recover/{id}:
 *   patch:
 *     summary: Recupera un item eliminado por ID
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del item
 *     responses:
 *       200:
 *         description: Item recuperado exitosamente
 *       404:
 *         description: Item no encontrado o ya activo
 *       500:
 *         description: Error en el servidor
 */
router.patch("/recover/:id", authMiddleware, checkRol(["admin"]), recoverItemById);

module.exports = router;