const express = require("express");
const router = express.Router();
const {getItem, getItems, createItem, updateItem, deleteItem,recoverSeccionGeneralById} = require('../controllers/SeccionGeneral')
const {authMiddleware} = require('../middleware/session')
const checkRol = require("../middleware/rol")

/**
 * @swagger
 * tags:
 *   name: SeccionGeneral
 *   description: Operaciones sobre Secciones Generales
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SeccionGeneral:
 *       type: object
 *       required:
 *         -  tituloSeccionGeneral
 *         -  subTituloSeccionGeneral
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la Seccion General
 *         tituloSeccionGeneral:
 *           type: string
 *           description: Título de la Seccion General
 *         subTituloSeccionGeneral:
 *           type: string
 *           description: Subtítulo de la Seccion General
 *         subCategoriaId:
 *           type: integer
 *           description: ID de la subcategoría asociada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave de la Seccion General
 */
/**
 * @swagger
 * /api/secciongeneral/{id}:
 *   get:
 *     summary: Obtiene una Seccion General por ID
 *     tags: [SeccionGeneral]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Seccion General
 *     responses:
 *       200:
 *         description: Seccion General encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionGeneral'
 *       404:
 *         description: Seccion General no encontrada
 */
router.get("/:id", getItem);

/**
 * @swagger
 * /api/secciongeneral:
 *   get:
 *     summary: Obtiene todas las Secciones Generales
 *     tags: [SeccionGeneral]
 *     responses:
 *       200:
 *         description: Lista de Secciones Generales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SeccionGeneral'
 */
router.get("/", getItems);

/**
 * @swagger
 * /api/secciongeneral:
 *   post:
 *     summary: Crea una nueva Seccion General
 *     tags: [SeccionGeneral]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SeccionGeneral'
 *     responses:
 *       201:
 *         description: Seccion General creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionGeneral'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authMiddleware, checkRol(["admin"]), createItem);

/**
 * @swagger
 * /api/secciongeneral/{id}:
 *   put:
 *     summary: Actualiza una Seccion General por ID
 *     tags: [SeccionGeneral]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Seccion General
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SeccionGeneral'
 *     responses:
 *       200:
 *         description: Seccion General actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionGeneral'
 *       404:
 *         description: Seccion General no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateItem);

/**
 * @swagger
 * /api/secciongeneral/{id}:
 *   delete:
 *     summary: Elimina una Seccion General por ID
 *     tags: [SeccionGeneral]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Seccion General
 *     responses:
 *       200:
 *         description: Seccion General eliminada exitosamente
 *       404:
 *         description: Seccion General no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteItem);

/**
 * @swagger
 * /api/secciongeneral/recover/{id}:
 *   patch:
 *     summary: Recupera una Seccion General eliminada por ID
 *     tags: [SeccionGeneral]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Seccion General
 *     responses:
 *       200:
 *         description: Seccion General recuperada exitosamente
 *       404:
 *         description: Seccion General no encontrada o ya activa
 *       500:
 *         description: Error en el servidor
 */
router.patch("/recover/:id", authMiddleware, checkRol(["admin"]), recoverSeccionGeneralById);

module.exports = router;