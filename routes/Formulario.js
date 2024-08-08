const express = require("express");
const router = express.Router();
const { authMiddleware } = require('../middleware/session');
const checkRol = require("../middleware/rol");
const {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
  recoverFormularioById
} = require('../controllers/FormularioController');

/**
 * @swagger
 * tags:
 *   name: Formulario
 *   description: Operaciones de formularios
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Formulario:
 *       type: object
 *       required:
 *         - nombreUsuario
 *         - email
 *         - empresa
 *         - rubroEmpresa
 *         - mensaje
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del formulario
 *         nombreUsuario:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Email del usuario
 *         empresa:
 *           type: string
 *           description: Empresa del usuario
 *         rubroEmpresa:
 *           type: string
 *           description: Rubro de la empresa
 *         mensaje:
 *           type: string
 *           description: Mensaje del usuario
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Marca de tiempo de eliminación suave
 */
/**
 * @swagger
 * /api/formulario:
 *   get:
 *     summary: Obtiene todos los formularios
 *     tags: [Formulario]
 *     responses:
 *       200:
 *         description: Lista de formularios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Formulario'
 */
router.get("/", getItems);

/**
 * @swagger
 * /api/formulario/{id}:
 *   get:
 *     summary: Obtiene un formulario por ID
 *     tags: [Formulario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del formulario
 *     responses:
 *       200:
 *         description: Formulario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Formulario'
 *       404:
 *         description: Formulario no encontrado
 */
router.get("/:id", getItem);

/**
 * @swagger
 * /api/formulario:
 *   post:
 *     summary: Crea un nuevo formulario
 *     tags: [Formulario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Formulario'
 *     responses:
 *       201:
 *         description: Formulario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Formulario'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", createItem);

/**
 * @swagger
 * /api/formulario/{id}:
 *   put:
 *     summary: Actualiza un formulario por ID
 *     tags: [Formulario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del formulario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Formulario'
 *     responses:
 *       200:
 *         description: Formulario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Formulario'
 *       404:
 *         description: Formulario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateItem);

/**
 * @swagger
 * /api/formulario/{id}:
 *   delete:
 *     summary: Elimina un formulario por ID
 *     tags: [Formulario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del formulario
 *     responses:
 *       200:
 *         description: Formulario eliminado exitosamente
 *       404:
 *         description: Formulario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteItem);

/**
 * @swagger
 * /api/formulario/recover/{id}:
 *   patch:
 *     summary: Recupera un formulario eliminado por ID
 *     tags: [Formulario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del formulario
 *     responses:
 *       200:
 *         description: Formulario recuperado exitosamente
 *       404:
 *         description: Formulario no encontrado o ya activo
 *       500:
 *         description: Error en el servidor
 */
router.patch("/recover/:id", authMiddleware, checkRol(["admin"]), recoverFormularioById);

module.exports = router;
