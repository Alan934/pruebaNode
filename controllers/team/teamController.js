const Team = require('../../models/team/team');
const { handleHttpError } = require('../../utils/handleError');
const TeamMember = require("../../models/team/teamMember");
const TeamMemberTechnology = require("../../models/team/teamMemberTechnology");
const { Sequelize } = require('sequelize');


const getTeams = async (req, res) => {
    try {
        const teams = await Team.findAll({ paranoid: false });
        if (!teams) {
            handleHttpError(res, 'ERROR_NOT_GET_TEAMS');
        } else {
            res.status(200).json(teams);
        }
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_TEAMS');
    }
}

const getTeam = async (req, res) => {
    const id = req.params.id;
    try {
        const team = await Team.findByPk(id, {
            include: [{ model: TeamMember, as: 'members', 
                include: [{ model: TeamMemberTechnology, as: 'teammembertechnologies' }] 
            }],
        });
        if (!team) {
            handleHttpError(res, 'ERROR_NOT_GET_TEAM', 404);
        } else {
            res.status(200).json(team);
        }
    } catch (error) {
        console.log("Error al traer el equipo", error);
        handleHttpError(res, 'ERROR_GET_TEAM', 500);
    }
}

const createTeam = async (req, res) => {
    const { teamDescription, teamName, subCategoriaId } = req.body;
    const team = await Team.create({ teamDescription, teamName, subCategoriaId });
    if (team) {
        res.status(200).json(team);
    } else {
        handleHttpError(res, 'ERROR_CREATE_TEAM_NOT_FOUND');
    }
}

const updateTeam = async (req, res) => {
    try {
        const id = req.params.id;
        const { teamDescription, teamName, subCategoriaId } = req.body;
        const data = await Team.findByPk(id);
        if (data) {
            data.teamDescription = teamDescription || data.teamDescription;
            data.teamName = teamName || data.teamName;
            data.subCategoriaId = subCategoriaId || data.subCategoriaId;
            const updateData = await data.save();
            res.status(200).json({ message: 'Team actualizado correctamente', updateData });
        }else{
            handleHttpError(res, 'ERROR_TEAM_NOT_FOUND', 404);
        }
    } catch (error) {
        handleHttpError(res, 'ERROR_UPDATE_TEAM');
    }
}

const deleteTeam = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteItem = await Team.findByPk(id);
        if (deleteItem) {
            await deleteItem.destroy();
            res.status(200).json({ message: 'Team Eliminado Correctamente'});
        } else{
            handleHttpError(res, "ERROR_TEAM_NOT_FOUND", 404);
        }
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_TEAM");
    }
}

// Agregar un miembro al equipo
const createTeamMember = async (req, res) => {
    try {
        const { teamId, memberId } = req.params;
        const team = await Team.findByPk(teamId);
        const member = await TeamMember.findByPk(memberId);
        
        if (!team || !member) {
            return handleHttpError(res, 'ERROR_NOT_FOUND', 404);
        }

        await team.addMember(member);
        res.status(200).json({ message: 'Miembro agregado al equipo correctamente' });
    } catch (error) {
        console.error('Error al agregar el miembro al equipo:', error);
        handleHttpError(res, 'ERROR_ADD_TEAM_MEMBER');
    }
};

// Remover un miembro del equipo
const removeTeamMember = async (req, res) => {
    try {
        const { teamId, memberId } = req.params;
        const team = await Team.findByPk(teamId);
        const member = await TeamMember.findByPk(memberId);

        if (!team || !member) {
            return handleHttpError(res, 'ERROR_NOT_FOUND', 404);
        }

        await team.removeMember(member);
        res.status(200).json({ message: 'Miembro removido del equipo correctamente' });
    } catch (error) {
        console.error('Error al remover el miembro del equipo:', error);
        handleHttpError(res, 'ERROR_REMOVE_TEAM_MEMBER');
    }
};


const recoverTeamById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Encuentra el team eliminado utilizando la opción 'paranoid'
      const team = await Team.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });
  
      if (!team) {
        return res.status(404).json({ message: "Team not found or already active" });
      }
  
      // Restaura el team eliminado
      await team.restore();
  
      res.status(200).json({ message: "Team recovered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { getTeams, getTeam, createTeam, updateTeam, deleteTeam, createTeamMember, removeTeamMember, recoverTeamById };