const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../middleware/session')
const checkRol = require("../middleware/rol")
const {getAllMetodologias, getMetodologiaById, createMetodologia,deleteMetodologiaById,updateMetodologiaById,recoverMetodologiaById} = require("../controllers/MetodologiaController")

/**
 * @swagger
 * tags:
 *   name: Metodologia
 *   description: Operaciones de metodologias
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Metodologia:
 *       type: object
 *       required:
 *         - tituloMetodologia
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la metodologia
 *         tituloMetodologia:
 *           type: string
 *           description: Título de la metodologia
 *         seccionMetodologiaId:
 *           type: integer
 *           description: ID de la sección de metodologia asociada
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la metodologia
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización de la metodologia
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación de la metodologia, si aplica (para eliminación suave)
*/
/**
 * @swagger
 * /api/metodologia:
 *   get:
 *     summary: Obtiene todas las metodologias
 *     tags: [Metodologia]
 *     responses:
 *       200:
 *         description: Lista de metodologias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Metodologia'
 */
router.get("/", getAllMetodologias);

/**
 * @swagger
 * /api/metodologia/{id}:
 *   get:
 *     summary: Obtiene una metodologia por ID
 *     tags: [Metodologia]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la metodologia
 *     responses:
 *       200:
 *         description: Metodologia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Metodologia'
 *       404:
 *         description: Metodologia no encontrada
 */
router.get("/:id", getMetodologiaById);

/**
 * @swagger
 * /api/metodologia:
 *   post:
 *     summary: Crea una nueva metodologia
 *     tags: [Metodologia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Metodologia'
 *     responses:
 *       201:
 *         description: Metodologia creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Metodologia'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authMiddleware, checkRol(["admin"]), createMetodologia);

/**
 * @swagger
 * /api/metodologia/{id}:
 *   put:
 *     summary: Actualiza una metodologia por ID
 *     tags: [Metodologia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la metodologia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Metodologia'
 *     responses:
 *       200:
 *         description: Metodologia actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Metodologia'
 *       404:
 *         description: Metodologia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateMetodologiaById);

/**
 * @swagger
 * /api/metodologia/{id}:
 *   delete:
 *     summary: Elimina una metodologia por ID
 *     tags: [Metodologia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la metodologia
 *     responses:
 *       200:
 *         description: Metodologia eliminada exitosamente
 *       404:
 *         description: Metodologia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteMetodologiaById);

/**
 * @swagger
 * /api/metodologia/recover/{id}:
 *   patch:
 *     summary: Recupera una metodologia eliminada por ID
 *     tags: [Metodologia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la metodologia
 *     responses:
 *       200:
 *         description: Metodologia recuperada exitosamente
 *       404:
 *         description: Metodologia no encontrada o ya activa
 *       500:
 *         description: Error en el servidor
 */
router.patch("/recover/:id", authMiddleware, checkRol(["admin"]), recoverMetodologiaById);

module.exports = router;