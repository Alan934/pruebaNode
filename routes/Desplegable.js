const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../middleware/session')
const checkRol = require("../middleware/rol")
const {getAllDesplegables, getDesplegableById, createDesplegable,deleteDesplegableById,updateDesplegableById,recoverDesplegableById} = require("../controllers/DesplegableController")

/**
 * @swagger
 * tags:
 *   name: Desplegable
 *   description: Operaciones de desplegables
 */

/**
 * @swagger
 * /api/desplegable:
 *   get:
 *     summary: Obtiene todos los desplegables
 *     tags: [Desplegable]
 *     responses:
 *       200:
 *         description: Lista de desplegables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Desplegable'
 */
router.get("/", getAllDesplegables);

/**
 * @swagger
 * /api/desplegable/{id}:
 *   get:
 *     summary: Obtiene un desplegable por ID
 *     tags: [Desplegable]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del desplegable
 *     responses:
 *       200:
 *         description: Desplegable encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Desplegable'
 *       404:
 *         description: Desplegable no encontrado
 */
router.get("/:id", getDesplegableById);

/**
 * @swagger
 * /api/desplegable:
 *   post:
 *     summary: Crea un nuevo desplegable
 *     tags: [Desplegable]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Desplegable'
 *     responses:
 *       201:
 *         description: Desplegable creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Desplegable'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authMiddleware, checkRol(["admin"]), createDesplegable);

/**
 * @swagger
 * /api/desplegable/{id}:
 *   put:
 *     summary: Actualiza un desplegable por ID
 *     tags: [Desplegable]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del desplegable
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Desplegable'
 *     responses:
 *       200:
 *         description: Desplegable actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Desplegable'
 *       404:
 *         description: Desplegable no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateDesplegableById);

/**
 * @swagger
 * /api/desplegable/{id}:
 *   delete:
 *     summary: Elimina un desplegable por ID
 *     tags: [Desplegable]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del desplegable
 *     responses:
 *       200:
 *         description: Desplegable eliminado exitosamente
 *       404:
 *         description: Desplegable no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteDesplegableById);

/**
 * @swagger
 * /api/desplegable/recover/{id}:
 *   patch:
 *     summary: Recupera un desplegable eliminado por ID
 *     tags: [Desplegable]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del desplegable
 *     responses:
 *       200:
 *         description: Desplegable recuperado exitosamente
 *       404:
 *         description: Desplegable no encontrado o ya activo
 *       500:
 *         description: Error en el servidor
 */
router.patch("/recover/:id", authMiddleware, checkRol(["admin"]), recoverDesplegableById);

module.exports = router;
