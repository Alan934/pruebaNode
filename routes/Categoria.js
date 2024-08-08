const express = require("express")
const router = express.Router()
const {authMiddleware} = require('../middleware/session')
const checkRol = require("../middleware/rol")
const {getItem, getItems, createItem, updateItem, deleteItem,recoverCategoriaById} = require('../controllers/CategoriaController')

/**
 * @swagger
 * tags:
 *   name: Categoria
 *   description: Operaciones de categorias
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       required:
 *         - nombreCategoria
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la categoria
 *         nombreCategoria:
 *           type: string
 *           description: Nombre de la categoria
 *         vistaId:
 *           type: integer
 *           description: ID de la vista asociada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Marca de tiempo de eliminación suave
 */
/**
 * @swagger
 * /api/categoria:
 *   get:
 *     summary: Obtiene todas las categorias
 *     tags: [Categoria]
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 */
router.get("/", getItems);

/**
 * @swagger
 * /api/categoria/{id}:
 *   get:
 *     summary: Obtiene una categoria por ID
 *     tags: [Categoria]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoria
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Categoria no encontrada
 */
router.get("/:id", getItem);

/**
 * @swagger
 * /api/categoria:
 *   post:
 *     summary: Crea una nueva categoria
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       201:
 *         description: Categoria creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authMiddleware, checkRol(["admin"]), createItem);

/**
 * @swagger
 * /api/categoria/{id}:
 *   put:
 *     summary: Actualiza una categoria por ID
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       200:
 *         description: Categoria actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Categoria no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateItem);

/**
 * @swagger
 * /api/categoria/{id}:
 *   delete:
 *     summary: Elimina una categoria por ID
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoria
 *     responses:
 *       200:
 *         description: Categoria eliminada exitosamente
 *       404:
 *         description: Categoria no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteItem);

/**
 * @swagger
 * /api/categoria/recover/{id}:
 *   patch:
 *     summary: Recupera una categoria eliminada por ID
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoria
 *     responses:
 *       200:
 *         description: Categoria recuperada exitosamente
 *       404:
 *         description: Categoria no encontrada o ya activa
 *       500:
 *         description: Error en el servidor
 */
router.patch("/recover/:id", authMiddleware, checkRol(["admin"]), recoverCategoriaById);

module.exports = router;