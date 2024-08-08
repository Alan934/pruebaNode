const express = require("express")
const router = express.Router()
const {authMiddleware} = require('../middleware/session')
const checkRol = require("../middleware/rol")
const {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
  recoverSubCategoriaById
} = require('../controllers/SubCategoriaController')

/**
 * @swagger
 * tags:
 *   name: SubCategoria
 *   description: Operaciones de subcategorías
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SubCategoria:
 *       type: object
 *       required:
 *         - nombreSubCategoria
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la subcategoria
 *         nombreSubCategoria:
 *           type: string
 *           description: Nombre de la subcategoria
 *         categoriaId:
 *           type: integer
 *           description: ID de la categoria asociada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Marca de tiempo de eliminación suave
 */
/**
 * @swagger
 * /api/subcategoria:
 *   get:
 *     summary: Obtiene todas las subcategorías
 *     tags: [SubCategoria]
 *     responses:
 *       200:
 *         description: Lista de subcategorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/api/subcategoria'
 */
router.get("/", getItems)

/**
 * @swagger
 * /api/subcategoria/{id}:
 *   get:
 *     summary: Obtiene una subcategoría por ID
 *     tags: [SubCategoria]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la subcategoría
 *     responses:
 *       200:
 *         description: Subcategoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/api/subcategoria'
 *       404:
 *         description: Subcategoría no encontrada
 */
router.get("/:id", getItem)

/**
 * @swagger
 * /api/subcategoria:
 *   post:
 *     summary: Crea una nueva subcategoría
 *     tags: [SubCategoria]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/api/subcategoria'
 *     responses:
 *       201:
 *         description: Subcategoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/api/subcategoria'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authMiddleware, checkRol(["admin"]), createItem)

/**
 * @swagger
 * /api/subcategoria/{id}:
 *   put:
 *     summary: Actualiza una subcategoría por ID
 *     tags: [SubCategoria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la subcategoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/api/subcategoria'
 *     responses:
 *       200:
 *         description: Subcategoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/api/subcategoria'
 *       404:
 *         description: Subcategoría no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateItem)

/**
 * @swagger
 * /api/subcategoria/{id}:
 *   delete:
 *     summary: Elimina una subcategoría por ID
 *     tags: [SubCategoria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la subcategoría
 *     responses:
 *       200:
 *         description: Subcategoría eliminada exitosamente
 *       404:
 *         description: Subcategoría no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteItem)

/**
 * @swagger
 * /api/subcategoria/recover/{id}:
 *   patch:
 *     summary: Recupera una subcategoría eliminada por ID
 *     tags: [SubCategoria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la subcategoría
 *     responses:
 *       200:
 *         description: Subcategoría recuperada exitosamente
 *       404:
 *         description: Subcategoría no encontrada o ya activa
 *       500:
 *         description: Error en el servidor
 */
router.patch('/recover/:id', authMiddleware, checkRol(["admin"]), recoverSubCategoriaById)

module.exports = router
