const express = require('express');
const router = express.Router();
const { getTeamMembers, getTeamMember, createTeamMember, updateTeamMember, deleteTeamMember, recoverTeamMemberById } = require('../controllers/team/teamMemberController');
const { validatorGetID } = require('../validators/validateGetId');
const { authMiddleware } = require('../middleware/session');
const checkRol = require("../middleware/rol");

/**
 * @swagger
 * tags:
 *   name: TeamMember
 *   description: Operaciones de miembros del equipo
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     TeamMember:
 *       type: object
 *       required:
 *         - memberSpecialization
 *         - memberName
 *         - memberURLImg
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del miembro del equipo
 *         memberSpecialization:
 *           type: string
 *           description: Especialización del miembro del equipo
 *         memberName:
 *           type: string
 *           description: Nombre del miembro del equipo
 *         memberURLImg:
 *           type: string
 *           description: URL de la imagen del miembro del equipo
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación del miembro del equipo
 */
/**
 * @swagger
 * /api/teamMember:
 *   get:
 *     summary: Obtiene todos los miembros del equipo
 *     tags: [TeamMember]
 *     responses:
 *       200:
 *         description: Lista de miembros del equipo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TeamMember'
 */
router.get('/', getTeamMembers);

/**
 * @swagger
 * /api/teamMember/{id}:
 *   get:
 *     summary: Obtiene un miembro del equipo por ID
 *     tags: [TeamMember]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del miembro del equipo
 *     responses:
 *       200:
 *         description: Miembro del equipo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamMember'
 *       404:
 *         description: Miembro del equipo no encontrado
 */
router.get('/:id', validatorGetID, getTeamMember);

/**
 * @swagger
 * /api/teamMember:
 *   post:
 *     summary: Crea un nuevo miembro del equipo
 *     tags: [TeamMember]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamMember'
 *     responses:
 *       201:
 *         description: Miembro del equipo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamMember'
 *       500:
 *         description: Error en el servidor
 */
router.post('/', authMiddleware, checkRol(["admin"]), createTeamMember);

/**
 * @swagger
 * /api/teamMember/{id}:
 *   put:
 *     summary: Actualiza un miembro del equipo por ID
 *     tags: [TeamMember]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del miembro del equipo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamMember'
 *     responses:
 *       200:
 *         description: Miembro del equipo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamMember'
 *       404:
 *         description: Miembro del equipo no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', validatorGetID, authMiddleware, checkRol(["admin"]), updateTeamMember);

/**
 * @swagger
 * /api/teamMember/{id}:
 *   delete:
 *     summary: Elimina un miembro del equipo por ID
 *     tags: [TeamMember]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del miembro del equipo
 *     responses:
 *       200:
 *         description: Miembro del equipo eliminado exitosamente
 *       404:
 *         description: Miembro del equipo no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', validatorGetID, authMiddleware, checkRol(["admin"]), deleteTeamMember);

/**
 * @swagger
 * /api/teamMember/recover/{id}:
 *   patch:
 *     summary: Recupera un miembro del equipo eliminado por ID
 *     tags: [TeamMember]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del miembro del equipo
 *     responses:
 *       200:
 *         description: Miembro del equipo recuperado exitosamente
 *       404:
 *         description: Miembro del equipo no encontrado o ya activo
 *       500:
 *         description: Error en el servidor
 */
router.patch('/recover/:id', validatorGetID, authMiddleware, checkRol(["admin"]), recoverTeamMemberById);

module.exports = router;
