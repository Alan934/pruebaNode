const express = require('express');
const router = express.Router();
const { getTeamMembersTechnologys, getTeamMemberTechnology, createTeamMemberTechnology, updateTeamMemberTechnology, deleteTeamMemberTechnology, recoverTeamMemberTechnologyById } = require('../controllers/team/teamMemberTechnologyController');
const { validatorGetID } = require('../validators/validateGetId');
const { authMiddleware } = require('../middleware/session');
const checkRol = require("../middleware/rol");

/**
 * @swagger
 * tags:
 *   name: TeamMemberTechnologie
 *   description: Operaciones de tecnologías de miembros del equipo
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     TeamMemberTechnology:
 *       type: object
 *       required:
 *         - URLIconTechnology
 *         - technologyName
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del TeamMemberTechnology
 *         URLIconTechnology:
 *           type: string
 *           description: URL del icono de la tecnología
 *         technologyName:
 *           type: string
 *           description: Nombre de la tecnología
 *         team_member_id:
 *           type: integer
 *           description: ID del miembro del equipo asociado
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
 * /api/teamMemberTechnology:
 *   get:
 *     summary: Obtiene todas las tecnologías de miembros del equipo
 *     tags: [TeamMemberTechnologie]
 *     responses:
 *       200:
 *         description: Lista de tecnologías de miembros del equipo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TeamMemberTechnology'
 */
router.get('/', getTeamMembersTechnologys);

/**
 * @swagger
 * /api/teamMemberTechnology/{id}:
 *   get:
 *     summary: Obtiene una tecnología de miembro del equipo por ID
 *     tags: [TeamMemberTechnologie]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tecnología de miembro del equipo
 *     responses:
 *       200:
 *         description: Tecnología de miembro del equipo encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamMemberTechnology'
 *       404:
 *         description: Tecnología de miembro del equipo no encontrada
 */
router.get('/:id', validatorGetID, getTeamMemberTechnology);

/**
 * @swagger
 * /api/teamMemberTechnology:
 *   post:
 *     summary: Crea una nueva tecnología de miembro del equipo
 *     tags: [TeamMemberTechnologie]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamMemberTechnology'
 *     responses:
 *       201:
 *         description: Tecnología de miembro del equipo creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamMemberTechnology'
 *       500:
 *         description: Error en el servidor
 */
router.post('/', authMiddleware, checkRol(["admin"]), createTeamMemberTechnology);

/**
 * @swagger
 * /api/teamMemberTechnology/{id}:
 *   put:
 *     summary: Actualiza una tecnología de miembro del equipo por ID
 *     tags: [TeamMemberTechnologie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tecnología de miembro del equipo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamMemberTechnology'
 *     responses:
 *       200:
 *         description: Tecnología de miembro del equipo actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamMemberTechnology'
 *       404:
 *         description: Tecnología de miembro del equipo no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', validatorGetID, authMiddleware, checkRol(["admin"]), updateTeamMemberTechnology);

/**
 * @swagger
 * /api/teamMemberTechnology/{id}:
 *   delete:
 *     summary: Elimina una tecnología de miembro del equipo por ID
 *     tags: [TeamMemberTechnologie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tecnología de miembro del equipo
 *     responses:
 *       200:
 *         description: Tecnología de miembro del equipo eliminada exitosamente
 *       404:
 *         description: Tecnología de miembro del equipo no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', validatorGetID, authMiddleware, checkRol(["admin"]), deleteTeamMemberTechnology);

/**
 * @swagger
 * /api/teamMemberTechnology/recover/{id}:
 *   patch:
 *     summary: Recupera una tecnología de miembro del equipo eliminada por ID
 *     tags: [TeamMemberTechnologie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tecnología de miembro del equipo
 *     responses:
 *       200:
 *         description: Tecnología de miembro del equipo recuperada exitosamente
 *       404:
 *         description: Tecnología de miembro del equipo no encontrada o ya activa
 *       500:
 *         description: Error en el servidor
 */
router.patch('/recover/:id', validatorGetID, authMiddleware, checkRol(["admin"]), recoverTeamMemberTechnologyById);

module.exports = router;
