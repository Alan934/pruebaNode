const express = require('express');
const router = express.Router();
const { getFooter, getFooters, createFooter, updateFooter, deleteFooter,recoverFooterById } = require('../controllers/footerController');
const { validatorGetID } = require('../validators/validateGetId');
const {authMiddleware} = require('../middleware/session')
const checkRol = require("../middleware/rol")

/**
 * @swagger
 * tags:
 *   name: Footer
 *   description: Operaciones de footers
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Footer:
 *       type: object
 *       required:
 *         - titleFooter
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del footer
 *         titleFooter:
 *           type: string
 *           description: Título del footer
 *         subCategoriaId:
 *           type: integer
 *           description: ID de la subcategoría asociada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave
 */
/**
 * @swagger
 * /api/footer:
 *   get:
 *     summary: Obtiene todos los footers
 *     tags: [Footer]
 *     responses:
 *       200:
 *         description: Lista de footers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Footer'
 */
router.get("/", getFooters);

/**
 * @swagger
 * /footer/{id}:
 *   get:
 *     summary: Obtiene un footer por ID
 *     tags: [Footer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del footer
 *     responses:
 *       200:
 *         description: Footer encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Footer'
 *       404:
 *         description: Footer no encontrado
 */
router.get("/:id", validatorGetID, getFooter);

/**
 * @swagger
 * /api/footer:
 *   post:
 *     summary: Crea un nuevo footer
 *     tags: [Footer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Footer'
 *     responses:
 *       201:
 *         description: Footer creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Footer'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authMiddleware, checkRol(["admin"]), createFooter);

/**
 * @swagger
 * /footer/{id}:
 *   put:
 *     summary: Actualiza un footer por ID
 *     tags: [Footer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del footer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Footer'
 *     responses:
 *       200:
 *         description: Footer actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Footer'
 *       404:
 *         description: Footer no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", validatorGetID, authMiddleware, checkRol(["admin"]), updateFooter);

/**
 * @swagger
 * /footer/{id}:
 *   delete:
 *     summary: Elimina un footer por ID
 *     tags: [Footer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del footer
 *     responses:
 *       200:
 *         description: Footer eliminado exitosamente
 *       404:
 *         description: Footer no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", validatorGetID, authMiddleware, checkRol(["admin"]), deleteFooter);

/**
 * @swagger
 * /footer/recover/{id}:
 *   patch:
 *     summary: Recupera un footer eliminado por ID
 *     tags: [Footer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del footer
 *     responses:
 *       200:
 *         description: Footer recuperado exitosamente
 *       404:
 *         description: Footer no encontrado o ya activo
 *       500:
 *         description: Error en el servidor
 */
router.patch("/recover/:id", authMiddleware, checkRol(["admin"]), recoverFooterById);

module.exports = router;