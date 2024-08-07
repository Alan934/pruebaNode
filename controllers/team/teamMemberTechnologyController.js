const TeamMemberTechnology = require("../../models/team/teamMemberTechnology");
const { handleHttpError } = require('../../utils/handleError');
const { Sequelize } = require('sequelize');

const getTeamMembersTechnologys = async (req, res) => {
    try {
        const TeamMembersTechnologys = await TeamMemberTechnology.findAll({ paranoid: false });
        res.json(TeamMembersTechnologys);
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_TEAMS_MEMBERS_TECHNOLOGYS');
    }
}

const getTeamMemberTechnology = async (req, res) => {
    const id = req.params.id;
    try {
        const TeamMemberTechnologi = await TeamMemberTechnology.findByPk(id);
        res.json(TeamMemberTechnologi);
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_TEAM_MEMBER_TECHNOLOGY');
    }
}

const createTeamMemberTechnology = async (req, res) => {
    try {
        const createteamMemberTechnology = await TeamMemberTechnology.create(req.body);
        if (!createteamMemberTechnology){
            handleHttpError(res, 'ERROR_CREATE_NOT_FOUND_TEAM_MEMBER_TECHNOLOGY');
        }else {
            res.status(200).json(createteamMemberTechnology);
        }
    } catch (error) {
        handleHttpError(res, 'ERROR_CREATE_TEAM_MEMBER_TECHNOLOGY');
    }
}

const updateTeamMemberTechnology = async (req, res) => {
    try {
        const id = req.params.id;
        const { URLIconTechnology, technologyName, team_member_id } = req.body;
        const data = await TeamMemberTechnology.findByPk(id);
        if (data) {
            data.URLIconTechnology = URLIconTechnology || data.URLIconTechnology;
            data.technologyName = technologyName || data.technologyName;
            data.team_member_id = team_member_id || data.team_member_id;
            const updateteamMembertechnology = await data.save();
            res.status(200).json({ message: 'Team Member Technology actualizado correctamente', updateteamMembertechnology});
        } else {
            handleHttpError(res, 'ERROR_UPDATE_TEAM_MEMBER_TECHNOLOGY_NOT_FOUND');
        }
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR_UPDATE_TEAM_MEMBER_TECHNOLOGY');
    }
}

const deleteTeamMemberTechnology = async (req, res) => {
    try {
        const id = req.params.id;
        const teamMemberTechnology = await TeamMemberTechnology.findByPk(id);
        if (teamMemberTechnology) {
            const deleteteamMemberTechnology = await teamMemberTechnology.destroy();
            res.status(200).json(deleteteamMemberTechnology);
        } else {
            handleHttpError(res, 'ERROR_DELETE_NOT_FOUND_TEAM_MEMBER_TECHNOLOGY');
        }
    } catch (error) {
        handleHttpError(res, 'ERROR_DELETE_TEAM_MEMBER_TECHNOLOGY');
    }
}

const recoverTeamMemberTechnologyById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Encuentra el teamMemberTechnology eliminado utilizando la opción 'paranoid'
      const teamMemberTechnology = await TeamMemberTechnology.findOne({ where: { id, deletedAt: { [Sequelize.Op.ne]: null } }, paranoid: false });
  
      if (!teamMemberTechnology) {
        return res.status(404).json({ message: "TeamMemberTechnology not found or already active" });
      }
  
      // Restaura el teamMemberTechnology eliminado
      await teamMemberTechnology.restore();
  
      res.status(200).json({ message: "TeamMemberTechnology recovered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { getTeamMembersTechnologys, getTeamMemberTechnology, createTeamMemberTechnology, updateTeamMemberTechnology, deleteTeamMemberTechnology, recoverTeamMemberTechnologyById };
