const express = require('express')
const router = express.Router()
const {validatorRegister, validatorLogin} = require('../validators/auth')
const {registerCtrl, loginCtrl} = require('../controllers/auth')
const {authMiddleware} = require('../middleware/session')
const checkRol = require("../middleware/rol")

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operaciones de autenticación
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRequestRegistrer:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario (requerido solo para registro)
 *         age:
 *           type: integer
 *           description: Edad del usuario (requerido solo para registro)
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *       example:
 *         name: 
 *         age: 
 *         email: 
 *         password: 
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AuthResponseLogin:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Token JWT para autenticación
 *         user:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: Correo electrónico del usuario
 *             password:
 *               type: string
 *               description: Contraseña del usuario
 *       example:
 *           password:
 *           email: 
 */
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequestRegistrer'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthRequestRegistrer'
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error en el servidor
 */
router.post("/register", validatorRegister, authMiddleware, checkRol(["admin"]), registerCtrl);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthResponseLogin'
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponseLogin'
 *       400:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error en el servidor
 */

router.post("/login", validatorLogin, loginCtrl);

module.exports = router;
