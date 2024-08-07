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
