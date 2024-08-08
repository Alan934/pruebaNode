const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../middleware/session')
const checkRol = require("../middleware/rol")
const {getAlltecnologias, getTecnologiaById, createTecnologia,deleteTecnologiaById,updateTecnologiaById,recoverTecnologiaById} = require("../controllers/TecnologiaController")

/**
 * @swagger
 * tags:
 *   name: Tecnologia
 *   description: Operaciones de tecnologías
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Tecnologia:
 *       type: object
 *       required:
 *         - nombreTecnologia
 *         - urlImagenTecnologia
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la tecnología
 *         nombreTecnologia:
 *           type: string
 *           description: Nombre de la tecnología
 *         urlImagenTecnologia:
 *           type: string
 *           description: URL de la imagen de la tecnología
 *         seccionTecnologiaId:
 *           type: integer
 *           description: ID de la sección de tecnología
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave
 */
/**
 * @swagger
 * /api/tecnologia:
 *   get:
 *     summary: Obtiene todas las tecnologías
 *     tags: [Tecnologia]
 *     responses:
 *       200:
 *         description: Lista de tecnologías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tecnologia'
 */
router.get("/", getAlltecnologias);

/**
 * @swagger
 * /api/tecnologia/{id}:
 *   get:
 *     summary: Obtiene una tecnología por ID
 *     tags: [Tecnologia]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tecnología
 *     responses:
 *       200:
 *         description: Tecnología encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tecnologia'
 *       404:
 *         description: Tecnología no encontrada
 */
router.get("/:id", getTecnologiaById);

/**
 * @swagger
 * /api/tecnologia:
 *   post:
 *     summary: Crea una nueva tecnología
 *     tags: [Tecnologia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tecnologia'
 *     responses:
 *       201:
 *         description: Tecnología creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tecnologia'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authMiddleware, checkRol(["admin"]), createTecnologia);

/**
 * @swagger
 * /api/tecnologia/{id}:
 *   put:
 *     summary: Actualiza una tecnología por ID
 *     tags: [Tecnologia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tecnología
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tecnologia'
 *     responses:
 *       200:
 *         description: Tecnología actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tecnologia'
 *       404:
 *         description: Tecnología no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateTecnologiaById);

/**
 * @swagger
 * /api/tecnologia/{id}:
 *   delete:
 *     summary: Elimina una tecnología por ID
 *     tags: [Tecnologia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tecnología
 *     responses:
 *       200:
 *         description: Tecnología eliminada exitosamente
 *       404:
 *         description: Tecnología no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteTecnologiaById);

/**
 * @swagger
 * /api/tecnologia/recover/{id}:
 *   patch:
 *     summary: Recupera una tecnología eliminada por ID
 *     tags: [Tecnologia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tecnología
 *     responses:
 *       200:
 *         description: Tecnología recuperada exitosamente
 *       404:
 *         description: Tecnología no encontrada o ya activa
 *       500:
 *         description: Error en el servidor
 */
router.patch("/recover/:id", authMiddleware, checkRol(["admin"]), recoverTecnologiaById);

module.exports = router;