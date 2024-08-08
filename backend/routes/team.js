const express = require('express');
const router = express.Router();
const { getTeams, getTeam, createTeam, updateTeam, deleteTeam, createTeamMember, removeTeamMember, recoverTeamById } = require('../controllers/team/teamController');
const { validatorGetID } = require('../validators/validateGetId');
const { authMiddleware } = require('../middleware/session');
const checkRol = require("../middleware/rol");

/**
 * @swagger
 * tags:
 *   name: Team
 *   description: Operaciones de equipos
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       required:
 *         - teamDescription
 *         - teamName
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del equipo
 *         teamDescription:
 *           type: string
 *           description: Descripción del equipo
 *         teamName:
 *           type: string
 *           description: Nombre del equipo
 *         subCategoriaId:
 *           type: integer
 *           description: ID de subCategoria relacionado
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave
 */
/**
 * @swagger
 * /api/team:
 *   get:
 *     summary: Obtiene todos los equipos
 *     tags: [Team]
 *     responses:
 *       200:
 *         description: Lista de equipos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
router.get('/', getTeams);

/**
 * @swagger
 * /api/team/{id}:
 *   get:
 *     summary: Obtiene un equipo por ID
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del equipo
 *     responses:
 *       200:
 *         description: Equipo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Equipo no encontrado
 */
router.get('/:id', validatorGetID, getTeam);

/**
 * @swagger
 * /api/team:
 *   post:
 *     summary: Crea un nuevo equipo
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       201:
 *         description: Equipo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       500:
 *         description: Error en el servidor
 */
router.post('/', authMiddleware, checkRol(["admin"]), createTeam);

/**
 * @swagger
 * /api/team/{id}:
 *   put:
 *     summary: Actualiza un equipo por ID
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del equipo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       200:
 *         description: Equipo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Equipo no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', validatorGetID, authMiddleware, checkRol(["admin"]), updateTeam);

/**
 * @swagger
 * /api/team/{id}:
 *   delete:
 *     summary: Elimina un equipo por ID
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del equipo
 *     responses:
 *       200:
 *         description: Equipo eliminado exitosamente
 *       404:
 *         description: Equipo no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', validatorGetID, authMiddleware, checkRol(["admin"]), deleteTeam);

/**
 * @swagger
 * /api/team/{teamId}/{memberId}:
 *   post:
 *     summary: Agrega un miembro al equipo
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del equipo
 *       - in: path
 *         name: memberId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del miembro
 *     responses:
 *       200:
 *         description: Miembro agregado al equipo exitosamente
 *       404:
 *         description: Equipo o miembro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.post('/:teamId/:memberId', authMiddleware, checkRol(["admin"]), createTeamMember);

/**
 * @swagger
 * /api/team/{teamId}/{memberId}:
 *   put:
 *     summary: Elimina un miembro del equipo
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del equipo
 *       - in: path
 *         name: memberId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del miembro
 *     responses:
 *       200:
 *         description: Miembro eliminado del equipo exitosamente
 *       404:
 *         description: Equipo o miembro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:teamId/:memberId', authMiddleware, checkRol(["admin"]), removeTeamMember);

/**
 * @swagger
 * /api/team/recover/{id}:
 *   patch:
 *     summary: Recupera un equipo eliminado por ID
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del equipo
 *     responses:
 *       200:
 *         description: Equipo recuperado exitosamente
 *       404:
 *         description: Equipo no encontrado o ya activo
 *       500:
 *         description: Error en el servidor
 */
router.patch('/recover/:id', validatorGetID, authMiddleware, checkRol(["admin"]), recoverTeamById);

module.exports = router;

