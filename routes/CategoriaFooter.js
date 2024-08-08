const express = require("express")
const router = express.Router()
const {getItem, getItems, createItem, updateItem, deleteItem, recoverCategoriaFooterById} = require('../controllers/CategoriaFooter')
const {authMiddleware} = require('../middleware/session')
const checkRol = require("../middleware/rol")

/**
 * @swagger
 * tags:
 *   name: CategoriaFooter
 *   description: Operaciones de Categoría Footer
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     CategoriaFooter:
 *       type: object
 *       required:
 *         - titleCategoriaFooter
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la categoría del footer
 *         titleCategoriaFooter:
 *           type: string
 *           description: Título de la categoría del footer
 *         id_footer:
 *           type: integer
 *           description: ID del footer asociado
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave de la categoría del footer
 */
/**
 * @swagger
 * /api/categoriaFooter:
 *   get:
 *     summary: Obtiene todas las categorías de footer
 *     tags: [CategoriaFooter]
 *     responses:
 *       200:
 *         description: Lista de categorías de footer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoriaFooter'
 */
router.get("/", getItems);

/**
 * @swagger
 * /api/categoriaFooter/{id}:
 *   get:
 *     summary: Obtiene una categoría de footer por ID
 *     tags: [CategoriaFooter]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría de footer
 *     responses:
 *       200:
 *         description: Categoría de footer encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaFooter'
 *       404:
 *         description: Categoría de footer no encontrada
 */
router.get("/:id", getItem);

/**
 * @swagger
 * /api/categoriaFooter:
 *   post:
 *     summary: Crea una nueva categoría de footer
 *     tags: [CategoriaFooter]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaFooter'
 *     responses:
 *       201:
 *         description: Categoría de footer creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaFooter'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authMiddleware, checkRol(["admin"]), createItem);

/**
 * @swagger
 * /api/categoriaFooter/{id}:
 *   put:
 *     summary: Actualiza una categoría de footer por ID
 *     tags: [CategoriaFooter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría de footer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaFooter'
 *     responses:
 *       200:
 *         description: Categoría de footer actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaFooter'
 *       404:
 *         description: Categoría de footer no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateItem);

/**
 * @swagger
 * /api/categoriaFooter/{id}:
 *   delete:
 *     summary: Elimina una categoría de footer por ID
 *     tags: [CategoriaFooter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría de footer
 *     responses:
 *       200:
 *         description: Categoría de footer eliminada exitosamente
 *       404:
 *         description: Categoría de footer no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteItem);

/**
 * @swagger
 * /api/categoriaFooter/recover/{id}:
 *   patch:
 *     summary: Recupera una categoría de footer eliminada por ID
 *     tags: [CategoriaFooter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría de footer
 *     responses:
 *       200:
 *         description: Categoría de footer recuperada exitosamente
 *       404:
 *         description: Categoría de footer no encontrada o ya activa
 *       500:
 *         description: Error en el servidor
 */
router.patch("/recover/:id", authMiddleware, checkRol(["admin"]), recoverCategoriaFooterById);

module.exports = router;