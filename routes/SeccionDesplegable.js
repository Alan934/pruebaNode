const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../middleware/session')
const checkRol = require("../middleware/rol")
const { getOneSeccionDesplegable, getAllSeccionDesplegable, createSeccionDesplegable, updateSeccionDesplegable, deleteSeccionDesplegable, recoverDesplegableById } = require("../controllers/SeccionDesplegableController");

/**
 * @swagger
 * tags:
 *   name: SeccionDesplegable
 *   description: Operaciones de seccione desplegable
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SeccionDesplegable:
 *       type: object
 *       required:
 *         - nombreSeccionDesplegable
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la sección desplegable
 *         nombreSeccionDesplegable:
 *           type: string
 *           description: Nombre de la sección desplegable
 *         subCategoriaId:
 *           type: integer
 *           description: ID de la subcategoría asociada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave de la sección desplegable
 */
/**
 * @swagger
 * /api/SeccionDesplegable:
 *   get:
 *     summary: Obtiene todas las secciones desplegables
 *     tags: [SeccionDesplegable]
 *     responses:
 *       200:
 *         description: Lista de secciones desplegables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SeccionDesplegable'
 */
router.get('/', getAllSeccionDesplegable);

/**
 * @swagger
 * /api/SeccionDesplegable/{id}:
 *   get:
 *     summary: Obtiene una sección desplegable por ID
 *     tags: [SeccionDesplegable]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sección desplegable
 *     responses:
 *       200:
 *         description: Sección desplegable encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionDesplegable'
 *       404:
 *         description: Sección desplegable no encontrada
 */
router.get('/:id', getOneSeccionDesplegable);

/**
 * @swagger
 * /api/SeccionDesplegable:
 *   post:
 *     summary: Crea una nueva sección desplegable
 *     tags: [SeccionDesplegable]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SeccionDesplegable'
 *     responses:
 *       201:
 *         description: Sección desplegable creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionDesplegable'
 *       500:
 *         description: Error en el servidor
 */
router.post('/', authMiddleware, checkRol(["admin"]), createSeccionDesplegable);

/**
 * @swagger
 * /api/SeccionDesplegable/{id}:
 *   put:
 *     summary: Actualiza una sección desplegable por ID
 *     tags: [SeccionDesplegable]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sección desplegable
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SeccionDesplegable'
 *     responses:
 *       200:
 *         description: Sección desplegable actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeccionDesplegable'
 *       404:
 *         description: Sección desplegable no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', authMiddleware, checkRol(["admin"]), updateSeccionDesplegable);

/**
 * @swagger
 * /api/SeccionDesplegable/{id}:
 *   delete:
 *     summary: Elimina una sección desplegable por ID
 *     tags: [SeccionDesplegable]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sección desplegable
 *     responses:
 *       200:
 *         description: Sección desplegable eliminada exitosamente
 *       404:
 *         description: Sección desplegable no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', authMiddleware, checkRol(["admin"]), deleteSeccionDesplegable);

/**
 * @swagger
 * /api/SeccionDesplegable/recover/{id}:
 *   patch:
 *     summary: Recupera una sección desplegable eliminada por ID
 *     tags: [SeccionDesplegable]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la sección desplegable
 *     responses:
 *       200:
 *         description: Sección desplegable recuperada exitosamente
 *       404:
 *         description: Sección desplegable no encontrada o ya activa
 *       500:
 *         description: Error en el servidor
 */
router.patch('/recover/:id', authMiddleware, checkRol(["admin"]), recoverDesplegableById);

module.exports = router;