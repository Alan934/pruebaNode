const express = require('express')
const router = express.Router()
const { getItem, getItems, getFormularioUser, deleteItem, recover } = require('../controllers/User');
const { authMiddleware } = require('../middleware/session');
const checkRol = require("../middleware/rol");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operaciones de usuarios
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - age
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del usuario
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         age:
 *           type: integer
 *           description: Edad del usuario
 *         email:
 *           type: string
 *           description: Email del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: Rol del usuario
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave del usuario
 */
/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id", authMiddleware, checkRol(["admin"]), getItem);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/",  authMiddleware, checkRol(["admin"]),getItems);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteItem);

/**
 * @swagger
 * /api/user/formulario/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID junto con su formulario
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario y formulario encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/formulario/:id", authMiddleware, checkRol(["admin"]), getFormularioUser);

/**
 * @swagger
 * /api/user/recover/{id}:
 *   patch:
 *     summary: Recupera un usuario eliminado por ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario recuperado exitosamente
 *       404:
 *         description: Usuario no encontrado o ya activo
 *       500:
 *         description: Error en el servidor
 */
router.patch("/recover/:id", authMiddleware, checkRol(["admin"]), recover);

module.exports = router;