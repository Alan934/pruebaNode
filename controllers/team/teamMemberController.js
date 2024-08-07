const TeamMember = require("../../models/team/teamMember");
const Team = require('../../models/team/team');
const { handleHttpError } = require('../../utils/handleError');
const TeamMemberTechnology = require("../../models/team/teamMemberTechnology");
const { Sequelize } = require('sequelize');

const getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await TeamMember.findAll({
            paranoid: false,
            include: [{ model: TeamMemberTechnology, As: 'teammembertechnologies' },],
        });
        res.json(teamMembers);
    } catch (error) {
        console.log("Error al traer los miembros del equipo", error);
        handleHttpError(res, 'ERROR_GET_TEAMS_MEMBERS');
    }
}

const getTeamMember = async (req, res) => {
    const id = req.params.id;
    try {
        const teamMember = await TeamMember.findByPk(id, {
            include: [{ model: TeamMemberTechnology, as: 'teammembertechnologies' }],
        });
        res.json(teamMember);
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_TEAM_MEMBER');
    }
}

const createTeamMember = async (req, res) => {
    const createteamMember = await TeamMember.create(req.body);
    if (createteamMember) {
        res.status(200).json(createteamMember);
    } else {
        handleHttpError(res, 'ERROR_CREATE_TEAM_MEMBER');
    }
}

const updateTeamMember = async (req, res) => {
    try {
        const id = req.params.id;
        const { memberSpecialization, memberName, memberURLImg, team_member_team_id } = req.body;
        const data = await TeamMember.findByPk(id);
        if (data) {
            data.memberSpecialization = memberSpecialization || data.memberSpecialization;
            data.memberName = memberName || data.memberName;
            data.memberURLImg = memberURLImg || data.memberURLImg;
            const updateTeamMember = await data.save();
            res.status(200).json({ message: 'Team Member actualizado correctamente', updateTeamMember});
        } else {
            handleHttpError(res, 'ERROR_UPDATE_TEAM_MEMBER_NOT_FOUND');
        }
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR_UPDATE_TEAM_MEMBER');
    }
}

const deleteTeamMember = async (req, res) => {
    const id = req.params.id;
    try {
        const teamMember = await TeamMember.findByPk(id);
        if (teamMember) {
            const deleteteamMember = await teamMember.destroy();
            res.status(200).json(deleteteamMember);
        } else {
            handleHttpError(res, 'ERROR_DELETE_NOT_FOUND_TEAM_MEMBER');
        }
    } catch (error) {
        console.log("Error al eliminar el miembro del equipo", error);
        handleHttpError(res, 'ERROR_DELETE_TEAM_MEMBER');
    }
}

const recoverTeamMemberById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Encuentra el teamMember eliminado utilizando la opción 'paranoid'
      const teamMember = await TeamMember.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });
  
      if (!teamMember) {
        return res.status(404).json({ message: "TeamMember not found or already active" });
      }
  
      // Restaura el teamMember eliminado
      await teamMember.restore();
  
      res.status(200).json({ message: "TeamMember recovered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { getTeamMembers, getTeamMember, createTeamMember, updateTeamMember, deleteTeamMember,recoverTeamMemberById };
